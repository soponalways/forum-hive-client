import { Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';

const ReportedActivities = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reports =[], isLoading, refetch} = useQuery({
        queryKey: ['report'], 
        queryFn: async () => {
            const res = await axiosSecure.get('/reports'); 
            return res.data; 
        }
    })

    const handleAction = async (action, reportId, userEmail, commentId) => {
        const response = await axiosSecure.patch(`/reports/action`, {
            action,
            reportId,
            userEmail,
            commentId,
        });
        if (response.data.modifiedCount > 0) {
            Swal.fire('Success', `${action} applied`, 'success');
        }
        refetch();
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    if(reports.length === 0) {
        return <div className='flex justify-center items-center min-h-screen'>
            <p className='text-2xl md:text-3xl lg:text-4xl font-semibold'>@ No Report Founds</p>
        </div>
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
        </div>
    );
};

export default ReportedActivities;
