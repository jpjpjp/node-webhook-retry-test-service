# Webhook Retry Test Server

This project creates a simple node.js webserver that will fail every 3 out of 4 API requests. It's a simple project, with no dependencies, that's useful for testing services that offer a webhook retry capability.

When running, the API endpoint - http://localhost:5000/ - will return a 502 response on the first request and print out console output that looks like:

`Failing with a 502 for request number 1`

On every fourth request, the service will return a 200 OK response and print out console output that looks like:

`Succeeding with a 200 for request number 4`

## Running the Server
1) Ensure that [NodeJS](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/cli/v7/configuring-npm/install) are installed

2) Clone the repo

3) Start the server. In the project directory, run:

```sh
node app.js
```

_**OR**_

```sh
npm run start
```

## Creating a public IP Address with ngrok

If you are using this service to test a webhook from an external service you will need to provide a URL that is reachable from the public internet.

[Ngrok](https://ngrok.com/) is a handy tool for getting a public IP address for a service running on a local machine.   Follow the [getting started guide](https://ngrok.com/docs/guides/quickstart) to create an ngrok account and install the ngrok software locally.

By default the retry test webserver runs on port 5000.  To get a public IP address for a service running on port 5000 type the following command:

```sh
ngrok http 5000
```

This will generate output that looks something like this:
```
ngrok by @inconshreveable                                       (Ctrl+C to quit)

Session Status                online
Account                       JP Shipherd (Plan: Free)
Version                       2.3.40
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://b881-54-177-173-6.ngrok.io -> http://localh
Forwarding                    https://b881-54-177-173-6.ngrok.io -> http://local
```

Copy the http fowarding interface (ie: " http://b881-54-177-173-6.ngrok.io") and set this as your webhook URL in the service you are testing.

This URL will route requests to your local service as long as ngrok remains running (and across webservice restarts).  If you have to restart ngrok (or your computer), you will be assigned a new IP address so you will need to update the webhook URL in the 3rd party service you are testing.  Ngrok offers paid accounts that allow custom subdomains that are static.

## Modifying the server behavior

The retry webservice is implemented in the file [app.js](./app.js).   You can modify the code to change the behavior of service as follows:

```js
// The server will start on port 5000 by default
const port = process.env.PORT || 5000;

// This API server will fail all but every Nth request
let successIncrement = 4

// This API server will return this failure code
let HttpResponseCode = 502
```
