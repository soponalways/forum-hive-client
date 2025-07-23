import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react';
import { motion } from 'motion/react';
import useAxios from '../../../hooks/useAxios';

const AnnouncementSection = () => {
    const axiosPublic = useAxios();
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        }
    });
    if (isLoading || announcements.length === 0) return null; // Don't show anything if loading or empty

    return (
        <section className="px-4 py-8  mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Typography variant="h5" className="mb-6 text-primary">
                    Latest Announcements
                </Typography>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map(({ _id, title, description, authorImage, authorName }) => (
                        <Card
                            key={_id}
                            className="border border-blue-100 shadow-md max-w-screen overflow-hidden"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 100, scale: 1 }}
                            whileHover={{ background: "blue", duration: 300 }}
                        >
                            <CardHeader floated={false} className="flex items-center gap-4 p-4">
                                <Avatar src={authorImage} alt={authorName} size="md" />
                                <div>
                                    <Typography variant="h6" color="blue-gray">{authorName}</Typography>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h6" className="mb-2 text-blue-700">{title}</Typography>
                                <Typography className="text-sm text-gray-700">{description}</Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AnnouncementSection;
