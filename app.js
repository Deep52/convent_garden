///// set our current env to development
const env = process.env.NODE_ENV || 'development';
///// db access details
/////for app.js to connect to postgresQL
const config = require('./config.js')[env];
const http = require('http');

const hostname = '127.0.0.1';
const port = 7000;
const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const pg = require('pg');
const ejs = require('ejs');
const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb('null', '\public\image');
    },
    filename: (req, file, cb) => {
        cb(null, date.now() + "--" + file.originalname);

    },
});
//const upload = multer({ storage: filestorage });
const fs = require('fs');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    /// use JSON parser
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
//const upload = multer({ dest: '\image' });





///// serving static files 

//app.use(express.static(__dirname +.));
//app.use('\convent_garden1', router);
//app.use(cors());
//app.use(cookieParser());

//app.set('view engine', 'ejs');
//// use NODE middleware body parser to handle form data
///// https://www.npmjs.com/package/body-parser
//// the data can be retrieved via req.body 

//app.use(express.urlencoded({ extended: true }));


///// landing page handler



app.get('/', function(req, res) {
    let title = "NodeJS, ExpressJS, EJS and Postgres demo";
    res.render('index', { title: title });
});

app.post('/', function(req, res) {
    res.set({ status: 200, 'Content-Type': 'text/html' });
    res.send('<html><head></head><body><h1>my home page !</h1></body></html>');
});

app.get('/', function onrequest(req, res) {
    // console.log(path.join(__dirname + '/index.html'));
    ///res.sendFile(path.join(__dirname + '/index.html'));
    //res.send()
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.readFile('index.html', null, function(error, data) {
        if (error) {
            //console.log('fdsfs');
            res.writeHead(404);
            res.write('file is not found');
        } else {
            res.write(data)
        }


        res.end();
    });
    // app.use(express.static(__dirname + '/convent_garden1'));

    //fs.readFile('index.html');
    //res.end();
});

///// POST request handler
///// form data
/*app.post('/register', upload.single('mypic'), (req, res) =>
{
    console.log('dgdbfsdvfs');
   // console.log(req.mypic);
});*/


app.post('/register', urlencodedParser, function(req, res) {
   
    const pool = new pg.Pool(config);
    const client = await pool.connect();
    
    console.log('dagtdg');
   // const fName = req.body;

    console.log(fName);
    //const mypic = req.body.mypic;
    const fname = req.body.fname;
    const lname = req.body.lname;
    //const country = req.body.country;
   // const email = req.body.r_email;
   // const dob = req.body.dob;
   // const gender = req.body.gender;
    //const post_code = req.body.p_code;
   // const nationality = req.body.nationality;
    
    response = {
            fname: fname,
            lname: lname
        }
        //console.log(mypic);
        //res.json(response);
  
   /// var queryString = `INSERT INTO public.record(fname, lname, country, email, dob, gender, post_code, nationality) VALUES( '$fname', '$lname', '$country', '$email', '$dob', '$gender','$post_code', '$nationality')`;
        

    console.log('end of POST');
});




app.listen(port, hostname, (onrequest) => {
    console.log(`Server running at http://${hostname}:${port}/`);

});