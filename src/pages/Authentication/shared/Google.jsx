import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { FaGoogle } from 'react-icons/fa';
import useSaveUser from '../../../api/useSaveUser';
import useAxios from '../../../hooks/useAxios';

const Google = ({ from }) => {
    const { signInWithGoogle, setLoading } = useAuth();
    const navigate = useNavigate();
    const { saveUserToDB } = useSaveUser();
    const axiosPublic = useAxios();

    // Function to handle Google sign-in
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async userCredential => {
                const signedInUser = userCredential.user;
                const result = await saveUserToDB({
                    email: signedInUser.email,
                })
                if (result) {
                    // Set JWT token in cookies
                    try {
                        const handleSetCookie = async () => {
                            const cookieData = {
                                email: signedInUser.email,
                                createdAt: new Date().toISOString(),
                            }
                            await axiosPublic.post('/auth/set-cookie', { cookieData }, { withCredentials: true });
                        };

                        handleSetCookie();
                    } catch (error) {
                        console.error('Error setting JWT token:', error);

                    }
                    Swal.fire("Welcome!", "Logged in with Google", "success");
                    navigate(from, { replace: true });
                    setLoading(false); // Reset loading state after successful login
                }
            })
            .catch(err => {
                Swal.fire("Error", err.message, "error");
                setLoading(false); // Reset loading state on error
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