const express = require("express");
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/db");
const multer  = require('multer')
var path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname)) //Appending extension
  }
})

const upload = multer({ storage });
const app = express();

app.use(express.static(__dirname + 'public'));
// app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use(bodyParser.urlencoded({extended: true}))
const blogController = require("./api/controllers/blogcontrollers");
const restaurantController = require("./api/controllers/restaurantcontrollers");
const deliveryPersonController = require("./api/controllers/deliverypersoncontroller");



//configure database and mongoose
mongoose.connect("mongodb://localhost:27017/blogApp", {}, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
});

// Or using promises
mongoose.connect("mongodb://localhost:27017/blogApp").then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
  err => { /** handle initial connection error */ }
);
// db configuaration ends here

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: true}));
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
// define first route
app.get("/", (req, res) => {
  res.json("Hola Svelte Developers...Shall we fight??");
});

app.get("/blog", blogController.allBlogPost);
app.post("/blog", blogController.addBlogPost);
app.delete("/blog/:blogId", blogController.deleteBlogPost);
app.put("/blog/:blogId", blogController.updateBlogPost);

app.get("/restaurant", restaurantController.allRestaurant);
app.get("/restaurant/:id", restaurantController.getRestaurant);
app.post("/restaurant", upload.single('file'), restaurantController.addRestaurant);
app.delete("/restaurant/:id", restaurantController.deleteRestaurant);
app.put("/restaurant/:id", restaurantController.updateRestaurant);


app.get("/deliveryPerson", deliveryPersonController.allDeliveryPerson);
app.get("/deliveryperson/:id", deliveryPersonController.getDeliveryPerson);
app.post("/deliveryperson", deliveryPersonController.addDeliveryPerson);
app.delete("/deliveryperson/:id", deliveryPersonController.deleteDeliveryPerson);
app.put("/deliveryperson/:id", deliveryPersonController.updateDeliveryPerson);


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});