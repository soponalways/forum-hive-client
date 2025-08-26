import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../../../hooks/useAxios';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';

const BasicInfoUpdateForm = () => {
    const {user} = useAuth(); 
    const axios = useAxios(); 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [imagePreview, setImagePreview] = useState(null);
    const imgbbAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

    const onSubmit = async (data) => {
        try {
            // 1. Upload image to imgbb
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const imgResponse = await axios.post(imgbbAPI, formData);
            const imageUrl = imgResponse.data.data.url;

            // 2. Prepare updated user data
            const UpdatedUserData = {
                name: data.fullName,
                email: data.email,
                phone: data.phone,
                dob: data.dob,
                gender: data.gender,
                address: data.address,
                country: data.country,
                linkedin: data.linkedin,
                twitter: data.twitter,
                facebook: data.facebook,
                image: imageUrl,
            };

            // 3. Send to backend API
            const { data: result } = await axios.patch(`/user/update/${user?.email}`, UpdatedUserData);
            console.log("data after update the user", result)
            if (result.modifiedCount) {
                toast.success("Profile Update Successfully")
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong while updating profile.");
        }
    };

    // Watch for image input
    const imageFile = watch("image");
    if (imageFile && imageFile[0] && !imagePreview) {
        const fileReader = new FileReader();
        fileReader.onload = () => setImagePreview(fileReader.result);
        fileReader.readAsDataURL(imageFile[0]);
    }

    return (
        <div className='bg-white p-3 m-10 md:m-14 rounded-2xl md:rounded-3xl'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Full Name */}
                <div className="form-control">
                    <label className="label font-semibold">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="input input-bordered w-full"
                        {...register("fullName", { required: "Full Name is required" })}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div className="form-control relative">
                    <label className="label font-semibold">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register("image", {  })}
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                const fileReader = new FileReader();
                                fileReader.onload = () => setImagePreview(fileReader.result);
                                fileReader.readAsDataURL(e.target.files[0]);
                            }
                        }}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-3 w-20 h-20 rounded-lg object-cover border absolute -top-16"
                        />
                    )}
                </div>

                {/* Email */}
                <div className="form-control">
                    <label className="label font-semibold">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full"
                        defaultValue={user?.email}
                        disabled
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors?.email?.message}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div className="form-control">
                    <label className="label font-semibold">Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="input input-bordered w-full"
                        {...register("phone")}
                    />
                </div>

                {/* Date of Birth */}
                <div className="form-control">
                    <label className="label font-semibold">Date of Birth</label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        {...register("dob")}
                    />
                </div>

                {/* Gender */}
                <div className="form-control">
                    <label className="label font-semibold">Gender</label>
                    <select className="select select-bordered w-full" {...register("gender")}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Address */}
                <div className="form-control md:col-span-2">
                    <label className="label font-semibold">Address</label>
                    <textarea
                        placeholder="Enter your address"
                        className="textarea textarea-bordered w-full"
                        {...register("address")}
                    />
                </div>

                {/* Country */}
                <div className="form-control">
                    <label className="label font-semibold">Country</label>
                    <input
                        type="text"
                        placeholder="Enter your country"
                        className="input input-bordered w-full"
                        {...register("country")}
                    />
                </div>

                {/* LinkedIn */}
                <div className="form-control">
                    <label className="label font-semibold">LinkedIn Profile</label>
                    <input
                        type="url"
                        placeholder="LinkedIn profile link"
                        className="input input-bordered w-full"
                        {...register("linkedin")}
                    />
                </div>

                {/* Twitter */}
                <div className="form-control">
                    <label className="label font-semibold">Twitter Profile</label>
                    <input
                        type="url"
                        placeholder="Twitter profile link"
                        className="input input-bordered w-full"
                        {...register("twitter")}
                    />
                </div>

                {/* Facebook */}
                <div className="form-control">
                    <label className="label font-semibold">Facebook Profile</label>
                    <input
                        type="url"
                        placeholder="Facebook profile link"
                        className="input input-bordered w-full"
                        {...register("facebook")}
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button className="btn btn-primary w-full" type="submit">
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BasicInfoUpdateForm;