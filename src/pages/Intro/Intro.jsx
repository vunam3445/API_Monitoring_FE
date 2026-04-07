import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import SignupModal from '../../components/Auth/SignupModal';
import LoginModal from '../../components/Auth/LoginModal';
import ForgotPasswordModal from '../../components/Auth/ForgotPasswordModal';

const Intro = () => {
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');

    const handleOpenSignup = () => setIsSignupModalOpen(true);
    const handleCloseSignup = () => setIsSignupModalOpen(false);

    const handleSwitchToLogin = (email = '') => {
        if (typeof email === 'string') {
            setLoginEmail(email);
        }
        setIsSignupModalOpen(false);
        setIsForgotPasswordModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const handleSwitchToSignup = () => {
        setIsLoginModalOpen(false);
        setIsForgotPasswordModalOpen(false);
        setIsSignupModalOpen(true);
    };

    const handleSwitchToForgotPassword = () => {
        setIsLoginModalOpen(false);
        setIsForgotPasswordModalOpen(true);
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <Header onOpenSignup={handleOpenSignup} onOpenLogin={() => setIsLoginModalOpen(true)} />
            <main>
                <Hero onOpenSignup={handleOpenSignup} />
                <Benefits />
                <Features />
                <HowItWorks />
                <Pricing onOpenSignup={handleOpenSignup} />
                <CTA onOpenSignup={handleOpenSignup} />
            </main>
            <Footer />
            <SignupModal
                isOpen={isSignupModalOpen}
                onClose={handleCloseSignup}
                onSuccess={handleSwitchToLogin}
                onSwitchToLogin={handleSwitchToLogin}
            />
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                initialEmail={loginEmail}
                onSwitchToSignup={handleSwitchToSignup}
                onSwitchToForgotPassword={handleSwitchToForgotPassword}
            />
            <ForgotPasswordModal
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
                onSwitchToLogin={handleSwitchToLogin}
            />
        </div>
    );
};

export default Intro;
