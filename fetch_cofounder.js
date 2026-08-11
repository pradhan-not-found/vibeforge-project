const https = require('https');
https.get('https://cofounder.co', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const matches = data.match(/[^"']*(img-footer-1|footer-1)[^"']*/g);
        if (matches) {
            console.log("Found image references in cofounder.co:");
            matches.forEach(m => console.log(m));
        } else {
            console.log("No match found.");
        }
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});
