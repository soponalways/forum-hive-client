import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";

const TestimonialCard = ({ name, role, message, img }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-200 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/30 cursor-pointer"
        >
            <div className="flex items-center gap-3 mb-4">
                <Avatar src={img} alt={name} />
                <div>
                    <h4 className="text-primary font-semibold">{name}</h4>
                    <p className="text-xs text-gray-500">{role}</p>
                </div>
            </div>
            <p className="text-sm text-gray-700">{message}</p>
        </motion.div>
    );
};

export default TestimonialCard;
