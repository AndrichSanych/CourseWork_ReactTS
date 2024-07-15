import React from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import MainContent from './components/main_content';
import Footer from './components/footer';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default App;
