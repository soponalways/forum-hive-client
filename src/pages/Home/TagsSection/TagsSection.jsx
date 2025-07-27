import { useQuery } from '@tanstack/react-query';
import { Chip, Typography, Card, CardBody } from '@material-tailwind/react';
import { motion } from 'motion/react';
import useAxios from '../../../hooks/useAxios';

const TagsSection = ({ onSearch }) => {
    const axiosPublic = useAxios(); 
    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tags'); 
            return res.data; 
        }
    });

    const handleTagClick = (tagValue) => {
        if (onSearch) {
            onSearch({ search: tagValue });
        }
    };

    if (isLoading) return <p className="text-center text-blue-500 min-h-screen flex justify-center items-center">Loading tags...</p>;

    return (
        <motion.div
            className="py-8 mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card className="shadow-lg">
                <CardBody>
                    <Typography variant="h6" color="blue-gray" className="mb-4 text-center">Explore Tags</Typography>
                    <Typography variant="h6" color="blue-gray" className="mb-4 text-center">all tags you can search on the search bar. and click on the tag to search </Typography>
                    <div className="flex flex-wrap gap-3">
                        {tags.map((tag) => (
                            <Chip
                                key={tag._id}
                                value={tag.value}
                                onClick={() => handleTagClick(tag.value)}
                                className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 hover:scale-105 transition-all duration-200 active:scale-95"
                            />
                        ))}
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    );
};

export default TagsSection;
