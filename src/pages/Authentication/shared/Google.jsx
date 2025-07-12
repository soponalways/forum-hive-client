import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { FaGoogle } from 'react-icons/fa';

const Google = ({ from }) => {
    const { signInWithGoogle, setLoading } = useAuth();
    const navigate = useNavigate();
    // Function to handle Google sign-in
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                Swal.fire("Welcome!", "Logged in with Google", "success");
                navigate(from, { replace: true });
                setLoading(false); // Reset loading state after successful login
            })
            .catch(err => {
                Swal.fire("Error", err.message, "error");
            });
    };
    return (
        <button
            onClick={handleGoogleSignIn}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
            <FaGoogle /> Continue with Google
        </button>
    );
};

export default Google;