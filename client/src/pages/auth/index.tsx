import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import './Auth.css';  // Ensure the path is correct based on your project structure

export const Auth = () => {
    return (
        <div className='auth-container'>
            <SignedOut>
                <div className='auth-card'>
                    <h2>Welcome to BitExpense</h2>
                    <p>Please sign in or sign up to continue</p>
                    <div className='auth-buttons'>
                        <SignUpButton  mode="modal" />
                        <SignInButton  mode="modal" />
                    </div>
                </div>
            </SignedOut>
            <SignedIn>
                <Navigate to="/" />
            </SignedIn>
        </div>
    );
};
