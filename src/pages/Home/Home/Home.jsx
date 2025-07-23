import React from 'react';
import Banner from '../Banner/Banner';
import TagsSection from '../TagsSection/TagsSection';
import AnnouncementSection from '../AnnouncementSection/AnnouncementSection';

const Home = () => {
    return (
        <div>
             <main>
                <Banner />
                <TagsSection></TagsSection>
                <AnnouncementSection></AnnouncementSection>
             </main>
        </div>
    );
};

export default Home;