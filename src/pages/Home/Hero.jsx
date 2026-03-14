import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative overflow-hidden">

            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                className="absolute w-full h-full object-cover opacity-20"
            >
                <source src="/cctv-bg.mp4" type="video/mp4" />
            </video>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div>

                    {/* Animated Gradient Title */}
                    <h1 className="text-5xl font-bold leading-tight">
                        Smart AI CCTV <br />

                        <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                            Suspicious Activity Detection
                        </span>
                    </h1>

                    <p className="py-6 text-lg opacity-80">
                        SecureVisionAI monitors CCTV footage using deep learning
                        models to detect suspicious human behaviour in real time.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex gap-4">

                        <Link className="btn btn-primary">
                            Get Started
                        </Link>

                        <Link className="btn btn-outline">
                            Watch Demo
                        </Link>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-10">

                        <div>
                            <h2 className="text-3xl font-bold text-primary">1000+</h2>
                            <p className="text-sm opacity-70">Cameras Monitored</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-primary">98%</h2>
                            <p className="text-sm opacity-70">Detection Accuracy</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-primary">24/7</h2>
                            <p className="text-sm opacity-70">AI Surveillance</p>
                        </div>

                    </div>

                </div>

                {/* Right Side Dashboard Preview */}
                <div className="relative flex justify-center">

                    <img
                        src="https://images.unsplash.com/photo-1558002038-1055907df827"
                        className="rounded-xl shadow-2xl animate-bounce"
                    />

                    {/* Floating Detection Card */}
                    <div className="absolute -bottom-6 -left-6 bg-base-100 p-4 rounded-xl shadow-lg">

                        <h3 className="font-semibold text-sm">
                            Suspicious Activity Detected
                        </h3>

                        <p className="text-xs opacity-70">
                            Camera 3 - Parking Area
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;