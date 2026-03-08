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

const Intro = () => {
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    const handleOpenSignup = () => setIsSignupModalOpen(true);
    const handleCloseSignup = () => setIsSignupModalOpen(false);

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <Header onOpenSignup={handleOpenSignup} />
            <main>
                <Hero onOpenSignup={handleOpenSignup} />
                <Benefits />
                <Features />
                <HowItWorks />
                <Pricing onOpenSignup={handleOpenSignup} />
                <CTA onOpenSignup={handleOpenSignup} />
            </main>
            <Footer />
            <SignupModal isOpen={isSignupModalOpen} onClose={handleCloseSignup} />
        </div>
    );
};

export default Intro;
