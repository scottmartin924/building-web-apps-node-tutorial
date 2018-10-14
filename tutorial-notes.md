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
