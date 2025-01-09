// client/src/components/ActivityFeed/ActivityFeed.js
import { useState } from 'react';
import axios from 'axios';
import HeatMap from '@uiw/react-heat-map';
import html2canvas from 'html2canvas';
import HeroIllo from '../HeroIllo';


function ActivityFeed() {
    const [apiToken, setApiToken] = useState('');
    const [inputId, setInputId] = useState(''); // State for Team URL
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [userHandle, setUserHandle] = useState(''); // State to hold the user's handle
    const [userImgUrl, setUserImgUrl] = useState(''); // State to hold the user's profile image URL
    const [loading, setLoading] = useState(false); // New state for loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResults(null);
        setUserHandle(''); // Reset user handle on new submission
        setUserImgUrl(''); // Reset user image URL on new submission
        setLoading(true); // Set loading to true when submission starts
    
        try {
            // Fetch the user's personal ID and name first
            const personalIdResponse = await axios.get('http://localhost:3000/api/personalId', {
                headers: {
                    'X-Figma-Token': apiToken
                }
            });
            setUserHandle(personalIdResponse.data.handle); // Set the user handle
            setUserImgUrl(personalIdResponse.data.imgUrl); // Set the user image URL

            // Now fetch the activity data
            let endpoint = 'http://localhost:3000/api'; // Full URL to the backend
            endpoint += `/${inputId}`; // Only using Team ID

            const response = await axios.get(endpoint, {
                headers: {
                    'X-Figma-Token': apiToken
                }
            });

            console.log('API Response:', response.data); // Log the entire response

            const heatmapData = Object.entries(response.data.editCount).map(([date, count]) => ({
                date: date.replace(/-/g, '/'), // Format date to 'YYYY/MM/DD'
                count: count
            }));

            // Group data by year
            const groupedData = heatmapData.reduce((acc, { date, count }) => {
                const year = new Date(date).getFullYear();
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push({ date, count });
                return acc;
            }, {});

            // Set the raw response data instead of heatmap data
            setResults(groupedData); 
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
            console.error('Error fetching activity:', err);
        } finally {
            setLoading(false); // Set loading to false after the operation
        }
    };

    const downloadDivAsImage = async () => {
        const element = document.getElementById('downloadable-div'); // Replace with your div's ID
        const canvas = await html2canvas(element);
        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'activity_feed.png'; // Name of the downloaded file
        link.click();
    };

    return (
        <div className="flex flex-col mx-auto items-center justify-start gap-16 w-full">

            
            <div className='flex flex-col w-[450px] gap-16'>
                {/* Hero Section */}
                <div className='flex flex-col justify-center items-center mt-24 gap-4'>
                    <HeroIllo />
                    <p className="text-slate-900 mb-4">Every edit, every design— At a glance</p> {/* Added description */}
                </div>

                {/* Input Form */}
                
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full '>
                    <label className="block mb-2">
                        <span className="text-slate-900 font-geist font-medium text-sm pr-12">Figma personal access token</span>
                        <input
                            type="text"
                            value={apiToken}
                            onChange={(e) => setApiToken(e.target.value)}
                            className="mt-1 block w-full p-2 h-10 border font-geist text-sm text-slate-900 border-slate-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="text-slate-900 font-geist font-medium text-sm">Team URL</span> {/* Updated label */}
                        <input
                            type="text"
                            value={inputId}
                            onChange={(e) => setInputId(e.target.value)}
                            className="mt-1 block p-2 h-10 w-full font-geist text-sm text-slate-900 border border-slate-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </label>

                    <div className='w-full flex items-center justify-center'>
                        <button
                            type="submit"
                            className="bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 flex items-center justify-center w-36"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <div className="spinner mr-2"></div> // Spinner animation
                            ) : null}
                            {loading ? 'Loading...' : 'Recap'} {/* Show loading text or button text */}
                        </button>
                    </div>

                </form>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {/* Results section */}
            {userHandle || userImgUrl ? ( // Check if userHandle or userImgUrl is set
                <div> 
                    <button onClick={downloadDivAsImage} className="bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800">
                        Download as Image
                    </button>

                    <div id="downloadable-div" className="mt-4"> {/* New div wrapping user info and heatmaps */}

                        {userHandle && <h2 className="text-lg mb-4">User: {userHandle}</h2>} {/* Display user handle */}
                        {userImgUrl && <img src={userImgUrl} alt="User Profile" className="w-16 h-16 rounded-full mb-4"  />} {/* Display user profile image */}
                        
                        {results && Object.entries(results).map(([year, data]) => (
                            <div key={year} className="mt-4">
                                <h3 className="text-xl font-bold mb-2">{year}</h3> {/* Display year */}
                                <HeatMap
                                    value={data.map(({ date, count }) => ({ date, count }))}
                                    width={700}
                                    weekLabels={['', '', '', '', '', '', '']}
                                    startDate={new Date(`${year}/01/01`)} // Start date for each heatmap
                                />
                            </div>
                        ))}
                    </div>
                    
                </div>
            ) : null}

        </div>
    );
}

export default ActivityFeed;