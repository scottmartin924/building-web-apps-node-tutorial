const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
// Be careful, MUST have () after json, if not it will just spin and never return
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// Where views are stored
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];


// Want to line up routers here and then use below it...much cleaner than all in 1 file
// To make require not come from node_modules need file path
const adminRouter = require('./src/routes/adminRoutes')();
const bookRouter = require('./src/routes/bookRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/admin', adminRouter);
app.use('/books', bookRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
      title: 'Library',
    },
  );
});

app.listen(port, () => debug(`Listening on port ${chalk.green(port)}`));
