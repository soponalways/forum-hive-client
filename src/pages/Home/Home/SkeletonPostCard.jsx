import React from 'react';
import { FaComments } from 'react-icons/fa';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonPostCard = () => {
    return (
        <div className=' p-5 hover:drop-shadow-xl hover:drop-shadow-primary bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer duration-300 border border-base-200'>
            <Stack spacing={1}>
                <div className="flex items-center gap-3 mb-4">
                    <Skeleton variant="circular" width={40} height={40} />
                    <div>
                        <p className="animate-pulse mb-2"> <Skeleton variant="rectangular" width={150} height={15} /></p>
                        <p className="animate-pulse"><Skeleton variant="rectangular" width={100} height={10} /></p>
                    </div>
                </div>
                <Skeleton variant="rectangular" width={"100%"} height={30} />
                <button className='mb-4 w-24 animate-pulse font-semibold btn btn-xs md:btn-sm btn-secondary rounded-xl md:rounded-2xl'></button><br />
                <p className="animate-pulse">
                    <span className="inline-block bg-secondary/10 text-secondary font-medium px-3 py-1 rounded-full text-sm mb-3 w-20 h-6"></span>
                </p>
                <div className="animate-pulse flex justify-between items-center text-black text-sm font-medium">
                    <p className="flex items-center gap-1 animate-pulse">
                        <FaComments className="text-primary animate-pulse" /><span className='text-black'> <Skeleton variant="rounded" width={100} height={15} /></span>
                    </p>
                    <p className='animate-pulse rounded-2xl text-black bg-primary/50'><Skeleton variant="rounded" width={100} height={15} /></p>
                </div>
            </Stack>
        </div>
    );
};

export default SkeletonPostCard;