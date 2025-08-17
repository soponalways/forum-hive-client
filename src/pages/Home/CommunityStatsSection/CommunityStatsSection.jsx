import { useInView } from "motion/react";
import { useRef } from "react";
import StatsCard from "./StatsCard";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ForumIcon from "@mui/icons-material/Forum";
import CategoryIcon from "@mui/icons-material/Category";

const statsData = [
    {
        id: 1,
        title: "Members",
        number: 5000,
        icon: <PeopleAltIcon fontSize="inherit" />,
    },
    {
        id: 2,
        title: "Posts",
        number: 12000,
        icon: <ForumIcon fontSize="inherit" />,
    },
    {
        id: 3,
        title: "Categories",
        number: 15,
        icon: <CategoryIcon fontSize="inherit" />,
    },
];

const CommunityStatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="w-full bg-white py-12 rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-primary/30">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary">Community Stats</h2>
                <p className="text-gray-600">
                    Our forum is growing day by day — thanks to users like you!
                </p>
            </div>

            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 md:px-6 lg:px-8">
                {statsData.map((item) => (
                    <StatsCard
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        number={item.number}
                        isInView={isInView}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommunityStatsSection;
