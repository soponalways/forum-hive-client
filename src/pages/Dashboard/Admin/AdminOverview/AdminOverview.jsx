import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import {
    Card,
    CardBody,
    Typography,
    Avatar,
    Input,
    Button
} from '@material-tailwind/react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const AdminOverview = () => {
    const axiosSecure = useAxiosSecure(); 
    const {user } = useAuth(); 
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/stats/${user.email}`)
            return res.data; 
        }
    });

    // Hook form 
    const { register , handleSubmit , formState : {errors}, reset} = useForm(); 

    const tagSubmit =async data => {
        try {
            const res = await axiosSecure.post('/tag', data);
            console.log("response on tagSubmit", res)
            if (res.data.insertedId) {
                Swal.fire("Success", `
                <div>
                    <p className='text-xl font-semibold text-center'>Tag Successfully added</p>
                </div>
                `, 'success');
                reset();
            }
        } catch (error) {
            Swal.fire("Something went Wrong", error.message , 'error')
        }
    }
    
    if (isLoading) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    const { name, email, image, posts, comments, users } = stats || {};

    const pieData = [
        { name: 'Posts', value: posts },
        { name: 'Comments', value: comments },
        { name: 'Users', value: users },
    ];

    const formatLabel = ({ name, value }) => `${value} ${name}`;

    return (
        <motion.div
            className=" max-w-5xl mx-auto"
            transition={{duration: 3}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Admin Card */}
            <motion.div 
                transition={{ duration: 1.1}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{y:-10}}
            >
                <Card className="mb-4 md:mb-8 shadow-lg shadow-primary">
                    <CardBody className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar src={image} alt="admin" size="xxl" />
                        <div>
                            <Typography variant="h5" color="blue-gray">{name}</Typography>
                            <Typography variant="small" className="text-gray-600">{email}</Typography>
                            <div className="mt-4 space-x-4 text-sm font-semibold text-gray-700">
                                <span>{posts} Posts</span>
                                <span>{comments} Comments</span>
                                <span>{users} Users</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
                transition={{ duration: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                >
                <Card className="shadow-lg shadow-primary mb-4 md:mb-8">
                    <CardBody>
                        <Typography variant="h6" color="blue" className='text-2xl md:text-3xl lg:text-4xl font-medium md:font-semibold lg:font-bold'>Site Data Overview</Typography>
                        <div className="h-72 w-full mt-6">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        labelLine={false}
                                        label={formatLabel}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value, name) => [`${value}`, name]} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>

            {/* Tags Card */}
            <motion.div
                transition={{ duration: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                >
                <Card className='shadow-lg shadow-primary'>
                    <CardBody>
                        <Typography variant="h6" color="blue" className='text-2xl md:text-3xl lg:text-4xl font-medium md:font-semibold lg:font-bold'>Add Tags</Typography>
                        <div className='flex justify-center items-center'>
                            <form onSubmit={handleSubmit(tagSubmit)} className='space-y-2 md:space-y-4 lg:space-y-6 bg-primary/30 duration-200 px-6 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12 rounded-xl md:rounded-2xl hover:shadow shadow-primary'> 
                                <div>
                                    <Typography className='text-secondary text-lg md:text-xl font-medium md:font-semibold'>Value</Typography>
                                    <Input type='text' placeholder='Enter the Tags Value' {...register("value", { required: "Value must be required." })}></Input>
                                    {errors?.value && <Typography className='text-sm text-red-600'>{errors?.value?.message}</Typography>}
                                </div>
                                <div>
                                    <Typography className='text-secondary text-lg md:text-xl font-medium md:font-semibold'>Label</Typography>
                                    <Input type='text' placeholder='Enter the Label of tags' {...register("label", { required: "Label must be required." })}></Input>
                                    {errors?.label && <Typography className='text-sm text-red-600'>{errors.label.message}</Typography>}
                                </div>
                                <Button type='submit' className='btn btn-secondary'>Add Tag</Button>
                            </form>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default AdminOverview;
