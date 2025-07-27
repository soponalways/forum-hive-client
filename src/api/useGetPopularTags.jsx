import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';

const useGetPopularTags = () => {
    const axiosPublic = useAxios();
    
    const getPopularTags = useQuery({
        queryKey: ['popularTags'],
        queryFn: async () => {
            try {
                const response = await axiosPublic.get('/tags/popular');
                return response.data.data;
            } catch (error) {
                console.error('Error fetching popular tags:', error);
                throw error;
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
    });

    return getPopularTags;
};

export default useGetPopularTags;