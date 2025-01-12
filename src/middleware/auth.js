const validateApiToken = (req, res, next) => {
    const apiToken = req.headers['x-figma-token'];
    if (!apiToken) {
        return res.status(400).json({ error: 'Missing API token in request headers' });
    }
    req.apiToken = apiToken;
    next();
};

module.exports = { validateApiToken };