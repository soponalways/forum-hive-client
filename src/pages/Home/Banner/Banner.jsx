import { Select } from '@headlessui/react';
import Loading from '../../../components/Loading';
import useGetPopularTags from '../../../api/useGetPopularTags';
import { FaSearch } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter'


const Banner = ({ setSort, onSearch, isLoading2, isLoading, handleSubmit, register, setSearchSort, isSearching }) => {
    const { data: popularTags = [], isLoading: isLoadingTags } = useGetPopularTags();
    
    const handlePopularTagClick = (tagValue) => {
        if (onSearch) {
            onSearch({ search: tagValue });
        }
    };
    
    if(isLoading) {
        return <Loading></Loading>
    } else if (isLoading2) {
        return <Loading></Loading>
    }
    return (
        <div className="relative py-16 px-4 md:px-8 bg-contain bg-conic bg-[url(https://res.cloudinary.com/dthmavlxj/image/upload/v1756225427/forumBanner_wo4nrt.jpg)] bg-repeat-round bg-cover rounded-xl md:rounded-2xl mb-4 sm:mb-8 lg:mb-10">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
            {/* bg-gradient-to-br from-primary/10 to-secondary/10 */}
            {/* Banner Section */}
            <div className="relative max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-extrabold text-black mb-6 leading-tight">
                    <span className='bg-gradient-to-br from-primary/50 to-secondary/50  via-pink-500 bg-clip-text text-transparent'><span><Typewriter 
                        words={['Ask', 'Discuss', 'Share']}
                        loop={false}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                     /></span></span> <br className="hidden md:block" /> on <span className="text-primary">ForumHive</span>
                </h1>
                <form onSubmit={handleSubmit(onSearch)} className="flex relative flex-col sm:flex-row justify-center items-center gap-4">
                    <input
                        type="text"
                        {...register('search', { required: true })}
                        placeholder="Search by tag (e.g., react, nodejs)"
                        className="input input-bordered w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type='submit' className=" absolute top-1/6 cursor-pointer px-2 py-2 z-10 right-5 text-primary"><FaSearch size={24}/></button>
                </form>
                
                {/* Popular Tags Section */}
                <div className="mt-6">
                    <p className="text-black text-sm mb-3 text-center">Popular topics:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {isLoadingTags ? (
                            <div className="flex gap-2">
                                <div className="animate-pulse bg-gray-200 rounded-full px-3 py-1 w-16 h-6"></div>
                                <div className="animate-pulse bg-gray-200 rounded-full px-3 py-1 w-20 h-6"></div>
                                <div className="animate-pulse bg-gray-200 rounded-full px-3 py-1 w-24 h-6"></div>
                            </div>
                        ) : (
                            popularTags?.map((tag, index) => (
                                <button
                                    key={tag._id || index}
                                    onClick={() => handlePopularTagClick(tag.value || tag)}
                                    className="bg-secondary/10 cursor-pointer hover:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 hover:scale-105 active:scale-95"
                                >
                                    {tag.value || tag}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className='relative flex justify-end items-center'>
                <button onClick={() => isSearching ? setSearchSort(prev=> !prev): setSort(prev => !prev)} className='btn btn-secondary'>Sort by popularity</button>
            </div>
        </div>
    );
};

export default Banner;
