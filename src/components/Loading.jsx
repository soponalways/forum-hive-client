// components/Loading.jsx

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-96 bg-base-100 text-center px-4">
            <div className="rounded-box drop-shadow-xl hover:drop-shadow-primary rounded-full overflow-hidden max-w-md w-40 h-40">
                <img
                    src="/Logo.png"
                    alt="Fourm Hive"
                    className="object-cover w-full h-auto rounded-full"
                />
            </div>
            {/* DaisyUI spinner for extra visual feedback */}
            <span className="loading loading-spinner loading-lg text-primary mt-6"></span>
        </div>
    );
};

export default Loading;
