import React, { useEffect, useState } from "react";

const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" },
    { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Adobe_Corporate_Logo.png" },
];

const testimonials = [
    {
        name: "John Doe",
        company: "Google",
        feedback: "SecureVisionAI helped us detect suspicious activities in our offices with high accuracy."
    },
    {
        name: "Jane Smith",
        company: "Amazon",
        feedback: "The AI monitoring system is seamless and easy to integrate into our existing security network."
    },
    {
        name: "Mike Johnson",
        company: "Tesla",
        feedback: "Real-time alerts have significantly improved our facility security."
    }
];

const TrustedCompanies = () => {
    const [visibleLogos, setVisibleLogos] = useState([]);

    useEffect(() => {
        // Sequential fade-in animation
        companies.forEach((_, i) => {
            setTimeout(() => {
                setVisibleLogos((prev) => [...prev, companies[i]]);
            }, i * 150);
        });
    }, []);

    return (
        <section className="bg-base-100 py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Title */}
                <h2 className="text-3xl font-bold mb-6">
                    Trusted by Leading Companies
                </h2>

                <p className="text-gray-500 mb-12">
                    SecureVisionAI is trusted by top companies worldwide to monitor CCTV and detect suspicious activity.
                </p>

                {/* Horizontal Scroll Carousel */}
                <div className="flex overflow-x-auto gap-8 py-4 px-2 snap-x snap-mandatory">
                    {visibleLogos.map((company, index) => (
                        <div
                            key={index}
                            className="shrink-0 snap-center opacity-0 animate-fadeIn"
                            style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
                        >
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="h-12 object-contain filter grayscale hover:grayscale-0 hover:brightness-125 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>

                {/* Client Testimonials */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-base-200 p-6 rounded-xl shadow-lg text-left hover:shadow-2xl transition-shadow duration-300">
                            <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
                            <h4 className="font-semibold">{t.name}</h4>
                            <p className="text-sm text-gray-500">{t.company}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Fade-in animation */}
            <style>
                {`
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
        `}
            </style>

        </section>
    );
};

export default TrustedCompanies;