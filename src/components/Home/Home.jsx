import './Home.css';
import { useContext, useState, useEffect } from 'react';
import GlobalStore from '../../contexts/GlobalStore/GlobalStore';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ReactJson from 'react-json-view';

export default function Home() {
    const globalStore = useContext(GlobalStore);
    const { inputFile, setInputFile, serverRes, parsePdf, loading, setLoading } = globalStore;
    
    // State for theme toggle
    const [darkMode, setDarkMode] = useState(true);

    // Apply theme to document root
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const handleFileUpload = (event) => {
        setInputFile(event.target.files[0]);
    };

    const handleParseBtn = () => {
        console.log('inputFile: ', inputFile);
        setLoading(true);
        parsePdf(); 
    };

    // Toggle theme function
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className='container'>
            {/* Theme toggle button */}
            <button className='theme-toggle' onClick={toggleTheme}>
                {darkMode ? (
                    <span role="img" aria-label="Light mode">☀️ Light</span>
                ) : (
                    <span role="img" aria-label="Dark mode">🌙 Dark</span>
                )}
            </button>

            <h1 className='resume'>Resume Parser</h1>
            <p className='subhead'>A tool to parse resumes using OpenAI's GPT API.</p>
            
            <div className="flex flex-col items-center w-100">
                <h4 className='heading mt-0'>Instructions</h4>
                <p className="subhead mb-0">
                    Upload a PDF, and the parsed result will be provided as JSON. It is not straightforward to
                    standardize a resume, but Gemini does it really well. Backend is in ExpressJS and uses
                    pdf-parse for data extraction.
                </p>

                <p className='heading'>It takes a few minutes to process.</p>
            </div>

            {/* File Upload and Parse Button */}
            <div className='io-container'>
                <div className="input-container">
                    <label className='selectfile' htmlFor="file">
                        Select your PDF file:
                    </label>
                    <div className="flex gap-md">
                        <input
                            className='file-name w-100'
                            type="file"
                            id="file"
                            name='inputFile'
                            onChange={handleFileUpload}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className='parse-btn'
                            onClick={handleParseBtn}
                            disabled={!inputFile}
                        >
                            {inputFile ? 'Parse Resume' : 'Select a file'}
                        </button>
                    </div>
                </div>

                {/* File information display */}
                {inputFile && (
                    <div className="input-container mt-0">
                        <p className="file-name">Selected file: {inputFile.name}</p>
                        <p className="selectfile">Size: {(inputFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                )}
            </div>

            {/* Show the JSON Result or Loading Spinner */}
            {loading ? (
                <div className="full-screen">
                    <LoadingSpinner />
                </div>
            ) : serverRes ? (
                <div className="full-screen result-view">
                    <div className="flex justify-center mb-0">
                        <button 
                            className="parse-btn" 
                            onClick={() => window.location.reload()}
                        >
                            Parse Another Resume
                        </button>
                    </div>
                    <ReactJson 
                        src={typeof serverRes === 'string' ? JSON.parse(serverRes) : serverRes} 
                        theme={darkMode ? "monokai" : "rjv-default"} 
                        collapsed={1}
                        displayDataTypes={false}
                        enableClipboard={true}
                    />
                </div>
            ) : null}

            {/* Footer */}
            <p className='aman text-center'>
                Made with ❤️ by <a className='link' href='https://www.linkedin.com/in/amankhan7/'>AMAN</a>
            </p>
        </div>
    );
}