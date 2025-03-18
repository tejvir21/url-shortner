import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <div className="mx-auto flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to URL Shortener</h1>
            <p className="text-lg md:text-2xl mb-8">Shorten your URLs quickly and easily.</p>
            <Link to="/home" className="btn bg-white text-blue-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
                Get Started
            </Link>
        </div>
    );
};

export default Intro;