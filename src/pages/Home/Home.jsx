import { lazy, Suspense } from "react";
import Loading from "../Error&loading/Loading";


const Hero = lazy(() => import("./Hero"));
const Features = lazy(() => import("./Features"));
const OperationsSection = lazy(() => import("./OperationsSection"));
const AIDemo = lazy(() => import("./AIDemo"));
const UseCasesSection = lazy(() => import("./UseCasesSection"));
const InsightsSection = lazy(() => import("./InsightsSection"));
const StandardsSection = lazy(() => import("./StandardsSection"));
const TrustedCompanies = lazy(() => import("./TrustedCompanies"));
const TrustedTestimonials = lazy(() => import("./TestimonialsCarousel"));
const Pricing = lazy(() => import("./Pricing"));
const FaqSection = lazy(() => import("./FaqSection"));
const HomeCTA = lazy(() => import("./HomeCTA"));

const Home = () => (
    <div className="space-y-2 sm:space-y-4">
        <Suspense fallback={<Loading/>}>
            <Hero />
            <Features />
            <OperationsSection />
            <AIDemo />
            <UseCasesSection />
            <InsightsSection />
            <StandardsSection />
            <TrustedCompanies />
            <TrustedTestimonials />
            <Pricing />
            <FaqSection />
            <HomeCTA />
        </Suspense>
    </div>
);

export default Home;
