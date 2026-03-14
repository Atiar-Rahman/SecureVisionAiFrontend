
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";  // <-- notice "/modules"

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
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
    },
    {
        name: "Sarah Lee",
        company: "Microsoft",
        feedback: "Easy to use interface and very accurate AI detection."
    }
];

const TestimonialsCarousel = () => {
    return (
        <section className="bg-base-100 py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">

                <h2 className="text-3xl font-bold mb-6">
                    What Our Clients Say
                </h2>

                <p className="text-gray-500 mb-12">
                    Trusted by leading companies worldwide
                </p>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 4000 }}
                    pagination={{ clickable: true }}
                >
                    {testimonials.map((t, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="bg-base-200 p-8 rounded-xl shadow-lg mx-4">
                                <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
                                <h4 className="font-semibold">{t.name}</h4>
                                <p className="text-sm text-gray-500">{t.company}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;