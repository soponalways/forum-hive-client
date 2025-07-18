import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaComments } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import { Select } from '@headlessui/react';
import useGetPosts from '../../../api/useGetPosts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import Pagination from './Pagination';

const Banner = () => {
    const { register, handleSubmit, reset } = useForm();
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [order, setOrder] = useState(null);
    const [searchQuery , setSearchQuery] = useState('')
    const axiosPublic = useAxios();
    const [current , setCurrent] = useState(0);
    

    const {data = []  , isLoading} = useGetPosts({
        sortBy,
        order,
        limit: 5, 
        current
    });

    const { data: searchPostData = [] , isLoading : isLoading2 } = useQuery({
        queryKey: ['posts', searchQuery, current],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts/search', {
                params: {
                    tag: searchQuery, 
                    current
                }
            })
            return res.data
        }
    })

    useEffect(() => {
        if(searchPostData) {
            setSearchResults(searchPostData)
        }
    }, [searchPostData])

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                setPosts(data);
                setIsSearching(false)
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllPosts();
    }, [data]);

    const onSearch = async (data) => {
        setIsSearching(true);
        setCurrent(0)
        try {
            setSearchQuery(data.search)
        } catch (error) {
            console.error(error);
        } finally {
            reset();
        }
    };

    const handleSort = async (value) => {
        const sortByValue = value.split('&')[0];
        setSortBy(sortByValue); 
        const orderValue = value.split('&')[1] || 'desc';
        setOrder(orderValue)
        setIsSearching(true);
    }

    const options = [
        { value: '', label: 'Sort By' },
        { value: 'popularity&desc', label: 'Popularity' },
        { value: 'popularity&asc', label: 'Lower Popularity' },
        { value: 'date&desc', label: 'Newest to Oldest' },
        { value: 'date&asc', label: 'Oldest to Newest' },

    ]
    const displayedPosts = isSearching ? searchResults : posts;

    if(isLoading) {
        return <Loading></Loading>
    } else if (isLoading2) {
        return <Loading></Loading>
    }
    return (
        <div className="py-16 px-4 md:px-8 bg-gradient-to-br from-primary/10 to-secondary/10 min-h-[100vh]">
            {/* Banner Section */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-extrabold text-black mb-6 leading-tight">
                    Discover & Share Ideas <br className="hidden md:block" /> on <span className="text-primary">ForumHive</span>
                </h1>
                <form onSubmit={handleSubmit(onSearch)} className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                    <input
                        type="text"
                        {...register('search', { required: true })}
                        placeholder="Search by tag (e.g., react, nodejs)"
                        className="input input-bordered w-full max-w-sm  focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="btn btn-primary px-8 py-2 text-white">Search</button>
                </form>
            </div>
            <div className='text-end mb-8'>
                <Select
                    className="w-full max-w-sm mx-auto mb-8 cursor-pointer  bg-primary/10 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 mr-5"
                    onChange={(e) => {
                        handleSort(e.target.value);
                    }}
                    defaultValue=""
                >
                    {options.map((option) => (
                        <option
                            className='text-black font-medium cursor-pointer hover:bg-primary/10'
                            key={option.value}
                            disabled={option.value === ''}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}

                </Select>
            </div>

            {/* Posts Display Section */}
            <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1">
                {displayedPosts?.map((post, index) => (
                    <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut', delay: index * 0.05 }}
                        className="p-5 hover:drop-shadow-xl hover:drop-shadow-primary bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer duration-300 border border-base-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={post.authorImage}
                                alt="author"
                                className="w-12 h-12 rounded-full border border-secondary shadow"
                            />
                            <div>
                                <p className="font-semibold text-black text-lg">{post.authorName}</p>
                                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-black mb-2">{post.title}</h2>
                        <p className="inline-block bg-secondary/10 text-secondary font-medium px-3 py-1 rounded-full text-sm mb-3">
                            #{post.tag}
                        </p>
                        <div className="flex justify-between items-center text-black text-sm font-medium">
                            <p className="flex items-center gap-1">
                                <FaComments className="text-primary" /> {0} Comments
                            </p>
                            <p>Total Votes: {(post.upVote || 0) + (post.downVote || 0)}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div>
                {displayedPosts && (
                    <Pagination
                        setCurrent={setCurrent}
                        current={current}
                    ></Pagination>
                )}
            </div>

            <div>
                {isSearching && displayedPosts?.length === 0 && (
                    <p className="text-center text-red-500 mt-10 text-lg font-semibold">No posts found for that tag.</p>
                )}
            </div>
        </div>
    );
};

export default Banner;
