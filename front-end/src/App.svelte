<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";
  import App from './App.svelte';
  // import Notifications from 'svelte-notifications';

  // Admin Layout
  import Admin from "./layouts/Admin.svelte";
  
  // Order Layout
  import Order from "./layouts/order.svelte";

  // Auth Layout
  import Auth from "./layouts/Auth.svelte";
 // AddResto Layout
  // import AddResto from "./layouts/AddResto.svelte";


  // No Layout Pages
  import Index from "./views/Index.svelte";
  import Admin1 from "./layouts/Admin1.svelte";
  import Landing from "./views/Landing.svelte";
  import Profile from "./views/Profile.svelte";
import Restaurant from "./layouts/Restaurant.svelte";
import Deliveryman from "./layouts/Restaurant.svelte";
import ProductSection from "./layouts/Restaurant.svelte";
import BussinessSection from "./layouts/Restaurant.svelte";

// import AddResto from "./views/restaurant/AddRestaurant.svelte";


  export let url = "";
</script>
  <!-- login page -->
  <Router url="{url}/auth/login">
  <!-- admin layout -->
  <Route path="admin/*admin" component="{Admin}" />
  <Route path="admin1/*admin1" component="{Admin1}" />
   <!-- restaurant layout -->
   <Route path="restaurant/*restaurant/*" component="{Restaurant}" />
   <!-- restaurant layout -->
   <!-- <Route path="addrestaurant/*addrestaurant" component="{AddResto}" /> -->
  <!-- order layout -->
  <Route path="order/*order" component="{Order}" />
  <!-- deliveryman layout -->
  <Route path="deliveryman/*deliveryman" component="{Deliveryman}" />
  <!-- productSection layout -->
  <Route path="productsection/*productsection/*" component="{ProductSection}" />
  <!-- BussinessSection layout -->
  <Route path="bussinesssection/*bussinesssection/*" component="{BussinessSection}" />
  <!-- auth layout -->
  <Route path="auth/*auth" component="{Auth}" />
  <!-- no layout pages -->
  <Route path="landing" component="{Landing}" />
  <Route path="profile" component="{Profile}" />
  

  <Route path="/" component="{Index}" />
</Router>

<!-- <Notifications>
  <App />
</Notifications> -->