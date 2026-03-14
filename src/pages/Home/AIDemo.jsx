import React from "react";

const AIDemo = () => {
    return (
        <section className="bg-base-200 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Title */}
                <h2 className="text-3xl font-bold mb-6">
                    Try Our AI Demo
                </h2>
                <p className="text-gray-500 mb-12">
                    Experience real-time suspicious activity detection with SecureVisionAI.
                </p>

                {/* Demo Video */}
                <div className="relative max-w-4xl mx-auto mb-8">
                    <video
                        autoPlay
                        loop
                        muted
                        className="rounded-xl shadow-lg object-cover w-full"
                    >
                        <source src="/demo.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="btn btn-primary">Try Live Demo</button>
                    <button className="btn btn-outline">Request Access</button>
                </div>

            </div>
        </section>
    );
};

export default AIDemo;