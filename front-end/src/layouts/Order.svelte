<script>
    import { Router, Route } from "svelte-routing";
  
    // components for this layout
    import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
    import Sidebar from "components/Sidebar/Sidebar.svelte";
    import HeaderSimple from "components/Headers/HeaderSimple.svelte";
    import FooterAdmin from "components/Footers/FooterAdmin.svelte";
  
    // pages for this layout
    import Acceptedorder from "views/order/acceptedorder.svelte";
    import Cancelledorder from "views/order/cancelledorder.svelte";
    import Completedorder from "views/order/completedorder.svelte";
    import Dispatchedorder from "views/order/dispatchedorder.svelte";
    import Neworder from "views/order/neworder.svelte";
    import Readyforpickup from "views/order/readyforpickup.svelte";
  
    export let location;
    // export let Order = "";
  </script>
  
  <div>
    <Sidebar location={location}/>
    <div class="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar />
      <HeaderSimple />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <Router url="order">
          <Route path="acceptedorder" component="{Acceptedorder}" />
          <Route path="cancelledorder" component="{Cancelledorder}" />
          <Route path="completedorder" component="{Completedorder}" />
          <Route path="dispatchedorder" component="{Dispatchedorder}" />
          <Route path="neworder" component="{Neworder}" />
          <Route path="readyforpickup" component="{Readyforpickup}" />
          <!-- <Route path="settings" component="{Settings}" />
          <Route path="tables" component="{Tables}" />
          <Route path="maps" component="{Maps}" />
          <Route path="test1" component="{Test1}" /> -->
  
        </Router>
        <FooterAdmin />
      </div>
    </div>
  </div>
  