import { lazy, Suspense } from "react";
import Loading from "../Error&loading/Loading";


const Hero = lazy(() => import("./Hero"));
const Features = lazy(() => import("./Features"));
const AIDemo = lazy(() => import("./AIDemo"));
const TrustedTestimonials = lazy(() => import("./TestimonialsCarousel"));
const Pricing = lazy(() => import("./Pricing"));

const Home = () => (
    <div>
        <Suspense fallback={<Loading/>}>
            <Hero />
            <Features />
            <AIDemo />
            <TrustedTestimonials />
            <Pricing />
        </Suspense>
    </div>
);

export default Home;