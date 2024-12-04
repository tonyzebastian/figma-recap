document.getElementById('generateButton').addEventListener('click', async () => {
    const apiToken = document.getElementById('apiToken').value; // Get the API token from the input
    const idType = document.querySelector('input[name="idType"]:checked').value;
    const inputId = document.getElementById('inputId').value;

    let activityFeed;

    try {
        // Call the respective function based on the selected radio button
        if (idType === 'teamId') {
            activityFeed = await fetchActivityFeed(inputId, apiToken);
        } else if (idType === 'projectId') {
            activityFeed = await fetchActivityFeedByProjectId(inputId, apiToken);
        } else if (idType === 'fileKey') {
            activityFeed = await fetchActivityFeedByFileKey(inputId, apiToken);
        }

        // Display the results
        document.getElementById('results').innerText = JSON.stringify(activityFeed, null, 2);
    } catch (error) {
        document.getElementById('results').innerText = `Error: ${error.message}`;
    }
});

async function fetchActivityFeed(teamId, apiToken) {
    const response = await fetch(`/api/activity/${teamId}`, {
        method: 'GET',
        headers: {
            'X-Figma-Token': apiToken, // Use the custom header for the API token
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

async function fetchActivityFeedByProjectId(projectId, apiToken) {
    const response = await fetch(`/api/activity/project/${projectId}`, {
        method: 'GET',
        headers: {
            'X-Figma-Token': apiToken, // Use the custom header for the API token
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

async function fetchActivityFeedByFileKey(fileKey, apiToken) {
    const response = await fetch(`/api/activity/file/${fileKey}`, {
        method: 'GET',
        headers: {
            'X-Figma-Token': apiToken, // Use the custom header for the API token
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}