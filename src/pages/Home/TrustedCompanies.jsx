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
        <section className="py-8 sm:py-12">
            <div className="rounded-[36px] border border-white/70 bg-white/80 px-6 py-8 text-center shadow-xl shadow-slate-900/5 sm:px-8 lg:px-10">

                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                    Social proof
                </p>
                <h2 className="section-heading mb-4 mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                    Trusted by Leading Companies
                </h2>

                <p className="mx-auto mb-12 max-w-3xl text-sm leading-7 text-slate-600">
                    SecureVisionAI is trusted by top companies worldwide to monitor CCTV and detect suspicious activity.
                </p>

                <div className="rounded-[28px] bg-slate-50 px-4 py-5">
                    <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-2 py-4">
                    {visibleLogos.map((company, index) => (
                        <div
                            key={index}
                            className="animate-fadeIn shrink-0 snap-center rounded-2xl border border-slate-200 bg-white px-5 py-4 opacity-0 shadow-sm"
                            style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
                        >
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="h-12 object-contain grayscale transition-all duration-300 hover:grayscale-0 hover:brightness-110"
                            />
                        </div>
                    ))}
                    </div>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {testimonials.map((t, idx) => (
                        <article
                            key={idx}
                            className="rounded-[28px] border border-white/70 bg-linear-to-b from-white to-slate-50 p-6 text-left shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/8"
                        >
                            <p className="mb-4 text-sm italic leading-7 text-slate-700">"{t.feedback}"</p>
                            <h4 className="font-semibold text-slate-900">{t.name}</h4>
                            <p className="mt-1 text-sm font-medium text-cyan-700">{t.company}</p>
                        </article>
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
