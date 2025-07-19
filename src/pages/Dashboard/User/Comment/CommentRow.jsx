import { useState } from "react";


const CommentRow = ({ comment, handleModal }) => {
    const [feedback, setFeedback] = useState('');
    const [reportClicked, setReportClicked] = useState(false);

    const shortComment = comment?.comment?.length > 20
        ? `${comment?.comment.slice(0, 20)}...`
        : comment?.comment;

    const handleReport = () => {
        setReportClicked(true);
        // Send report to backend here
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
                        disabled={!feedback || reportClicked}
                    >
                        {reportClicked ? 'Reported' : 'Report'}
                    </button>
                </td>
            </tr>
        </>
    );
};
export default CommentRow;