// Import required libraries
import { motion } from "motion/react";
import Button from "@mui/material/Button";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

function SignupCTA() {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-white py-12 rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-primary/30">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl mx-auto text-center space-y-4"
            >
                <div className="flex justify-center">
                    <FaUserPlus className="text-4xl text-primary" />
                </div>

                <h2 className="text-3xl font-bold text-primary">
                    Join Our Community Today
                </h2>

                <p className="text-gray-600">
                    Sign up for free and stay updated with the latest posts, topics and community news.
                </p>

                <div
                    onClick={() => navigate("/signup")}
                    className="hover:scale-105 transition-transform duration-300">
                    <Button variant="contained" color="primary" size="large">
                        Create Free Account
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

export default SignupCTA;
