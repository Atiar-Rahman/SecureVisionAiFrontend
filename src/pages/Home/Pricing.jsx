import React from "react";

const pricingPlans = [
    {
        name: "Starter",
        price: "$49/mo",
        features: ["Up to 10 cameras", "Real-time alerts", "Basic AI detection"],
    },
    {
        name: "Pro",
        price: "$99/mo",
        features: ["Up to 50 cameras", "Advanced AI detection", "24/7 support"],
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: ["Unlimited cameras", "Dedicated AI model", "Priority support"],
    },
];

const Pricing = () => {
    return (
        <section className="bg-base-100 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Section Title */}
                <h2 className="text-3xl font-bold mb-6">
                    Pricing Plans
                </h2>
                <p className="text-gray-500 mb-12">
                    Choose a plan that fits your organization’s needs.
                </p>

                {/* Pricing Cards */}
                <div className="grid gap-8 md:grid-cols-3">

                    {pricingPlans.map((plan, idx) => (
                        <div key={idx} className="bg-base-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                            <h3 className="font-semibold text-xl mb-4">{plan.name}</h3>
                            <p className="text-3xl font-bold mb-6">{plan.price}</p>
                            <ul className="mb-6 text-gray-700 space-y-2">
                                {plan.features.map((f, i) => (
                                    <li key={i}>• {f}</li>
                                ))}
                            </ul>
                            <button className="btn btn-primary w-full">{plan.price === "Custom" ? "Contact Sales" : "Get Started"}</button>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Pricing;