const https = require('https');

const queries = ['ez bar curl', 'preacher curl machine', 'dumbbell curl', 'hammer curl', 'cable curl', 'skull crusher', 'dips machine'];

const fetchId = (query) => {
    return new Promise((resolve) => {
        const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
                if (match) resolve(match[1]);
                else resolve('NONE');
            });
        }).on('error', () => resolve('ERROR'));
    });
};

(async () => {
    for (const q of queries) {
        const id = await fetchId(q);
        console.log(`${q}: ${id}`);
    }
})();
