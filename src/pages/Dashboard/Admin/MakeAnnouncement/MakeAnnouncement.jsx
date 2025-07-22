import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
    Card,
    Input,
    Textarea,
    Button,
    Typography,
} from '@material-tailwind/react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const MakeAnnouncement = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/announcements', data);
            if (res.data.insertedId) {
                Swal.fire('Success!', 'Announcement created successfully', 'success');
                reset();
            }
            console.log(data)
        } catch (error) {
            Swal.fire('Error!', 'Something went wrong.', 'error');
            console.log(error)
        }
    };

    return (
        <div className="flex justify-center items-center md:px-4 md:py-10 max-w-screen-xl mx-auto sm:px-6 lg:px-8 overflow-x-hidden">
            <Card className=" max-w-2xl p-8 shadow-lg bg-base-100 border border-primary/20">
                <Typography variant="h4" className="text-center text-primary font-bold mb-6">
                    📢 Make Announcement
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Author Image */}
                    <div className=''>
                        <Typography className="text-primary font-medium mb-1">
                            Author Image URL
                        </Typography>
                        <Input
                            type="text"
                            className='text-primary w-full'
                            placeholder="https://example.com/image.jpg"
                            defaultValue={user.photoURL}
                            {...register('authorImage', { required: 'Image URL is required' })}
                            error={!!errors.authorImage}
                        />
                        {errors.authorImage && (
                            <Typography className="text-red-500 text-sm mt-1">
                                {errors.authorImage.message}
                            </Typography>
                        )}
                    </div>

                    {/* Author Name */}
                    <div className=''>
                        <Typography className="text-primary font-medium mb-1">
                            Author Name
                        </Typography>
                        <Input
                            type="text"
                            className='text-primary'
                            placeholder="John Doe"
                            defaultValue={user.displayName}
                            {...register('authorName', { required: 'Author name is required' })}
                            error={!!errors.authorName}
                        />
                        {errors.authorName && (
                            <Typography className="text-red-500 text-sm mt-1">
                                {errors.authorName.message}
                            </Typography>
                        )}
                    </div>
                    {/* Author Email */}
                    <div className=''>
                        <Typography className="text-primary font-medium mb-1">
                            Author Email
                        </Typography>
                        <Input
                            type="email"
                            className='text-primary'
                            placeholder="sopon@ahmed.com"
                            defaultValue={user.email}
                            {...register('authorEmail', { required: 'Author Email is required' })}
                            error={!!errors.authorEmail}
                        />
                        {errors.authorEmail && (
                            <Typography className="text-red-500 text-sm mt-1">
                                {errors.authorEmail.message}
                            </Typography>
                        )}
                    </div>

                    {/* Title */}
                    <div className=''>
                        <Typography className="text-primary font-medium mb-1">
                            Title
                        </Typography>
                        <Input
                            type="text"
                            className='text-primary'
                            placeholder="Announcement Title"
                            {...register('title', { required: 'Title is required' })}
                            error={!!errors.title}
                        />
                        {errors.title && (
                            <Typography className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </Typography>
                        )}
                    </div>

                    {/* Description */}
                    <div className=''>
                        <Typography className="text-primary font-medium mb-1">
                            Description
                        </Typography>
                        <Textarea
                            rows={4}
                            className='text-primary'
                            placeholder="Write your announcement here..."
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 10,
                                    message: 'Description must be at least 10 characters',
                                },
                            })}
                            error={!!errors.description}
                        />
                        {errors.description && (
                            <Typography className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </Typography>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <Button type="submit" color="blue" className="btn btn-primary">
                            Submit Announcement
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default MakeAnnouncement;
