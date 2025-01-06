// client/src/components/ActivityFeed/ActivityFeed.js
import { useState } from 'react';
import axios from 'axios';
import HeatMap from '@uiw/react-heat-map';

function ActivityFeed() {
    const [apiToken, setApiToken] = useState('');
    const [inputId, setInputId] = useState(''); // State for Team URL
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [userHandle, setUserHandle] = useState(''); // State to hold the user's handle
    const [userImgUrl, setUserImgUrl] = useState(''); // State to hold the user's profile image URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResults(null);
        setUserHandle(''); // Reset user handle on new submission
        setUserImgUrl(''); // Reset user image URL on new submission
    
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
        }
    };

    return (
        <div className="flex flex-col mx-auto items-center justify-center">
            <div className='flex flex-col justify-center items-center mt-20'>
                <h1 className="font-geist text-3xl font-bold mb-2 text-slate-900">Figma Recap</h1> {/* Updated title */}
                <p className="text-slate-600 mb-4">Every Edit, Every Design—At a Glance</p> {/* Added description */}
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <label className="block mb-2">
                    <span className="text-slate-900 font-geist font-medium text-sm pr-2">Personal access token</span>
                    <span className="text-slate-600 font-geist font-normal text-sm">How to generate API Token?</span>
                    <input
                        type="text"
                        value={apiToken}
                        onChange={(e) => setApiToken(e.target.value)}
                        className="mt-1 block w-full p-2 h-9 border border-slate-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-slate-900 font-geist font-medium text-sm">Team URL</span> {/* Updated label */}
                    <span className="text-slate-600 font-geist font-normal text-sm">Where to copy project key?</span>
                    <input
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        className="mt-1 block w-full p-2 h-9 border border-slate-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>

                <button
                    type="submit"
                    className=" bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800"
                >
                    Recap
                </button> 
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}


            {userHandle && <h2 className="text-lg mb-4">User: {userHandle}</h2>} {/* Display user handle */}
            {userImgUrl && <img src={userImgUrl} alt="User Profile" className="w-16 h-16 rounded-full mb-4" />} {/* Display user profile image */}
            
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
    );
}

export default ActivityFeed;