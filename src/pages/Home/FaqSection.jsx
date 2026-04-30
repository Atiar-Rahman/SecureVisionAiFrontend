import { ChevronRight } from "lucide-react";

const faqs = [
    {
        question: "Can SecureVisionAI work with multiple cameras at once?",
        answer: "Yes. The platform is structured around multi-camera monitoring so operators can review several feeds and detection results from one workspace.",
    },
    {
        question: "Is this only for demos, or can it support real workflows?",
        answer: "The product direction supports real monitoring workflows with camera management, model status tracking, operator views, and alert handling.",
    },
    {
        question: "Can teams customize how they deploy the system?",
        answer: "Yes. The frontend and backend setup can be adapted for local environments, different camera arrangements, and organization-specific operational needs.",
    },
    {
        question: "What makes the interface professional for security teams?",
        answer: "The focus is on clear hierarchy, quick scanning, organized modules, and reducing friction during high-attention monitoring tasks.",
    },
];

const FaqSection = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Common questions</p>
                    <h2 className="section-heading mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                        Questions teams usually ask before deployment.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                        A few quick answers to help visitors understand the product value and operational fit.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    {faqs.map((item) => (
                        <article key={item.question} className="rounded-[28px] bg-slate-50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                                    <ChevronRight size={16} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{item.question}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
