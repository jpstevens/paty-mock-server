# paty-mock-server

[![Build Status](https://secure.travis-ci.org/jpstevens/paty-mock-server.png?branch=npm-package)](https://travis-ci.org/jpstevens/paty-mock-server)

A mock server for the PATY project. Useful for testing.

## Standalone Usage

In the root directory of your project, run:

```
git clone http://github.com/jpstevens/paty-mock-server
```

Once the repo has been cloned, run:

```
npm install
```

To start the app from the command line, run:

```
npm start
```

You can also set the logging and port number, using:

```
SHOW_LOG=true PORT=10001 npm start
```

Now your paty-web-server will be listening on port 10001. Hooray!

## In-Project Usage

In your project directory, run:

```
npm install jpstevens/paty-mock-server
```

Then, wherever you need the server, run:

```coffee
patyServer = require "paty-mock-server"

#start the server on port 1234
patyServer.start(1234)

# stop the server
patyServer.stop()
```

This can be useful when spinning the mock server up in tests.

## Testing

This package is tested using Mocha (with Chai). To run the tests, use:

```
npm test
```

Which runs the ``` grunt test ``` command.

The tests are split up into API versions. For version 'v1', for example, run:

```
grunt test:v1
```

If you'd just like to run a particular set of tests (e.g. unit, feature), within that version, run:

```
grunt test:v1:unit
```

Or:

```
grunt test:v1:feature
```

## Trivia:

By default, Paty will launch on port 7289 (the telephone key code for P-A-T-Y).