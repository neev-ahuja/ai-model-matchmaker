import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const App = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
            <nav className="bg-black bg-opacity-20 backdrop-blur-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-2xl font-bold text-blue-400">AI Model Matchmaker</div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <button onClick={() => setActiveTab('overview')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'overview' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Overview</button>
                                    <button onClick={() => setActiveTab('features')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'features' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Features</button>
                                    <button onClick={() => setActiveTab('architecture')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'architecture' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Architecture</button>
                                    <button onClick={() => setActiveTab('future')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'future' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Future Vision</button>
                                    <button onClick={() => setActiveTab('pricing')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'pricing' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Pricing</button>
                                </div>
                            </div>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>

                        <div className="hidden md:block">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>


                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <button onClick={() => { setActiveTab('overview'); setIsMenuOpen(false); }} className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'overview' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} w-full text-left`}>Overview</button>
                            <button onClick={() => { setActiveTab('features'); setIsMenuOpen(false); }} className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'features' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} w-full text-left`}>Features</button>
                            <button onClick={() => { setActiveTab('architecture'); setIsMenuOpen(false); }} className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'architecture' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} w-full text-left`}>Architecture</button>
                            <button onClick={() => { setActiveTab('future'); setIsMenuOpen(false); }} className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'future' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} w-full text-left`}>Future Vision</button>
                            <button onClick={() => { setActiveTab('pricing'); setIsMenuOpen(false); }} className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === 'pricing' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} w-full text-left`}>Pricing</button>

                            <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </nav>


            <div className="py-16 lg:py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                            AI Model Matchmaker
                        </h1>
                        <p className={`mt-3 max-w-3xl mx-auto text-xl text-gray-300 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                            Intelligent AI Assistant Aggregation Platform featuring Dynamic Model Selection & Seamless Multi-Model Interaction
                        </p>
                        <div className={`mt-10 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                            <Link to={'/chat'}>
                                <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 mr-4">
                                    Try Now
                                </button>
                            </Link>
                            <button className="px-8 py-3 border border-blue-400 text-base font-medium rounded-md text-blue-300 bg-transparent hover:bg-blue-900 hover:bg-opacity-30 md:py-4 md:text-lg md:px-10">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 -top-20 -left-20 blur-3xl"></div>
                    <div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-10 top-40 right-20 blur-3xl"></div>
                    <div className="absolute w-64 h-64 bg-blue-300 rounded-full opacity-10 bottom-10 left-1/3 blur-3xl"></div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {activeTab === 'overview' && (
                    <div className="space-y-16">

                        <div className="bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-lg border border-gray-800">
                            <h2 className="text-3xl font-bold mb-6 text-blue-400">The Problem</h2>
                            <p className="text-lg text-gray-300">
                                Current AI assistants typically operate with a single model, limiting their versatility. Our solution tackles the challenge of
                                inefficient context preservation and the lack of cross-model communication by dynamically integrating multiple AI models
                                within a single conversation. This enables users to benefit from specialized AI expertise without losing context.
                            </p>
                        </div>

                        <div className="bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-lg border border-gray-800">
                            <h2 className="text-3xl font-bold mb-8 text-blue-400">How It Works</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 border border-gray-800 transform transition hover:scale-105">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-blue-300">Prompt Analysis</h3>
                                    <p className="text-gray-400">
                                        Our intelligent prompt analysis algorithm dissects user inputs to understand context and requirements, ensuring accurate model selection.
                                    </p>
                                </div>

                                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 border border-gray-800 transform transition hover:scale-105">
                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-purple-300">Model Selection</h3>
                                    <p className="text-gray-400">
                                        The dynamic model selection engine evaluates available AI models based on predefined criteria, optimizing for performance and relevance.
                                    </p>
                                </div>

                                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 border border-gray-800 transform transition hover:scale-105">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-blue-300">API Integration</h3>
                                    <p className="text-gray-400">
                                        A robust API integration layer facilitates secure and efficient communication with various AI models, streamlining data exchange.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-lg border border-gray-800">
                            <h2 className="text-3xl font-bold mb-8 text-blue-400">Benefits</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-medium text-blue-300">Optimal Results Every Time</h3>
                                        <p className="mt-2 text-gray-400">
                                            Our platform automatically selects the best AI model for each specific prompt, ensuring you always get the most accurate and relevant responses.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-medium text-blue-300">Seamless Context Preservation</h3>
                                        <p className="mt-2 text-gray-400">
                                            Never lose conversation flow as our system maintains perfect context across different AI models throughout your entire interaction.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-medium text-blue-300">Secure API Communication</h3>
                                        <p className="mt-2 text-gray-400">
                                            Our platform ensures all communications with AI models are secure and encrypted, protecting your data and privacy at all times.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-medium text-blue-300">Customizable Experience</h3>
                                        <p className="mt-2 text-gray-400">
                                            Personalize your AI experience with customizable preferences for model selection, response formats, and interaction styles.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className="bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-lg border border-gray-800">
                        <h2 className="text-3xl font-bold mb-8 text-blue-400">Key Features</h2>

                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 p-6">
                                    <h3 className="text-2xl font-bold mb-4 text-blue-300">Model Selection Process</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300">The NLU layer analyzes prompts to extract intent and relevant information.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300">A scoring algorithm assigns scores to each model based on its suitability for the prompt.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300">Weighted criteria selection enables fine-tuning of model selection parameters.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300">Real-time performance monitoring continuously optimizes model selection.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="md:w-1/2 p-6">
                                    <div className="bg-gray-900 bg-opacity-70 rounded-lg p-6 border border-blue-900">
                                        <div className="w-full h-64 bg-blue-900 bg-opacity-30 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <svg className="mx-auto h-16 w-16 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                                </svg>
                                                <p className="mt-4 text-sm text-blue-300">Model Selection Algorithm Visualization</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 p-6 order-2 md:order-1">
                                    <div className="bg-gray-900 bg-opacity-70 rounded-lg p-6 border border-purple-900">
                                        <div className="w-full h-64 bg-purple-900 bg-opacity-30 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <svg className="mx-auto h-16 w-16 text-purple-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <p className="mt-4 text-sm text-purple-300">Frontend Interface Mockup</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 p-6 order-1 md:order-2">
                                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Frontend Experience</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300">Intuitive Single-Page Application (SPA) design for seamless user experience.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300">Smooth model transition interface for fluid interaction between different AI models.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300">Real-time response visualization enhances user engagement.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300">Customizable user preferences for a personalized AI experience.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'architecture' && (
                    <div className="bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-lg border border-gray-800">
                        <h2 className="text-3xl font-bold mb-8 text-blue-400">Solution Architecture</h2>

                        <div className="mb-10">
                            <p className="text-lg text-gray-300 mb-6">
                                Our platform is built upon a robust architecture, featuring a React.js frontend, a Django backend with a SQLite database, and
                                microservices-based model routing. Real-time API model interaction ensures seamless communication and efficient
                                processing of user requests. This sophisticated design facilitates a responsive and scalable AI experience.
                            </p>

                            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold mb-3 text-blue-300">Frontend</h3>
                                        <ul className="space-y-2 text-gray-400">
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                React.js
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                SPA Design
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                Real-time Updates
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                Responsive UI
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold mb-3 text-blue-300">Backend</h3>
                                        <ul className="space-y-2 text-gray-400">
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                Django Framework
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                SQLite Database
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                REST API
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                JWT Authentication
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold mb-3 text-blue-300">Microservices</h3>
                                        <h3 className="text-xl font-bold mb-3 text-blue-300">Infrastructure</h3>
                                        <ul className="space-y-2 text-gray-400">
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                Microservices
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                Vercel Deployment
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                                CI/CD Pipeline
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">Data Flow Diagram</h3>
                            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                                <div className="h-80 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                                            <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-800 w-64">
                                                <div className="font-bold text-blue-300 mb-2">User Interface</div>
                                                <div className="text-sm text-gray-400">Input Capture & Display</div>
                                            </div>

                                            <div className="text-blue-400">
                                                <svg className="h-8 w-8 transform rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>

                                            <div className="bg-purple-900 bg-opacity-50 p-4 rounded-lg border border-purple-800 w-64">
                                                <div className="font-bold text-purple-300 mb-2">AI Controller</div>
                                                <div className="text-sm text-gray-400">Routing & Selection</div>
                                            </div>

                                            <div className="text-blue-400">
                                                <svg className="h-8 w-8 transform rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>

                                            <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-800 w-64">
                                                <div className="font-bold text-blue-300 mb-2">API Gateway</div>
                                                <div className="text-sm text-gray-400">Model Communication</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center mt-6">
                                            <svg className="h-8 w-8 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                                            </svg>
                                        </div>

                                        <div className="mt-4 flex justify-center">
                                            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                                                <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                                                    <div className="text-xs text-gray-300">Model 1</div>
                                                </div>
                                                <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                                                    <div className="text-xs text-gray-300">Model 2</div>
                                                </div>
                                                <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                                                    <div className="text-xs text-gray-300">Model 3</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">Security Considerations</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                                    <h4 className="text-xl font-semibold mb-3 text-blue-300">Data Protection</h4>
                                    <ul className="space-y-2 text-gray-400">
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>End-to-end encryption for all data transfers</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Data minimization and privacy by design</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Regular security audits and penetration testing</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                                    <h4 className="text-xl font-semibold mb-3 text-blue-300">Access Control</h4>
                                    <ul className="space-y-2 text-gray-400">
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Role-based access control (RBAC) implementation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Multi-factor authentication (MFA) for sensitive operations</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span>Comprehensive audit trails for all system activities</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'future' && (
                    <div className="bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-lg border border-gray-800">
                        <h2 className="text-3xl font-bold mb-8 text-blue-400">Future Vision</h2>

                        <div className="space-y-10">
                            <div className="flex flex-col md:flex-row items-center bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden">
                                <div className="md:w-1/3 bg-gradient-to-br from-blue-900 to-purple-900 p-10 flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="h-16 w-16 text-blue-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        <h3 className="text-xl font-bold mt-4 text-blue-300">Enhanced AI Selection</h3>
                                    </div>
                                </div>
                                <div className="md:w-2/3 p-8">
                                    <p className="text-gray-300">
                                        We're developing advanced neural networks to further optimize model selection, incorporating real-time feedback and learning from user interactions. This will enable even more accurate and personalized AI responses, with continuous improvement based on usage patterns and success metrics.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden">
                                <div className="md:w-1/3 bg-gradient-to-br from-purple-900 to-blue-900 p-10 flex items-center justify-center order-first md:order-last">
                                    <div className="text-center">
                                        <svg className="h-16 w-16 text-purple-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                        <h3 className="text-xl font-bold mt-4 text-purple-300">Expanded Model Integration</h3>
                                    </div>
                                </div>
                                <div className="md:w-2/3 p-8">
                                    <p className="text-gray-300">
                                        Our roadmap includes integration with emerging AI models across various specialized domains. This expansion will provide access to domain-specific expertise in fields like medicine, law, engineering, and creative writing, all within a unified interface that maintains seamless context preservation.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden">
                                <div className="md:w-1/3 bg-gradient-to-br from-blue-900 to-indigo-900 p-10 flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="h-16 w-16 text-blue-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        <h3 className="text-xl font-bold mt-4 text-blue-300">Enterprise Solutions</h3>
                                    </div>
                                </div>
                                <div className="md:w-2/3 p-8">
                                    <p className="text-gray-300">
                                        We're developing tailored enterprise solutions with enhanced security features, private model deployment options, and integration capabilities with existing business intelligence systems. These enterprise offerings will provide organizations with powerful AI tools while meeting strict compliance and security requirements.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <div className="mt-12">
                            <h3 className="text-2xl font-bold mb-6 text-blue-400">Development Roadmap</h3>
                            <div className="relative">
                                <div className="absolute left-4 md:left-1/2 h-full w-1 bg-blue-900"></div>

                                <div className="space-y-12">
                                    <div className="relative">
                                        <div className="flex items-center">
                                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 border-4 border-blue-900">
                                                <span className="text-xs font-semibold text-white">1</span>
                                            </div>

                                            <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                                                <h4 className="text-lg font-bold text-blue-300">Q2 2025</h4>
                                                <p className="text-gray-400">Beta launch with core model integration and basic selection algorithm</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="flex items-center">
                                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 border-4 border-blue-900">
                                                <span className="text-xs font-semibold text-white">2</span>
                                            </div>

                                            <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8 md:text-left md:absolute md:right-0">
                                                <h4 className="text-lg font-bold text-blue-300">Q4 2025</h4>
                                                <p className="text-gray-400">Advanced context preservation and expanded model selection</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="flex items-center">
                                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 border-4 border-blue-900">
                                                <span className="text-xs font-semibold text-white">3</span>
                                            </div>

                                            <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                                                <h4 className="text-lg font-bold text-blue-300">Q2 2026</h4>
                                                <p className="text-gray-400">Enterprise solution launch with enhanced security features</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="flex items-center">
                                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 border-4 border-blue-900">
                                                <span className="text-xs font-semibold text-white">4</span>
                                            </div>

                                            <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8 md:text-left md:absolute md:right-0">
                                                <h4 className="text-lg font-bold text-blue-300">Q4 2026</h4>
                                                <p className="text-gray-400">Machine learning enhancements and specialized domain integrations</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                )}


                {activeTab === 'pricing' && (
                    <div className="space-y-16">
                        <div className="bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-lg border border-gray-800">
                            <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Choose the Perfect Plan</h2>
                            <p className="text-lg text-gray-300 text-center mb-12">
                                Select the plan that best fits your needs with flexible options for every use case
                            </p>

                            <div className="grid md:grid-cols-3 gap-8">

                                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 border border-gray-800 transform transition hover:scale-105">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold mb-2 text-blue-300">Basic Plan</h3>
                                        <p className="text-4xl font-bold text-white mb-6">Free</p>
                                    </div>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">100 prompts / month</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">Basic models only</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">Standard processing time</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="px-6 py-2 border border-blue-400 text-base font-medium rounded-md text-blue-300 bg-transparent hover:bg-blue-900 hover:bg-opacity-30 w-full">
                                            Get Started
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg p-6 border border-blue-500 transform transition hover:scale-105 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl">
                                        POPULAR
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold mb-2 text-blue-300">Pro Plan</h3>
                                        <p className="text-4xl font-bold text-white mb-1">₹1,000</p>
                                        <p className="text-gray-300 mb-6">per month</p>
                                    </div>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">500 prompts / month</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">GPT-3.5, Claude 3.5, Gemini Pro</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">Faster response times</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">Context preservation</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">Beta access to new models</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-base font-medium rounded-md text-white w-full">
                                            Subscribe Now
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 border border-gray-800 transform transition hover:scale-105">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold mb-2 text-blue-300">Premium Plan</h3>
                                        <p className="text-4xl font-bold text-white mb-1">₹2,500</p>
                                        <p className="text-gray-300 mb-6">per month</p>
                                    </div>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">500 advanced prompts / month</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">ChatGPT 4.0, Claude 3.7 Sonnet</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">Priority response times</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">Enhanced context preservation</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="text-gray-300">Early access to all new models</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="px-6 py-2 border border-blue-400 text-base font-medium rounded-md text-blue-300 bg-transparent hover:bg-blue-900 hover:bg-opacity-30 w-full">
                                            Go Premium
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                <p className="text-gray-300 mb-6">Need a custom enterprise solution?</p>
                                <button className="px-8 py-3 border border-blue-400 text-base font-medium rounded-md text-blue-300 bg-transparent hover:bg-blue-900 hover:bg-opacity-30">
                                    Contact Sales
                                </button>
                            </div>
                        </div>

                        <div className="bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-lg border border-gray-800">
                            <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Frequently Asked Questions</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-blue-300 mb-2">Can I upgrade or downgrade my plan?</h3>
                                    <p className="text-gray-300">Yes, you can change your plan at any time. Changes will be effective from the next billing cycle.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-blue-300 mb-2">What happens if I exceed my prompt limit?</h3>
                                    <p className="text-gray-300">You'll be notified when you're approaching your limit. Additional prompts can be purchased as needed.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-blue-300 mb-2">Which payment methods do you accept?</h3>
                                    <p className="text-gray-300">We accept all major credit cards, UPI, and select digital wallets for your convenience.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-blue-300 mb-2">Is there a free trial available?</h3>
                                    <p className="text-gray-300">Yes, new users can try our Pro plan free for 7 days before being charged.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>


            <footer className="mt-12 py-8 bg-black bg-opacity-40 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="text-xl font-bold text-blue-400">AI Model Matchmaker</div>
                            <p className="mt-2 text-sm text-gray-400">Intelligent AI Assistant Aggregation Platform</p>
                        </div>

                        <div className="flex space-x-6">
                            <a className="text-gray-400 hover:text-blue-400">
                                <span className="sr-only">GitHub</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a className="text-gray-400 hover:text-blue-400">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a className="text-gray-400 hover:text-blue-400">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
                        <p className="text-sm text-gray-400">&copy; 2025 AI Model Matchmaker. All rights reserved.</p>
                        <div className="mt-4 md:mt-0 flex space-x-6">
                            <a className="text-sm text-gray-400 hover:text-blue-400">Privacy Policy</a>
                            <a className="text-sm text-gray-400 hover:text-blue-400">Terms of Service</a>
                            <a className="text-sm text-gray-400 hover:text-blue-400">Contact Us</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;