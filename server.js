// Built-in Node.js libraries
// Check description and functionality on https://nodejs.org/en/docs/
const http = require('http');
const fs = require('fs');
const path = require('path');

// Build path to main HTML file at the very beginning
const htmlPath = path.join(__dirname, 'public', 'index.html');
// Initial data
const todos = ['Buy milk', 'Brush teeth', 'Love mommy'];

// Start a Http server. We are going to serve index.html on root
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
			// Lets use /api/todos as an API endpoint
			// We need to perform an action based on used request method
			case '/api/todos':
				switch (request.method) {
					// Return list of todos
					case 'GET':
						response.writeHead(200, { "Content-Type": "application/json" });
						response.end(JSON.stringify({ todos }));
						break;
					// Create a new todo. Data comes as an object with todo property
					case 'POST':
						// Remember, it is a stream. We are collecting data before using it
						body = [];
						request
							.on('data', chunk => body.push(chunk))
							.on('end', () => {
								// Get object from passed data and store internally
								body = JSON.parse(Buffer.concat(body).toString());
								todos.push(body.todo);
								response.writeHead(204);
								response.end();
							});
						break;
					// Remove a todo
					case 'DELETE':
						// Collecting data from stream
						body = [];
						request
							.on('data', chunk => body.push(chunk))
							.on('end', () => {
								// Get object from passed data
								body = JSON.parse(Buffer.concat(body).toString());
								// Just looking for the same string internally
								const index = todos.findIndex(el => el === body.todo);
								if (index > -1) {
									todos.splice(index, 1);
								}

								response.writeHead(204);
								response.end();
							});
						break;
				}
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

				response.end('404 Not Found\n');
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