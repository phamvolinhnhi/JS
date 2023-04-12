const express =require("express");
const path = require('path');
const cors =require("cors");
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose =require("mongoose");
const bodyParser =require("body-parser");
const morgan =require("morgan");
const dotenv =require("dotenv");
const helmet = require("helmet");
const app =express();
const methodOverride = require('method-override')

const expressLayouts = require('express-ejs-layouts')

dotenv.config();
//connect database 
mongoose.connect((process.env.mongo_URL),
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


// custom middleware logger
app.use(logger);

app.use(bodyParser.json({limit:"50mb"}));

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


app.use(helmet());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(morgan("common"));

//routes
app.use('/', require('./routes/root'));
const userRoute=require("./routes/user");
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
app.use('/home', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.use("/user",userRoute);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(3001,()=>{
    console.log("Server Is running......");
});