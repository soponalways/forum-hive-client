import { useForm } from "react-hook-form";
import { FaAddressCard, FaMailBulk, FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ContactUs() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // console.log(data);
        toast.success("Your query has been saved")
        reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">

                {/* Left Section: Contact Info */}
                <div className="card shadow-2xl bg-white text-primary p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-primary mb-4">Get in Touch</h2>
                    <p className="mb-6">
                        Have a question, suggestion, or feedback? Fill out the form or
                        reach us through the contact details below.
                    </p>
                    <ul className="space-y-4">
                        <li>
                            <p className="flex gap-2 items-center"><FaAddressCard /> <strong>Address:</strong> Rangpur, Bangladesh</p>
                        </li>
                        <li>
                            <p className="flex gap-2 items-center"><FaMailBulk /> <strong>Email:</strong> sopon-dev@outlook.com</p>
                        </li>
                        <li>
                            <p className="flex gap-2 items-center"><FaPhone /> <strong>Phone:</strong> +8801884953018</p>
                        </li>
                    </ul>
                </div>

                {/* Right Section: Contact Form */}
                <div className="card shadow-2xl bg-white text-primary p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-primary mb-6">
                        Send us a message
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Message */}
                        <div className="form-control">
                            <label className="label">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message..."
                                className="textarea textarea-bordered w-full"
                                {...register("message", { required: "Message is required" })}
                            ></textarea>
                            {errors.message && (
                                <p className="text-red-500 text-sm">{errors.message.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn btn-primary w-full">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
