import { Select } from '@headlessui/react';
import Loading from '../../../components/Loading';
import useGetPopularTags from '../../../api/useGetPopularTags';


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
        <div className="py-16 px-4 md:px-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl md:rounded-2xl mb-4 sm:mb-8 lg:mb-10">
            {/* Banner Section */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-extrabold text-black mb-6 leading-tight">
                    Discover & Share Ideas <br className="hidden md:block" /> on <span className="text-primary">ForumHive</span>
                </h1>
                <form onSubmit={handleSubmit(onSearch)} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <input
                        type="text"
                        {...register('search', { required: true })}
                        placeholder="Search by tag (e.g., react, nodejs)"
                        className="input input-bordered w-full max-w-sm mt-4  focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type='submit' className="btn btn-primary px-8 py-2 text-white">Search</button>
                </form>
                
                {/* Popular Tags Section */}
                <div className="mt-6">
                    <p className="text-gray-600 text-sm mb-3 text-center">Popular topics:</p>
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
                                    className="bg-primary/10 cursor-pointer hover:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 hover:scale-105 active:scale-95"
                                >
                                    {tag.value || tag}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className='flex justify-end items-center'>
                <button onClick={() => isSearching ? setSearchSort(prev=> !prev): setSort(prev => !prev)} className='btn btn-secondary'>Sort by popularity</button>
            </div>
        </div>
    );
};

export default Banner;
