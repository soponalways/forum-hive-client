import { FaGlobe, FaRocket } from "react-icons/fa";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        About ForumHive
                    </h1>
                    <p className="text-base-content/80 max-w-2xl mx-auto">
                        ForumHive is an open community platform where developers and learners
                        come together to share knowledge, ask questions, and grow their skills.
                        Our mission is to empower collaboration and learning in a friendly
                        and inclusive environment.
                    </p>
                </div>

                {/* Mission & Vision Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="card bg-base-100 shadow-xl p-6 hover:shadow-primary rounded-2xl">
                        <h2 className="text-2xl flex gap-2 items-center font-semibold text-secondary mb-3">
                            <FaRocket /> Our Mission
                        </h2>
                        <p className="text-base-content/80">
                            To build a global hub for learners and professionals where ideas
                            are exchanged, problems are solved, and knowledge is shared freely.
                            We believe in community-driven growth and open collaboration.
                        </p>
                    </div>

                    <div className="card bg-base-100 shadow-xl p-6 hover:shadow-primary rounded-2xl">
                        <h2 className="text-2xl flex gap-2 items-center font-semibold text-secondary mb-3">
                            <FaGlobe /> Our Vision
                        </h2>
                        <p className="text-base-content/80">
                            To become one of the most trusted platforms for web developers,
                            coders, and tech enthusiasts worldwide — where everyone can find
                            answers, opportunities, and inspiration.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">Meet the Team</h2>
                    <p className="text-base-content/80 max-w-2xl mx-auto">
                        Behind ForumHive is a passionate team of developers and creators who
                        are dedicated to making knowledge sharing accessible to all.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Example team members */}
                    <div className="card bg-base-100 hover:shadow-primary shadow-xl p-6 rounded-2xl text-center">
                        <img
                            src="https://i.pravatar.cc/150?img=11"
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold">Sopon Ahmed</h3>
                        <p className="text-sm text-base-content/70">Founder & Developer</p>
                    </div>

                    <div className="card bg-base-100 hover:shadow-primary shadow-xl p-6 rounded-2xl text-center">
                        <img
                            src="https://i.pravatar.cc/150?img=5"
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold">Rokeya</h3>
                        <p className="text-sm text-base-content/70">Community Manager</p>
                    </div>

                    <div className="card bg-base-100 hover:shadow-primary shadow-xl p-6 rounded-2xl text-center">
                        <img
                            src="https://i.pravatar.cc/150?img=7"
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold">Base Coder Team</h3>
                        <p className="text-sm text-base-content/70">Content Creators</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
