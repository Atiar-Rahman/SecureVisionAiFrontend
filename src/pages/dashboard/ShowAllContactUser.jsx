import React, { useEffect, useState } from 'react';
import authApiClient from '../../services/auth-api-client';
import Swal from 'sweetalert2';

const ShowAllContactUser = () => {
    const [contactsUser, setContactsUser] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchContactUser = async () => {
        setLoading(true);
        try {
            const res = await authApiClient.get('/api/contact/');
            setContactsUser(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContactUser();
    }, []);

    // 🔥 Delete
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this message?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (confirm.isConfirmed) {
            try {
                await authApiClient.delete(`/api/contact/${id}/`);
                setContactsUser(contactsUser.filter(item => item.id !== id));
                Swal.fire("Deleted!", "", "success");
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                Swal.fire("Error!", "Delete failed", "error");
            }
        }
    };

    // 🔥 Toggle Read/Unread
    const toggleRead = async (contact) => {
        try {
            await authApiClient.patch(`/api/contact/${contact.id}/`, {
                is_read: !contact.is_read
            });

            setContactsUser(prev =>
                prev.map(item =>
                    item.id === contact.id
                        ? { ...item, is_read: !item.is_read }
                        : item
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading messages...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Contact Messages ({contactsUser.length})
            </h1>

            <div className="space-y-4">
                {contactsUser.map((contact) => (
                    <div
                        key={contact.id}
                        className={`p-4 rounded-xl shadow border 
                        ${contact.is_read ? 'bg-gray-50' : 'bg-white border-blue-400'}`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h2 className="font-semibold">{contact.name}</h2>
                                <p className="text-sm text-gray-500">{contact.email}</p>
                            </div>

                            <span className={`text-xs px-2 py-1 rounded-full 
                                ${contact.is_read ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                {contact.is_read ? 'Read' : 'Unread'}
                            </span>
                        </div>

                        {/* Message */}
                        <p className="text-gray-700 mb-3">{contact.message}</p>

                        {/* Time */}
                        <p className="text-xs text-gray-400">
                            {new Date(contact.created_at).toLocaleString()}
                        </p>

                        {/* Actions */}
                        <div className="flex justify-between mt-3">
                            <button
                                onClick={() => toggleRead(contact)}
                                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                {contact.is_read ? "Mark Unread" : "Mark Read"}
                            </button>

                            <button
                                onClick={() => handleDelete(contact.id)}
                                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {contactsUser.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No messages found.
                </p>
            )}
        </div>
    );
};

export default ShowAllContactUser;