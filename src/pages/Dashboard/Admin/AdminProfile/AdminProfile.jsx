import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import {
    Card,
    CardBody,
    Typography,
    Avatar
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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure(); 
    const {user } = useAuth(); 
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/stats/${user.email}`)
            return res.data; 
        }
    });

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
            className="p-4 max-w-5xl mx-auto"
            transition={{duration: 3}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Admin Card */}
            <Card className="mb-8 shadow-lg">
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

            {/* Pie Chart */}
            <Card className="shadow-lg">
                <CardBody>
                    <Typography variant="h6" color="blue">Site Data Overview</Typography>
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
    );
};

export default AdminProfile;
