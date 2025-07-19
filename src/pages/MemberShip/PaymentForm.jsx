import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css'
import { useLocation } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const {state} = useLocation();
    const axiosPublic = useAxios();
    const {user} = useAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        const card = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
            return;
        }

        const { data } = await axiosPublic.post('/create-payment-intent', {paymentMethodId: paymentMethod.id, amount: state.price}); 

        // Confirm the payment 
        const result = await stripe.confirmCardPayment(data.client_secret, {
            payment_method: {
                card, 
                billing_details: {
                    name: user.displayName || 'Sopon Ahmed', 
                    email: user.email, 
                    address: 'Dhaka Bangladesh', 
                    phone: '01884953018', 
                }
            }
        });
        console.log('result ' , result)
        if (result.error) {
            setError(result.error);
        } else {
            // Payment succeeded
            const pyamented = result?.paymentIntent; 
            const paymentsData = {
                paymentId : pyamented.id, 
                amount : state.price, 
                createdAt : new Date(), 
                email: user.email
            }; 

            const responseOfSave = await axiosPublic.post('/membership' , paymentsData)
            // Handle successful payment (e.g., show success message, redirect)
            if(responseOfSave.data.insertedId) {
                Swal.fire('Payment Success', `
                    <p className='font-medium text-center'>You have successfully payment and get the membership</p>
                    <p className='font-medium text-center'>You got a gold badge</p>
                    `, 'success')
            }
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement 
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {error && <div>{error}</div>}
            <button type="submit" disabled={!stripe || processing} className='btn btn-primary text-black'>
                Pay {state?.price}
            </button>
        </form>
    );
};

export default PaymentForm;