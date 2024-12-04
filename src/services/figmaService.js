const axios = require('axios');

// Rate limiting variables
let requestCount = 0;
const REQUEST_LIMIT = 120; // 120 requests per minute
const TIME_WINDOW = 60000; // 1 minute in milliseconds
let lastRequestTime = Date.now();

async function rateLimitedAxiosGet(url, headers) {
    const currentTime = Date.now();
    
    // Reset the count if the time window has passed
    if (currentTime - lastRequestTime > TIME_WINDOW) {
        requestCount = 0;
        lastRequestTime = currentTime;
    }

    // Check if we are within the request limit
    if (requestCount >= REQUEST_LIMIT) {
        const waitTime = TIME_WINDOW - (currentTime - lastRequestTime);
        console.log(`Rate limit reached. Waiting for ${waitTime} ms.`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    requestCount++;
    return axios.get(url, { headers });
}

async function fetchPersonalId(apiToken) { // Accept apiToken as a parameter
    const response = await axios.get('https://api.figma.com/v1/me', {
        headers: {
            'X-Figma-Token': apiToken, // Use the provided apiToken
        },
    });
    console.log('Versions:', response.data.versions);
    return response.data.id;
}

async function fetchProjects(teamId, apiToken) {
    const response = await axios.get(`https://api.figma.com/v1/teams/${teamId}/projects`, {
        headers: {
            'X-Figma-Token': apiToken,
        },
    });
    return response.data.projects;
}

async function fetchFiles(projectId, apiToken) {
    const response = await axios.get(`https://api.figma.com/v1/projects/${projectId}/files`, {
        headers: {
            'X-Figma-Token': apiToken,
        },
    });
    return response.data.files;
}

async function fetchFileVersions(fileKey, apiToken) {
    let allVersions = [];
    let nextPageUrl = `https://api.figma.com/v1/files/${fileKey}/versions`;

    while (nextPageUrl) {
        console.log(`Fetching versions from: ${nextPageUrl}`);
        try {
            // Parse and validate the URL
            const url = new URL(nextPageUrl);
            console.log('Query Params Before Request:', Array.from(url.searchParams.entries()));

            // Perform the request using rate-limited axios
            const response = await rateLimitedAxiosGet(nextPageUrl, {
                'X-Figma-Token': apiToken,
            });

            console.log('Response:', JSON.stringify(response.data, null, 2));

            // Append versions to the list
            if (response.data.versions && response.data.versions.length > 0) {
                allVersions = allVersions.concat(response.data.versions);
            }

            // Update the nextPageUrl for pagination
            nextPageUrl = response.data.pagination?.next_page || null;

        } catch (error) {
            console.error('Error fetching versions:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    return allVersions;
}


async function fetchActivityFeed(teamId, apiToken) { // Accept apiToken as a parameter
    const personalId = await fetchPersonalId(apiToken); // Pass apiToken to fetchPersonalId
    console.log('Personal ID:', personalId); // Log personal ID
    const projects = await fetchProjects(teamId, apiToken); // Pass apiToken to fetchProjects
    
    // Object to hold counts grouped by date
    const editCountsByDate = {};

    for (const project of projects) {
        const files = await fetchFiles(project.id, apiToken); // Pass apiToken to fetchFiles
        for (const file of files) {
            const versions = await fetchFileVersions(file.key, apiToken); // Pass apiToken to fetchFileVersions
            console.log(`File: ${file.name}, Versions:`, versions); // Log file name and versions
            
            // Count edits by matching user.id with personalId
            versions.forEach(version => {
                if (version.user.id === personalId) {
                    // Extract the date from created_at
                    const date = new Date(version.created_at).toISOString().split('T')[0]; // Format: YYYY-MM-DD
                    
                    // Initialize the count for the date if it doesn't exist
                    if (!editCountsByDate[date]) {
                        editCountsByDate[date] = 0;
                    }
                    
                    // Increment the count for that date
                    editCountsByDate[date]++;
                }
            });
        }
    }

    console.log('Edit Counts by Date:', editCountsByDate); // Log the counts by date
    return editCountsByDate; // Return the counts grouped by date
}

async function fetchActivityFeedByProjectId(projectId, apiToken) { // Accept apiToken as a parameter
    const personalId = await fetchPersonalId(apiToken); // Pass apiToken to fetchPersonalId
    console.log('Personal ID:', personalId); // Log personal ID
    const files = await fetchFiles(projectId, apiToken); // Pass apiToken to fetchFiles
    
    // Object to hold counts grouped by date
    const editCountsByDate = {};

    for (const file of files) {
        const versions = await fetchFileVersions(file.key, apiToken); // Pass apiToken to fetchFileVersions
        console.log(`File: ${file.name}, Versions:`, versions); // Log file name and versions
        
        // Count edits by matching user.id with personalId
        versions.forEach(version => {
            if (version.user.id === personalId) {
                // Extract the date from created_at
                const date = new Date(version.created_at).toISOString().split('T')[0]; // Format: YYYY-MM-DD
                
                // Initialize the count for the date if it doesn't exist
                if (!editCountsByDate[date]) {
                    editCountsByDate[date] = 0;
                }
                
                // Increment the count for that date
                editCountsByDate[date]++;
            }
        });
    }

    console.log('Edit Counts by Date:', editCountsByDate); // Log the counts by date
    return editCountsByDate; // Return the counts grouped by date
}


async function fetchActivityFeedByFileKey(fileKey, apiToken) { // Accept apiToken as a parameter
    const personalId = await fetchPersonalId(apiToken); // Pass apiToken to fetchPersonalId
    console.log('Personal ID:', personalId); // Log personal ID
    const versions = await fetchFileVersions(fileKey, apiToken); // Pass apiToken to fetchFileVersions
    
    // Object to hold counts grouped by date
    const editCountsByDate = {};

    // Count edits by matching user.id with personalId
    versions.forEach(version => {
        if (version.user.id === personalId) {
            // Extract the date from created_at
            const date = new Date(version.created_at).toISOString().split('T')[0]; // Format: YYYY-MM-DD
            
            // Initialize the count for the date if it doesn't exist
            if (!editCountsByDate[date]) {
                editCountsByDate[date] = 0;
            }
            
            // Increment the count for that date
            editCountsByDate[date]++;
        }
    });

    console.log('Edit Counts by Date:', editCountsByDate); // Log the counts by date
    return editCountsByDate; // Return the counts grouped by date
}

// Export all services
module.exports = { fetchActivityFeed, fetchActivityFeedByProjectId, fetchActivityFeedByFileKey }; // Updated exports