import { motion } from "motion/react";
import { useEffect, useState } from "react";

const StatsCard = ({ icon, title, number, isInView }) => {
    const [displayNum, setDisplayNum] = useState(0);
    const [animatedOnce, setAnimatedOnce] = useState(false);

    // Animate number only once
    useEffect(() => {
        if (isInView && !animatedOnce) {
            let start = 0;
            const duration = 5000;
            const increment = number / (duration / 50);

            const counter = setInterval(() => {
                start += increment;
                if (start >= number) {
                    clearInterval(counter);
                    start = number;
                    setAnimatedOnce(true);
                }
                setDisplayNum(Math.floor(start));
            }, 50);
        }
    }, [isInView, animatedOnce, number]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-6 bg-gray-200 backdrop-blur-sm rounded-xl shadow-lg space-y-2 text-center hover:shadow hover:shadow-primary/50 duration-300 cursor-pointer"
        >
            <div className="flex justify-center text-primary text-4xl">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">
                {animatedOnce ? number : displayNum}+
            </p>
        </motion.div>
    );
};

export default StatsCard;
