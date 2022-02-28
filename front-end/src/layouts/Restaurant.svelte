<script>
    import { Router, Route } from "svelte-routing";
  
    // components for this layout
    // import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
    import Sidebar from "components/Sidebar/Sidebar.svelte";
    import HeaderSimple from "components/Headers/HeaderSimple.svelte";
    import FooterAdmin from "components/Footers/FooterAdmin.svelte";
  
    // pages for this layout
    import ManageRestaurant from "views/restaurant/ManageRestaurant.svelte";
    import AddRestaurant from "views/restaurant/AddRestaurant.svelte";
    import RestaurantApprovel from "views/restaurant/RestaurantApprovel.svelte";
    import ManageDeliveryman from "views/deliveryman/ManageDeliveryman.svelte";
    import AddDeliveryman from "views/deliveryman/AddDeliveryman.svelte";
    import DeliveryPersonApprovel from "views/deliveryman/DeliveryPersonApprovel.svelte";
    import ManageCategory from "views/productsection/ManageCategory.svelte";
    import AddCategory from "views/productsection/AddCategory.svelte";
    import ManageSubCategory from "views/productsection/ManageSubCategory.svelte";
    import AddSubCategory from "views/productsection/AddSubCategory.svelte";
    import ManageAddon from "views/productsection/ManageAddon.svelte";
    import AddAddon from "views/productsection/AddAddon.svelte";
    import Manageattribute from "views/productsection/ManageAttribute.svelte";
    import AddAttribute from "views/Productsection/AddAttribute.svelte";
    import ManageProduct from "views/productsection/ManageProduct.svelte";
    import Addproduct from "views/Productsection/AddProduct.svelte";
    import Offer from "views/bussinesssection/offer.svelte";
    import AddOffer from "../views/bussinesssection/addoffer.svelte";
    import Reviews from "../views/bussinesssection/Reviews.svelte";

    // import ManageProduct from "views/Productsection/ManageProduct.svelte";


    // import AddRestaurant from "views/restaurant/ManageRestaurant/AddRestaurant.svelte";
   

    export let location;
    // export let Restaurant = "";
  </script>
  
  <div>
    <Sidebar location={location}/>
    <div class="relative md:ml-64 bg-blueGray-100">
       <!-- <AdminNavbar /> -->
      <HeaderSimple />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <Router url="restaurant">
          <Route path="managerestaurant" component="{ManageRestaurant}" />
          <Route path="addrestaurant" component="{AddRestaurant}" />
          <Route path="restaurantapprovel" component="{RestaurantApprovel}" />
          <Route path="addrestaurant/:id" component="{AddRestaurant}" />
          <!-- <Route path="managedeliveryman" component="{ManageDeliveryman}" />
          <Route path="addeliveryman" component="{AddDeliveryman}" /> -->
 
  
        </Router>
        <Router url="deliveryman">
          <!-- <Route path="managerestaurant" component="{ManageRestaurant}" />
          <Route path="addrestaurant" component="{AddRestaurant}" /> -->
          <Route path="managedeliveryman" component="{ManageDeliveryman}" />
          <Route path="adddeliveryman" component="{AddDeliveryman}" />
          <Route path="deliverypersonapprovel" component="{DeliveryPersonApprovel}" />
          <Route path="adddeliveryman/:id" component="{AddDeliveryman}" />
        </Router>

        <Router url="productsection">
          <Route path="managecategory" component="{ManageCategory}" />
          <Route path="addcategory" component="{AddCategory}" />
          <Route path="addcategory/:id" component="{AddCategory}" />
          <Route path="managesubcategory" component="{ManageSubCategory}" />
          <Route path="addsubcategory" component="{AddSubCategory}" />
          <Route path="addsubcategory/:id" component="{AddSubCategory}" />
          <Route path="manageaddon" component="{ManageAddon}" />
          <Route path="addaddon" component="{AddAddon}" />
          <Route path="addaddon/:id" component="{AddAddon}" />
          <Route path="manageattribute" component="{Manageattribute}" />
          <Route path="addattribute" component="{AddAttribute}" />
          <Route path="addattribute/:id" component="{AddAttribute}" />
          <Route path="manageproduct" component="{ManageProduct}" />
          <Route path="addproduct" component="{Addproduct}" />
          <Route path="addproduct/:id" component="{Addproduct}" />
        </Router>

        <Router url="bussinesssection">
          <Route path="offer" component="{Offer}" />
          <Route path="addoffer" component="{AddOffer}" />
          <Route path="reviews" component="{Reviews}"/>
        </Router>
        
        <FooterAdmin />
      </div>
    </div>
  </div>
  