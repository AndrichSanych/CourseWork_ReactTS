// src/components/Layout.tsx
import React from 'react';
import Header from './header';
import Footer from './footer';
import MainContent from './main_content';

const Layout: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="container">
                 <MainContent />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
