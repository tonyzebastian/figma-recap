// client/src/components/ActivityFeed/ActivityFeed.js
import { useState } from 'react';
import axios from 'axios';
import HeatMap from '@uiw/react-heat-map';

function ActivityFeed() {
    const [apiToken, setApiToken] = useState('');
    const [idType, setIdType] = useState('teamId');
    const [inputId, setInputId] = useState('');
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
            if (idType === 'teamId') {
                endpoint += `/${inputId}`;
            } else if (idType === 'projectId') {
                endpoint += `/project/${inputId}`;
            } else if (idType === 'fileKey') {
                endpoint += `/file/${inputId}`;
            }

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

            // Set the raw response data instead of heatmap data
            setResults(heatmapData); 
            } catch (err) {
                setError(err.response?.data?.error || 'An error occurred');
                console.error('Error fetching activity:', err);
            }
        };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Figma Activity Feed Generator</h1>
            {userHandle && <h2 className="text-lg mb-4">User: {userHandle}</h2>} {/* Display user handle */}
            {userImgUrl && <img src={userImgUrl} alt="User Profile" className="w-16 h-16 rounded-full mb-4" />} {/* Display user profile image */}

            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    <span className="text-gray-700">Figma API Token</span>
                    <input
                        type="text"
                        value={apiToken}
                        onChange={(e) => setApiToken(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Enter your Figma API Token"
                    />
                </label>

                <div className="mb-4">
                    <span className="text-gray-700">Select ID Type:</span>
                    {['teamId', 'projectId', 'fileKey'].map((type) => (
                        <div key={type} className="flex items-center mb-2">
                            <input
                                type="radio"
                                id={type}
                                value={type}
                                checked={idType === type}
                                onChange={(e) => setIdType(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor={type} className="text-gray-700">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>

                <label className="block mb-4">
                    <span className="text-gray-700">Enter ID:</span>
                    <input
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Enter ID based on selection"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Generate Activity Feed
                </button>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {results && (
                <div className="mt-4">
                    <HeatMap
                        value={results}
                        weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
                        startDate={new Date('2023/01/01')} // Adjust start date as needed
                    />
                </div>
            )}
        </div>
    );
}

export default ActivityFeed;