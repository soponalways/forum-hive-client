import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';

import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { HelmetProvider } from 'react-helmet-async';

Aos.init();
const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-libertinus max-w-7xl mx-auto'>
      <Elements stripe={stripePromise}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <HelmetProvider>
              <RouterProvider router={router} />
            </HelmetProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Elements>
    </div>
  </StrictMode>,
)
