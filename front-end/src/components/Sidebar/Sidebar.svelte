<script>
import {
    link
} from "svelte-routing";

// core components
import NotificationDropdown from "components/Dropdowns/NotificationDropdown.svelte";
import UserDropdown from "components/Dropdowns/UserDropdown.svelte";
import OrderDropdown from "components/Dropdowns/OrderDropdown.svelte";
const loginData = JSON.parse(localStorage.getItem("loginData"));
        // const loginData = getContext("loginData");
        console.log(">>>>>>>>>>>...................", loginData);
        let role = "";
        let restaurantaname ="";
        if (loginData && loginData.user && loginData.user.type && loginData.user.type === "admin") {
          console.log("Looged in user.......");
          role = loginData.user.type;
        } else {
            restaurantaname = loginData.user.name;
          console.log("UNAUTH user.......");
        //   navigate("/auth/login", { replace: true });
        }


let collapseShow = "hidden";

function toggleCollapseShow(classes) {
    collapseShow = classes;
}

export let location;
</script>

<nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
    >
    <div
        class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
        >
        <!-- Toggler -->
        <!-- <button
      class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
      type="button"
      on:click={() => toggleCollapseShow('bg-white m-2 py-3 px-6')}
    >
      <i class="fas fa-bars"></i>
        </button> -->
        <!-- Brand -->
        {#if role && role === "admin"}
        <h3> <b>
            BOOK MY DINE
        </b></h3>
        {:else}
        <h3> <b>
            {restaurantaname}
        </b></h3>
        {/if}
        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        {#if role && role === "admin"}
        <h3
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            Super Admin
        </h3>
        {:else}
        <h3
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            Restaurant Admin
        </h3>
        {/if}
        <!-- Navigation -->
    
        {#if role && role === "admin"}
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
            <li class="items-center">
                <a
                    use:link
                    href="/admin/dashboard"
                    class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/dashboard') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                    >
                    <i
                        class="fas fa-tv mr-2 text-sm {location.href.indexOf('/admin/dashboard') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
                        ></i>
                    Dashboard
                </a>
            </li>

            <li class="items-center">
                <a
                    use:link
                    href="/admin/settings"
                    class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/settings') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                    >
                    <i
                        class="fas fa-tools mr-2 text-sm {location.href.indexOf('/admin/settings') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
                        ></i>
                    Settings
                </a>
            </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        
        <h6
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            <a
                use:link
                href="/restaurant/managerestaurant"
                class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/restaurant/managerestaurant') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                >
                <i
                    class="fas fa-duotone fa-map-marked mr-2 text-sm {location.href.indexOf('/restaurant/managerestaurant') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
                    ></i>
                Restaurant
            </a>
        </h6>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          <a
           use:link
           href="/deliveryman/managedeliveryman"
           class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/deliveryman/managedeliveryman') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}">
             <i class="fas fa-biking mr-2 text-sm {location.href.indexOf('/deliveryman/managedeliveryman') !== -1 ? 'opacity-75' : 'text-blueGray-300'}">
             </i>
              Delivery Men
           </a>
        </h6>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
         <OrderDropdown/>

         <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            <a
                use:link
                href="/deliveryman/managedeliveryman"
                class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/restaurant/managerestaurant') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                >
                <i
                    class="fas fa-duotone fa-map-marked mr-2 text-sm {location.href.indexOf('/restaurant/managerestaurant') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
                    ></i>
                Customer
            </a>
        </h6>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />

        <!-- Heading -->
        <h6
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            Approvels
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/restaurant/restaurantapprovel"
                    >
                    <i class="fas fa-fingerprint text-blueGray-300 mr-2 text-sm"></i>
                    Restaurant
                </a>
            </li>

            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/deliveryman/deliverypersonapprovel"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Delivery Person
                </a>
            </li>
        </ul>
        
        {:else}
        <!-- END --->
        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />

        <!-- Heading -->
        <h6
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            Product Section
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/productsection/managecategory"
                    >
                    <i class="fas fa-fingerprint text-blueGray-300 mr-2 text-sm"></i>
                    Category
                </a>
            </li>

            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/productsection/managesubcategory"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Subcategory
                </a>
            </li>

            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/productsection/manageaddon"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Addon
                </a>
            </li>

            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/productsection/manageattribute"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Attridute
                </a>
            </li>

            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/productsection/manageproduct"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Product
                </a>
            </li>
        </ul>
         <!-- Divider -->
         <hr class="my-4 md:min-w-full" />
         <!-- Heading -->
          <OrderDropdown/>
        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />

        <!-- Heading -->
        <h6
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            BUSINESS SECTION
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/bussinesssection/offer"
                    >
                    <i class="fas fa-fingerprint text-blueGray-300 mr-2 text-sm"></i>
                    Offer
                </a>
            </li>

            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/bussinesssection/reviews"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Product Reviews 
                </a>
            </li>
        </ul>

        {/if}

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />

        <!-- Heading -->
        <!-- <h6
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            Auth Layout Pages
        </h6> -->
        <!-- Navigation -->

        <!-- <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/auth/login"
                    >
                    <i class="fas fa-fingerprint text-blueGray-300 mr-2 text-sm"></i>
                    Login
                </a>
            </li>

            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/auth/register"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Register
                </a>
            </li>
            <li class="items-center">
                <a
                    use:link
                    class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                    href="/auth/login"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Logout
                </a>
            </li>
        </ul> -->
    </div>
</nav>
