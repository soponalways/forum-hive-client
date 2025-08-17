import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationMui = ({ limit, current, data, totalCountData , setCurrent}) => {
    const totalPages = Math.ceil(totalCountData.count / limit);
    const handleChange = (event, value) => {
        setCurrent(value - 1);
    };

    return (
        <div className='flex justify-between flex-col md:flex-row gap-1 md:gap-2 lg:gap-3 items-center w-fit mx-auto bg-white my-5 md:my-8 lg:my-10 rounded-lg py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 md:rounded-xl shadow shadow-secondary'>
            <div>
                <span className='text-gray-500 mr-1 md:mr-2 '>showing</span>
                <span className='text-gray-800 mr-1 md:mr-2  font-semibold'>{limit * current || 1}-{limit * current + data.length}</span>
                <span className='text-gray-500 mr-1 md:mr-2 '>of</span>
                <span className='text-gray-800 mr-1 md:mr-2  font-semibold'>{totalCountData.count}</span>
            </div>
            <div>
                <div className='text-center '>
                    <Stack spacing={2}>
                        <Pagination count={totalPages} page={current + 1} onChange={handleChange}
                            variant="outlined" shape="rounded" color='primary'
                         />
                    </Stack>

                </div>
            </div>
            
        </div>
    );
};

export default PaginationMui;