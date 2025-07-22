import { useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading";


const CommentRow = ({ comment, handleModal }) => {
    const [feedback, setFeedback] = useState('');
    const axiosPublic = useAxios(); 

    const {data: existingComment, refetch } = useQuery({
        queryKey: ['comment', comment._id], 
        queryFn: async () =>{
            const res = await axiosPublic.get(`/report/${comment._id}`); 
            return res.data; 
        }
    })

    const shortComment = comment?.comment?.length > 20
        ? `${comment?.comment.slice(0, 20)}...`
        : comment?.comment;

    const handleReport =async () => {
        const { _id, createdAt, ...restData } = comment; 
        const reportData = {
            commentId : _id, 
            feedback ,
            createdAt: new Date(), 
            ...restData, 
            status: "pending"
        }; 
        const {data} = await axiosPublic.post('/reports', reportData); 
        if(data.insertedId) {
            Swal.fire({
                title: "Success", 
                text: "Your report has beed submitted", 
                icon: "success", 
                iconColor: "skyblue"
            })
        }; 
        refetch(); 
    };
    return (
        <>
            {/* Table Row */}
            <tr className="hover:bg-base-200">
                <td className="text-sm ">{comment?.email}</td>
                <td className="text-sm ">
                    {shortComment}
                    {comment?.comment?.length > 20 && (
                        <button
                            className="text-blue-500 ml-1 text-sm"
                            onClick={() => handleModal(comment)}
                        >
                            Read More
                        </button>
                    )}
                </td>
                <td className="text-sm max-w-24">
                    <select
                        className="select  select-bordered text-sm"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    >
                        <option disabled value="" className="cursor-pointer text-sm">
                            Select feedback
                        </option>
                        <option className="cursor-pointer text-sm">Spam content</option>
                        <option className="cursor-pointer text-sm">Offensive language</option>
                        <option className="cursor-pointer text-sm">Irrelevant message</option>
                    </select>
                </td>
                <td className="text-sm ">
                    <button
                        className="btn btn-sm btn-error text-white"
                        onClick={handleReport}
                        disabled={!feedback || existingComment}
                    >
                        {existingComment ? 'Reported' : 'Report'}
                    </button>
                </td>
            </tr>
        </>
    );
};
export default CommentRow;