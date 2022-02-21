const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
// const fs = require("fs");
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

// app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use(bodyParser.urlencoded({extended: true}))
const blogController = require("./api/controllers/blogcontrollers");
const restaurantController = require("./api/controllers/restaurantcontrollers");
const deliveryPersonController = require("./api/controllers/deliverypersoncontroller");
const userController = require("./api/controllers/usercontroller");
const categoryController = require("./api/controllers/categorycontrollers");
const subcategoryController = require("./api/controllers/subcategorycontrollers");
const addonController = require("./api/controllers/addoncontrollers");
const attributeController = require("./api/controllers/attributecontrollers");
const productController = require("./api/controllers/productcontrollers");





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

// app.get("/image/:file", (req, res) => {
// 	fs.createReadStream(path.join(__dirname, "public", req.params.file)).pipe(
// 		res
// 	);
// });

app.get("/", (req, res) => {
  res.json("Hola Svelte Developers...Shall we fight??");
});

app.get("/blog", blogController.allBlogPost);
app.post("/blog", blogController.addBlogPost);
app.delete("/blog/:blogId", blogController.deleteBlogPost);
app.put("/blog/:blogId", blogController.updateBlogPost);

app.get("/restaurant/:id", restaurantController.getRestaurant);
app.get("/approved-restaurant/:isapproved?", restaurantController.allRestaurant);
app.post("/restaurant", upload.single('file'), restaurantController.addRestaurant);
app.delete("/restaurant/:id", restaurantController.deleteRestaurant);
app.put("/restaurant/:id", restaurantController.updateRestaurant);
app.get("/dashboard", restaurantController.dashboard);


app.get("/deliveryperson/:id", deliveryPersonController.getDeliveryPerson);
app.get("/approved-deliveryPerson/:isapproved?", deliveryPersonController.allDeliveryPerson);
app.get("/deliveryPerson", deliveryPersonController.allDeliveryPerson);
app.post("/deliveryperson", deliveryPersonController.addDeliveryPerson);
app.delete("/deliveryperson/:id", deliveryPersonController.deleteDeliveryPerson);
app.put("/deliveryperson/:id", deliveryPersonController.updateDeliveryPerson);

app.get("/category",categoryController.allCategory);
app.get("/category/:id", categoryController.getCategory);
app.post("/category", categoryController.addCategory);
app.delete("/category/:categoryId", categoryController.deleteCategory);
app.put("/category/:categoryId", categoryController.updateCategory);

app.get("/subcategory",subcategoryController.allSubCategory);
app.get("/subcategory/:id", subcategoryController.getSubCategory);
app.post("/subcategory", subcategoryController.addSubCategory);
app.delete("/subcategory/:subcategoryId", subcategoryController.deleteSubCategory);
app.put("/subcategory/:subcategoryId", subcategoryController.updateSubCategory);

app.get("/addon",addonController.allAddon);
app.get("/addon/:id", addonController.getAddon);
app.post("/addon", addonController.addAddon);
app.delete("/addon/:addonId", addonController.deleteAddon);
app.put("/addon/:addonId", addonController.updateAddon);

app.get("/attribute",attributeController.allAttribute);
app.get("/attribute/:id", attributeController.getAttribute);
app.post("/attribute", attributeController.addAttribute);
app.delete("/attribute/:attributeId", attributeController.deleteAttribute);
app.put("/attribute/:attributeId", attributeController.updateAttribute);

app.get("/product",productController.allProduct);
app.get("/product/:id", productController.getProduct);
app.post("/product", productController.addProduct);
app.delete("/product/:productId", productController.deleteProduct);
app.put("/product/:productId", productController.updateProduct);

app.post("/userAdd", userController.addUser);
app.post("/login", userController.POSTLogin);


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});