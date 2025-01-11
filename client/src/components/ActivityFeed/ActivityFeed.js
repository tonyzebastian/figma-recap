// client/src/components/ActivityFeed/ActivityFeed.js
import { useState } from 'react';
import axios from 'axios';
import HeatMap from '@uiw/react-heat-map';
import html2canvas from 'html2canvas';
import HeroIllo from '../HeroIllo';
import { Download, Meh,} from 'react-feather';
import HeartIllo from '../HeartIllo';


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

         // Process inputId to extract the numeric ID from the URL
         const teamIdMatch = inputId.match(/team\/(\d+)(\/all-projects)?/); // Match the number between 'team/' and '/all-projects'
         const teamId = teamIdMatch ? teamIdMatch[1] : ''; // Extract the number or set to empty if not found
    
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
            endpoint += `/${teamId}`; // Only using Team ID

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
            // Check for specific error status codes and set user-friendly messages
            if (err.response) {
                if (err.response.status === 400) {
                    setError('Try after entering Figma personal access token'); // User-friendly message for 400
                } else if (err.response.status === 404) {
                    setError('The Team is not found. Check the Team URL and try again'); // User-friendly message for 404
                } else {
                    setError(err.response?.data?.error || 'An error occurred'); // Fallback for other errors
                }
            } else if (err.code === 'ERR_NETWORK') {
                setError('Server down. Try again after sometime'); // User-friendly message for connection refused
            } else {
                setError('An error occurred'); // Handle network errors
            }
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
        link.download = 'figma_recap.png'; // Name of the downloaded file
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
                <div className="p-3 bg-red-50 text-slate-900 border border-red-700 rounded-md flex items-center font-geist text-base w-[450px]">
                    <Meh className="mr-2" /> {/* Added Meh icon for errors */}
                    {error}
                </div>
            )}

            {/* Results section */}
            {userHandle || userImgUrl ? ( // Check if userHandle or userImgUrl is set
                <div> 
                    {results && ( 
                    <div className="flex flex-col items-center border-t pt-8 pb-2 border-slate-200">
                        <h2 className="text-lg mb-4">Your Figma Recap is ready to be downloaded! 🎉</h2>
                        <button onClick={downloadDivAsImage} className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-slate-800 flex items-center justify-center gap-2">
                            <Download size={20} className="text-slate-200 ml-1" /> {/* Use the Download icon */}
                            Download
                        </button>
                    </div>
                    )}

                    <div id="downloadable-div" className="mt-4 border p-16 bg-white rounded-lg min-w-[450px] transition-all duration-300 ease-in"> {/* New div wrapping user info and heatmaps */}

                        <div className="flex flex-row items-center justify-between mb-4 min-w-[800]">
                            <div className='flex flex-row gap-2 items-center'>
                                {userImgUrl && <img src={userImgUrl} alt="User Profile" className="w-8 h-8 rounded-full border border-slate-400"   />}                   
                                {userHandle && <h2 className="text-base font-medium font-geist text-slate-900">{userHandle}</h2>} {/* Display user handle */}
                            </div>
                            {results && ( 
                            <HeroIllo width={175} height={90} />
                            )}
                        </div>

                        {results && Object.entries(results).map(([year, data]) => (
                            <div key={year} className=" flex flex-row items-center -mx-3">
                                <h3 className="text-sm font-geist font-medium -rotate-90 text-slate-700 -mt-4">{year}</h3> {/* Display year */}
                                <div className='-ml-6'>
                                    <HeatMap
                                        value={data.map(({ date, count }) => ({ date, count }))}
                                        width={700}
                                        weekLabels={['', '', '', '', '', '', '']}
                                        startDate={new Date(`${year}/01/01`)} // Start date for each heatmap
                                        endDate={undefined}
                                        legendCellSize={0}
                                    />
                                </div>
                            </div>
                        ))}

                        {results && ( 
                        <div className="flex items-center gap-2 ">
                             <div className='flex flex-row items-center'>
                                <h2 className='font-geist text-sm font-medium text-slate-900  hover:underline'>tonyzeb.design</h2>
                            </div>
                            <HeartIllo />
                        </div>
                        )}

                    </div>
                    
                </div>
            ) : null}

        </div>
    );
}

export default ActivityFeed;