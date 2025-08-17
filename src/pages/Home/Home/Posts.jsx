import React from 'react';
import PostCard from './PostCard';

const Posts = ({posts}) => {
    return (
        <div className=" mx-auto grid gap-8 grid-cols-1">
            {posts?.map((post, index) => <PostCard key={post._id} post={post} index={index}></PostCard>)}
        </div>
    );
};

export default Posts;