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
			// Serving index.html on root request
            case '/':
                fs.createReadStream(htmlPath).pipe(response);
				break;
			default:
				// On other requests we are trying to find a file with
				// passed path. If it is found, serve it.
				// If not => 404
				const filePath = path.join(__dirname, request.url);
				// Checking for existence synchronously is not the best idea
				// but for simplicity lets leave it
				const fileExists = fs.existsSync(filePath);

				if (fileExists) {
					// Again a pipe. Looks neat, right?
                	fs.createReadStream(filePath).pipe(response);
					break;
				}

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