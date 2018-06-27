// Built-in Node.js libraries
// Check description and functionality on https://nodejs.org/en/docs/
const http = require('http');
const fs = require('fs');
const path = require('path');

// Build path to main HTML file at the very beginning
const htmlPath = path.join(__dirname, 'public', 'index.html');

// Start a Http server. We are going to serve indes.html on root
// request and respond with 404 otherwise
http.createServer(
	// Requests handler. Two parameters - request/response
	// Both implement Stream interface
	// Again, stick to the documentation
	(request, response) => {
		switch (request.url) {
            case '/':
                fs.createReadStream(htmlPath).pipe(response);
				break;
			default:
                response.write('404 Not Found\n');
				response.end();
		}
	}
).listen(3000, err => {
	// Listen callback. Lets us check if server has started
	if (err) {
		console.log('error:', err);
		process.exit(1);
	}
	console.log('listening 3000');
});