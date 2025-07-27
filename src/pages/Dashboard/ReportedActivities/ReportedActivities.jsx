import { Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import Pagination from '../../Home/Home/shared/Pagination';

const ReportedActivities = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxios();
    const [current, setCurrent] = useState(0);
    const limit = 10;

    const { data: reports = [], isLoading, refetch: refetchReports } = useQuery({
        queryKey: ['report', current],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reports?page=${current}&limit=${limit}`);
            return res.data;
        }
    });

    const { data: total = {}, isLoading: countLoading, refetch: refetchCount } = useQuery({
        queryKey: ['reports-count'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reports/count');
            return res.data;
        }
    });


    const handleAction = async (action, reportId, userEmail, commentId) => {
        try {
            const response = await axiosSecure.patch(`/reports/action`, {
                action,
                reportId,
                userEmail,
                commentId,
            });
            
            if (response.data.modifiedCount > 0) {
                Swal.fire('Success', `${action} applied`, 'success');
                
                // Refetch both reports and count data
                await Promise.all([
                    refetchReports(),
                    refetchCount()
                ]);
                
                // If current page becomes empty after action, go to previous page
                if (reports.length === 1 && current > 0) {
                    setCurrent(current - 1);
                }
            } else {
                Swal.fire('Info', 'No changes were made', 'info');
            }
        } catch (error) {
            console.error('Error performing action:', error);
            Swal.fire('Error', 'Failed to perform action', 'error');
        }
    };

    if (isLoading || countLoading) {
        return <Loading></Loading>;
    }

    if(reports.length === 0 && total?.count === 0) {
        return <div className='flex justify-center items-center min-h-screen'>
            <p className='text-2xl md:text-3xl lg:text-4xl font-semibold'>@ No Report Found</p>
        </div>;
    }
    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Reported Comments</h2>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Post ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports?.map((report) => (
                            <tr key={report._id}>
                                <td>{report.email}</td>
                                <td>
                                    {report.comment.length > 30 ? (
                                        <span>{report.comment.slice(0, 30)}...</span>
                                    ) : (
                                        report.comment
                                    )}
                                </td>
                                <td>{report.feedback}</td>
                                <td>{report.postId}</td>
                                <td className="flex gap-2">
                                    <Button className=' btn btn-outline border-amber-300' onClick={() => handleAction('ignore', report._id)}>Ignore</Button>
                                    <Button className=' btn btn-outline border-amber-300' onClick={() => handleAction('warn', report._id, report.email)}>Warn</Button>
                                    <Button className=' btn btn-outline border-red-500' onClick={() => handleAction('delete-comment', report._id, '', report.commentId)}>Delete</Button>
                                    <Button className=' btn btn-outline border-red-500' color="red" onClick={() => handleAction('block', report._id, report.email)}>Block</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {total?.count > limit && (
                <Pagination
                    limit={limit}
                    current={current}
                    data={reports}
                    totalCountData={total}
                    setCurrent={setCurrent}
                />
            )}
        </div>
    );
};

export default ReportedActivities;
