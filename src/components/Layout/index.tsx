// src/components/Layout.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import MainContent from './Content';

const Layout: React.FC = () => {
    return (
        <div className=' bg-main'>
            <Header />
            <div className="mx-auto w-80">
                 <MainContent />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
