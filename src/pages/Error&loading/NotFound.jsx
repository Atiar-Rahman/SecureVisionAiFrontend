import React from 'react';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
            <div className="glass-panel max-w-xl rounded-[32px] p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-white">
                    <SearchX size={28} />
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">404 error</p>
                <h1 className="section-heading mt-3 text-4xl font-bold text-slate-900">Page not found</h1>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                    The page you requested is unavailable or the route has not been configured yet.
                </p>
                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
                >
                    <ArrowLeft size={16} />
                    Back to home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
