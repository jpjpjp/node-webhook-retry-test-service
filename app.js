const http = require("http");

// The server will start on port 5000 by default
const port = process.env.PORT || 5000;

// This API server will fail all but every Nth request
let successIncrement = 4

// This API server will return this failure code
let HttpResponseCode = 502

// Count number of requests coming in
let numRequests = 0;

http
  .createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // Increment request count
    numRequests += 1;
    if (numRequests % successIncrement) {
      console.log(`Failing with a ${HttpResponseCode} for request number ${numRequests}`);
      res.writeHead(HttpResponseCode, { "Content-Type": "application/json" });
      res.write(JSON.stringify({success: false, error: {message: `Failing request number ${numRequests}`}}));
    } else {
      console.log(`Succeeding with a 200 for request number ${numRequests}`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({success: true, message: `Request number ${numRequests} succeeded!`}));
    }
    res.end();

  })
  .listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
