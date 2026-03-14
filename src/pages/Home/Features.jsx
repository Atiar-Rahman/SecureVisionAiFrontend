import React from "react";
import { FaRobot, FaVideo, FaBell, FaShieldAlt } from "react-icons/fa";

const features = [
    {
        icon: <FaRobot size={30} className="text-primary" />,
        title: "AI-Powered Detection",
        description: "Advanced AI algorithms detect suspicious human behavior in real-time from CCTV footage.",
    },
    {
        icon: <FaVideo size={30} className="text-primary" />,
        title: "Live Video Monitoring",
        description: "Access live streams from multiple cameras simultaneously with high-resolution clarity.",
    },
    {
        icon: <FaBell size={30} className="text-primary" />,
        title: "Instant Alerts",
        description: "Receive notifications instantly when unusual activity is detected, reducing response time.",
    },
    {
        icon: <FaShieldAlt size={30} className="text-primary" />,
        title: "Secure & Private",
        description: "All data is encrypted and stored securely, ensuring privacy and compliance with regulations.",
    }
];

const Features = () => {
    return (
        <section className="bg-base-100 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Section Title */}
                <h2 className="text-3xl font-bold mb-6">
                    Key Features of SecureVisionAI
                </h2>
                <p className="text-gray-500 mb-12">
                    Powerful tools to keep your premises secure and ensure real-time monitoring.
                </p>

                {/* Features Grid */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-base-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Features;