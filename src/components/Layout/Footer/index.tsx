// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} My App</p>
            
            {/* Add any additional footer content here */}
        </footer>
    );
};

export default Footer;
