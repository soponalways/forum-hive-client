import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import TestimonialCard from "./TestimonialCard";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";


const Testimonials = () => {
    const axios = useAxios(); 
    const {data : testimonials =[] } = useQuery({
        queryKey : ["testimonials"], 
        queryFn : async () => {
            const res = await axios.get("/testimonials");
            return res.data; 
        }
    })
    return (
        <div className="w-full bg-white py-12 rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-primary/30">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary">What Our Users Say</h2>
                <p className="text-gray-600 mt-2">
                    Real feedback from members of our community.
                </p>
            </div>

            <div className="px-4 md:px-6 lg:px-8">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1}
                    spaceBetween={15}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {testimonials.map((t) => (
                        <SwiperSlide key={t.id}>
                            <TestimonialCard
                                name={t.name}
                                role={t.role}
                                message={t.message}
                                img={t.img}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;