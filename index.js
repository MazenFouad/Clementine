require('dotenv/config');

const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const nodemailer = require('nodemailer');
const hbars = require('nodemailer-express-handlebars');
const Mailgen = require('mailgen');
const bcrypt = require('bcrypt')
const User = require('./models/user');
const favicon = require('express-favicon');



// for auto refresh
// const livereload = require('livereload');
// const connectLivereload = require('connect-livereload');

//openai API key
const api_key = process.env.OPENAI_API_KEY;

//Routes
const dashboardRouter = require('./routers/dashboard');

const addProdRouter = require('./routers/addproducts');
const editProdRouter = require('./routers/editproducts');
const cartRouter = require('./routers/cart');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const userprofileRouter = require('./routers/userprofiles');
const users_loginRouter = require('./routers/login');
const cust_contRouter = require('./routers/editcustdash');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const chatRouter = require('./routers/chat');
const displayProdRouter = require('./routers/displayproducts');
const searchRoutes = require('./routers/searchbar');
const logoutroute = require('./routers/logout');
const employersRouter = require('./routers/employersdash');
const addempRouter = require('./routers/addemployers');
const editempRouter = require('./routers/editemployers');
const checkoutRouter = require('./routers/checkout');
const addcustRouter = require('./routers/addcustomers');
const reviewsRouter = require('./routers/reviews');
const reportsRouter = require('./routers/reports');
const adminprofileRouter = require('./routers/adminprofile');
const mailgunTransport = require('nodemailer-mailgun-transport');
const contactusRouter = require('./routers/mailController');


//const updatecustRoute = require('./routers/updatedeletecust');
// http://localhost:8080/api/v1/products


const api = process.env.API_URL;
const app = express();
const port = process.env.PORT || 8080;



// middleware
app.use(express.json());
app.use(morgan('tiny')); //displays log requests

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));
} else {
    app.use(express.static(path.join(__dirname, 'public')));
}

app.set('view engine', 'ejs'); //set the template engine
//app.use(express.static(path.join(process.cwd(), "/images")));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'Your_secret_key',
        saveUninitialized: false,
        resave: false,
    })
);

app.use(favicon(path.join(__dirname, 'public', 'Images', 'favicon.ico')));

// Routers
if (process.env.NODE_ENV === 'production') {
    app.use('/addproducts', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), addProdRouter);
    app.use('/employersdash', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), employersRouter);
    app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), productsRouter);
    app.use('/categories', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), categoriesRouter);
    app.use('/ordersdash', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), ordersRouter);
    app.use('/user', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), usersRouter);
    app.use('/userprofile', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), userprofileRouter);
    app.use('/login', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), users_loginRouter);
    app.use('/editcustdash', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), cust_contRouter);
    app.use('/editproducts', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), editProdRouter);
    app.use('/chat', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), chatRouter);
    app.use('/cart', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), cartRouter);
    app.use('/displayproducts', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), displayProdRouter);
    app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), searchRoutes);
    app.use('/logout', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), logoutroute);
    app.use('/addemployers', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), addempRouter);
    app.use('/editemployers', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), editempRouter);
    app.use('/checkout', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), checkoutRouter);
    app.use('/customers', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), addcustRouter);
    app.use('/dashboard', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), dashboardRouter);
    app.use('/reviews', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), reviewsRouter);
    app.use('/reports', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), reportsRouter);
    app.use('/adminprofile', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), adminprofileRouter);
    app.use('/contactus', express.static(path.join(__dirname, 'public'), { maxAge: '1d' }), contactusRouter);
} else {
    app.use('/addproducts', addProdRouter);
    app.use('/employersdash', employersRouter);
    app.use('/', productsRouter);
    app.use('/categories', categoriesRouter);
    app.use('/ordersdash', ordersRouter);
    app.use('/user', usersRouter);
    app.use('/userprofile', userprofileRouter);
    app.use('/login', users_loginRouter);
    app.use('/editcustdash', cust_contRouter);
    app.use('/editproducts', editProdRouter);
    app.use('/chat', chatRouter);
    app.use('/cart', cartRouter);
    app.use('/displayproducts', displayProdRouter);
    app.use('/', searchRoutes);
    app.use('/logout', logoutroute);
    app.use('/addemployers', addempRouter);
    app.use('/editemployers', editempRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/customers', addcustRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/reviews', reviewsRouter);
    app.use('/reports', reportsRouter);
    app.use('/adminprofile', adminprofileRouter);
    app.use('/contactus', contactusRouter);
}

const { Product } = require('./models/product');
const { OrderItem } = require('./models/order-items');

//app.use('/updatedeletecust', updatecustRoute);
mongoose
    .connect(
        'mongodb+srv://clementine:wifeys2023@clementine.xfv9xzu.mongodb.net/clementine?retryWrites=true&w=majority'
    )
    .then((result) => {
        console.log('database connection success');
    })
    .catch((err) => {
        console.log(err);
    });

app.get(`/`, async (req, res) => {
    const product = await Product.find()
        .sort({ date: -1 })
        .limit(10) // retrieve only 10 products
        .then((result) => {
            const product = result.length > 0 ? result : null; // check if newIn products are available
            res.render('pages/index', {
                product,
                user:
                    req.session.user == undefined
                        ? undefined
                        : req.session.user,
                employer: req.session.employer == undefined ? undefined : req.session.employer,
                cart:
                    req.session.cart == undefined
                        ? undefined
                        : req.session.cart,
            });
        });
});


app.get('/placeorder', (req, res) => {

    res.render('pages/placedOrder', {
        user:
            req.session.user == undefined
                ? undefined
                : req.session.user,
        employer: req.session.employer == undefined ? undefined : req.session.employer,
        cart:
            req.session.cart == undefined
                ? undefined
                : req.session.cart,
    });

})


app.get(`/home`, function (req, res) {
    res.render('pages/index', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart:
            req.session.cart.items == undefined
                ? undefined
                : req.session.cart.items,
    });
});

app.get(`/categories`, function (req, res) {
    res.render('pages/categories', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});

app.get(`/wishlist`, function (req, res) {
    res.render('pages/wishlist', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});

app.get('/search', function (req, res) {
    res.render('pages/search', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        employer: req.session.employer == undefined ? undefined : req.session.employer
    });
});

app.get('/contactus', function (req, res) {
    res.render('pages/contactus', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        employer: req.session.employer == undefined ? undefined : req.session.employer
    });
});

/* --------- DASHBOARDS -----*/
app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        currentPage: 'dashboard',
    });
});

app.get('/addproducts', (req, res) => {

    if (req.session.admin != undefined) {
        res.render('pages/addproducts', { isadmin: req.session.admin });
    } else {
        res.redirect('/404')
    }

});

app.get(`/editproducts`, function (req, res) {
    res.render('pages/editproducts');
});

app.get(`/editcustdash`, function (req, res) {
    res.render('pages/editcustdash');
});

app.get(`/addcustomers`, function (req, res) {
    if (req.session.admin != undefined) {
        res.render('pages/addcustomers', { isadmin: req.session.admin });

    } else {
        res.redirect('/404')
    }


});

app.get(`/updatedeletecust`, function (req, res) {
    res.render('pages/updatedeletecust');
});

app.get(`/updateorder`, function (req, res) {

    if (req.session.admin != undefined) {
        res.render('pages/updateorder', { isadmin: req.session.admin });
    } else {
        res.redirect('/404')
    }

});
// app.get(`/ordersdash`, function (req, res) {

//     if(req.session.admin != undefined){
//          res.render('pages/ordersdash',{isadmin:req.session.admin});
//     }else{
//         res.render('pages/404')
//     }

// });

app.get(`/adminprofile`, function (req, res) {

})

app.get(`/myprofile`, function (req, res) {
    res.render('pages/myprofile', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        error: undefined,

    })
})


app.get(`/displayproducts`, function (req, res) {
    res.render('pages/displayproducts');
});
app.get(`/reports`, function (req, res) {
    res.render('pages/reports');
});
app.get(`/employersdash`, function (req, res) {
    res.render('pages/employersdash');
});
app.get(`/addemployers`, function (req, res) {
    if (req.session.admin == true) {
        res.render('pages/addemployers', { isadmin: true });
    } else {
        res.redirect('/404')
    }


});
app.get(`/editemployers`, function (req, res) {
    res.render('pages/editemployers');
});
app.get(`/404`, function (req, res) {
    res.render('pages/404');
});

/* --------- DASHBOARDS END -----*/

/* --------- SIGN UP AND LOG IN ---*/
app.get(`/signup`, function (req, res) {
    res.render('pages/signup', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        error: undefined,
        employer: req.session.employer == undefined ? undefined : req.session.employer
    });
});

app.post('/sign-up-action', (req, res) => { });
/* --------- SIGN UP AND LOG IN END ---*/
//CONTACT US MAILER START

// app.post('/contactus', (req, res) => {

//   });
/* ---------CONTACT US FORM MAILER END --------*/

app.use((req, res) => {

    res.status(404).render('pages/404');
})

app.listen(port, () => {
    console.log('http://localhost:8080');
});
