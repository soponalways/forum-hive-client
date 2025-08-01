import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import TagsSection from '../TagsSection/TagsSection';
import AnnouncementSection from '../AnnouncementSection/AnnouncementSection';
import { useForm } from 'react-hook-form';
import useAxios from '../../../hooks/useAxios';
import useGetPosts from '../../../api/useGetPosts';
import { useQuery } from '@tanstack/react-query';
import Posts from './Posts';
import Pagination from './shared/Pagination';
import no_Data_Found from '../../../assets/Lottie/no_Data_Found.json';
import Lottie from 'lottie-react';

const Home = () => {
    const { register, handleSubmit, reset } = useForm();
    const [defaultPosts, setDefaultPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const axiosPublic = useAxios();
    const [current, setCurrent] = useState(0);
    const [searchCurrent, setSearchCurrent] = useState(0);
    const [sort, setSort] = useState(false);
    const [searchSort, setSearchSort] = useState(false);
    const limit = 5;

    const { data = [], isLoading } = useGetPosts({
        limit: 5,
        current,
        sort
    });

    const { data: totalPostsCountData = { count: 0 } } = useQuery({
        queryKey: ['totalPostsCount', searchQuery],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts/count', {
                params: {
                    search: isSearching ? searchQuery : null
                }
            });
            return res.data;
        }
    })

    const { data: searchPostData = [], isLoading: isLoading2 } = useQuery({
        queryKey: ['posts', searchQuery, searchCurrent, searchSort],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts/search', {
                params: {
                    tag: searchQuery,
                    current: searchCurrent,
                    sort: searchSort,
                    limit
                }
            })
            return res.data
        }
    })

    useEffect(() => {
        if (searchPostData) {
            setSearchResults(searchPostData)
        }
    }, [searchPostData])

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                setDefaultPosts(data);
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
    const posts = isSearching ? searchResults : defaultPosts;
    return (
        <div>
            <header>
                <Banner
                    setSort={setSort}
                    onSearch={onSearch}
                    isLoading2={isLoading2}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    register={register}
                    setIsSearching={setIsSearching}
                    isSearching={isSearching}
                    posts={posts}
                    setSearchSort={setSearchSort}
                />
            </header>
            <main>

                {/* Show the all posts */}
                <section>
                    <div>
                        {isSearching && posts?.length === 0 ? (
                            <div className='flex flex-col bg-primary/10 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 gap-3 md:gap-5 lg:gap-6'>
                                <h2 className="text-center text-red-500 text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold">Sorry Post No found.</h2>
                                <p className="text-center text-red-500 text-lg font-semibold">No posts found for that tag.</p>
                                <p className="text-center text-green-500 text-lg font-semibold">Please Search another Tag to get posts.</p>
                                <div className='w-1/3 mx-auto'>
                                    <Lottie
                                        className=''
                                        animationData={no_Data_Found}
                                        loop={true}
                                    ></Lottie>
                                </div>
                            </div>
                        )
                            :
                            (
                                <>
                                    <Posts
                                        posts={posts}
                                    ></Posts>
                                    <div>
                                        {defaultPosts && !isSearching && (
                                            <Pagination
                                                limit={limit}
                                                current={current}
                                                data={posts}
                                                totalCountData={totalPostsCountData}
                                                setCurrent={setCurrent}
                                            ></Pagination>
                                        )}
                                        {isSearching && (
                                            <Pagination
                                                limit={limit}
                                                current={searchCurrent}
                                                data={searchResults}
                                                totalCountData={totalPostsCountData}
                                                setCurrent={setSearchCurrent}
                                            ></Pagination>
                                        )}

                                    </div>
                                </>
                            )
                        }
                    </div>

                </section>
                <section>
                    <TagsSection onSearch={onSearch}></TagsSection>
                </section>
                <section>
                    <AnnouncementSection></AnnouncementSection>
                </section>
            </main>
        </div>
    );
};

export default Home;