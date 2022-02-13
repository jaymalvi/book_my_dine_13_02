<script>
    import { Router, Route } from "svelte-routing";
  
    // components for this layout
    import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
    import Sidebar from "components/Sidebar/Sidebar.svelte";
    import HeaderSimple from "components/Headers/HeaderSimple.svelte";
    import FooterAdmin from "components/Footers/FooterAdmin.svelte";
  
    // pages for this layout
    import ManageRestaurant from "views/restaurant/ManageRestaurant.svelte";
    import AddRestaurant from "views/restaurant/AddRestaurant.svelte";
    // import AddRestaurant from "views/restaurant/ManageRestaurant/AddRestaurant.svelte";
   

    export let location;
    // export let Restaurant = "";
  </script>
  
  <div>
    <Sidebar location={location}/>
    <div class="relative md:ml-64 bg-blueGray-100">
       <AdminNavbar />
      <HeaderSimple />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <Router url="restaurant">
          <Route path="managerestaurant" component="{ManageRestaurant}" />
          <Route path="addrestaurant" component="{AddRestaurant}" />
 

         </Router> 
        <FooterAdmin />
      </div>
    </div>
  </div>
  