import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const Pagination = ({ limit, current, data, totalCountData , setCurrent}) => {

    const totalPages = Math.ceil(totalCountData.count / limit);

    const pages = [...Array(totalPages).keys()]; 
    const handleLeft = () => {
        if (current > 0) {
            return setCurrent(prev => prev - 1)
        }
    }
    const handleRight = () => {
        if (current < pages.length - 1) {
            return setCurrent(prev => prev + 1)
        }
    }
    const handleDirectButton = v => {
        setCurrent(v)
    }
    return (
        <div className='flex justify-between items-center w-3/4 mx-auto bg-white my-5 md:my-8 lg:my-10 rounded-lg py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 md:rounded-xl shadow shadow-secondary'>
            <div>
                <span className='text-gray-500 mr-1 md:mr-2 '>showing</span>
                <span className='text-gray-800 mr-1 md:mr-2  font-semibold'>{limit * current || 1}-{limit * current + data.length}</span>
                <span className='text-gray-500 mr-1 md:mr-2 '>of</span>
                <span className='text-gray-800 mr-1 md:mr-2  font-semibold'>{totalCountData.count}</span>
            </div>
            <div>
                <div className='text-center '>
                    <span className='join join-horizontal'>
                        <span className='btn bg-white text-black join-item' onClick={handleLeft}><FaArrowLeft></FaArrowLeft></span>
                        {pages?.map(p => (
                            <button key={p}
                                className={`btn border bg-primary-content text-black join-item ${current === p ? 'bg-primary/40 text-secondary' : ''}`}
                                onClick={() => handleDirectButton(p)}
                            >{p}</button>
                        ))}
                        <span className='btn bg-white text-black join-item' onClick={handleRight}><FaArrowRight></FaArrowRight></span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Pagination;