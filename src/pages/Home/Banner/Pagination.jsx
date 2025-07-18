import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Loading from '../../../components/Loading';

const Pagination = ({ setCurrent, current }) => {
    const axiosPublic = useAxios();
    const {data:total=[], isLoading} = useQuery({
        queryKey: ['pagination', 'total'], 
        queryFn : async () => {
            const res = await axiosPublic.get('/posts/count'); 
            return res.data; 
        }
    }); 

    const limit = 5; 
    const totalPages = Math.ceil(total?.count / limit); 
    
    const page = Number.isFinite(totalPages) && totalPages > 0
        ? [...Array(totalPages).keys()]
        : [];

    const handleLeft = () => {
        if(current > 0) {
        return setCurrent(prev => prev - 1)
        }
    }
    const handleRight = () => {
        if (current < page.length -1) {
        return setCurrent(prev => prev + 1)
        }
    }
    const handleDirectButton = v => {
        setCurrent(v)
    }

    if(isLoading) {
        return <Loading></Loading>
    }
    
    return (
        <div className=''>
            <div className='text-center my-4 md:my-6'>
                <span className='btn btn-primary mr-2' onClick={handleLeft}><FaArrowLeft></FaArrowLeft></span>
                <span>
                    {page?.map(p => (
                        <button key={p} 
                        className={`btn btn-primary mr-2 text-black ${current === p ? 'bg-green-400' : ''}`} 
                            onClick={() => handleDirectButton(p)}
                        >{p}</button>
                    ))}
                </span>
                <span className='btn btn-primary' onClick={handleRight}><FaArrowRight></FaArrowRight></span>
            </div>
        </div>
    );
};

export default Pagination;