Building Web Apps with Node.js and Express
(https://app.pluralsight.com/library/courses/nodejs-express-web-applications-update)

1. Getting Started
    * Versioning Packages
        * ^a.b.c will take new minors and bug fixes but not new majors (so gives a.xx.xx)
        * ~a.b.c will only take new bug fixes (so gives a.b.xx)
        * Nothing in front gurantees to get exactly version you specify
        * In .npmrc save=true means automatically adding to package.json when do npm install
2. First Page
    * In node use commonmodules pattern (so you use require to get packages not es6 import pattern)
    * chalk package allows you to color log messages. Do chalk.green(string) to print string in green
    * debug package allows you to print messages ONLY when running in debug mode. So do debug(message)
      then run as DEBUG=app node app.js to run in debug mode and print debug messages (only app specific debug messages)
    * morgan package allows some built-in debugging if you include it as middleware
    * path package allows you to create file paths easily. Can use path.join to put together multiple parts of file path
    * CDN are places on iternet w/ common spot to pull css and js from (bootstrap and jquery both have one)
3. Tooling
    * ESLint is static code analysis
    * ESLint provides some style guides for styling code. This tutorial uses AirBNB style guide
    * node.green tells you which version of node allow which features in javascript
    * In VS Code ctrl+fn+f2 will get all instances of value and can edit all at once
4. Templating Engines
    * Pug (formally jade) - whitespace delimited and simplified representation of html
    * EJS - basically drops tags into html (similar to react or angular)
5. Templates
    * Lots of good templates to start project with
    * bootstrap zero has some good ones (using starterstrap for this)
6. Routing
    * Would prefer to have routes directory with all routers defined in different files then in app.js just import bookRouter (require) and then use it for the /book route. So the book router defines all its routes relative to /books
    * Make your routers (e.g. bookRouter) a function which is exported so can pass variables into it (see bookRouter as an example)
7. Databases
    * Note: didn't use mongoose, maybe look into that separately if curious
    * async/await is a way to avoid using promises
    * If have an async function then can do const result = await function and this will not run until AFTER the query comes back
        * I'm a little confused by this; is this blocking the execution?
    * Query Parameters
        * In express query parameters are in request.query.{parm name} and route parameters are on req.params.{param name} and req.body has http body
    * Middleware
        * Already used one piece of middleware: morgan. Basically it logs request automatically
        * Middleware is just a function executed on ALL requests (regardless of route...not sure if that's strictly true)
        * After middleware function must call next() to go to next middleware item
        * So can use middleware like filters to control if request continues
        * In router can do a piece of "middleware" with .all() which does a function for ALL requests to this
          route. Then after all() can do the get, put, post, etc routes.
            * .all() takes in req, res, next (like all middleware) and have to call next() at the end
            * In this all() method can modify the rquest to put new things on it
    * Admin Routes
        * For this project these will handle insertion of data to mongo automatically (which is cool)
8. Authentication
    * Passport is pretty much default express package for user management (we'll use local strategy but can also use remote strategy for things like google, etc)
    * Use body-parser package to parse http request body
    * Can do req.logout on a request (if using passport) to 'logout' a user
9. Structure and 3rd Party APIs
    * Setup controllers and just have the routes map to the controller methods (don't put everything in the routes files)