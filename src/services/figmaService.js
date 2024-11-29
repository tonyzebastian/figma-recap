const axios = require('axios');

const FIGMA_API_TOKEN = process.env.FIGMA_API_TOKEN;

async function fetchPersonalId() {
    const response = await axios.get('https://api.figma.com/v1/me', {
        headers: {
            'X-Figma-Token': FIGMA_API_TOKEN,
        },
    });
    console.log('Versions:', response.data.versions);
    return response.data.id;
}

async function fetchProjects(teamId) {
    const response = await axios.get(`https://api.figma.com/v1/teams/${teamId}/projects`, {
        headers: {
            'X-Figma-Token': FIGMA_API_TOKEN,
        },
    });
    return response.data.projects;
}

async function fetchFiles(projectId) {
    const response = await axios.get(`https://api.figma.com/v1/projects/${projectId}/files`, {
        headers: {
            'X-Figma-Token': FIGMA_API_TOKEN,
        },
    });
    return response.data.files;
}

async function fetchFileVersions(fileKey) {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}/versions`, {
        headers: {
            'X-Figma-Token': FIGMA_API_TOKEN,
        },
    });
    return response.data.versions;
}

async function fetchActivityFeed(teamId) {
    const personalId = await fetchPersonalId(); // Fetch personal ID
    console.log('Personal ID:', personalId); // Log personal ID
    const projects = await fetchProjects(teamId);
    
    // Object to hold counts grouped by date
    const editCountsByDate = {};

    for (const project of projects) {
        const files = await fetchFiles(project.id);
        for (const file of files) {
            const versions = await fetchFileVersions(file.key);
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

module.exports = { fetchActivityFeed };