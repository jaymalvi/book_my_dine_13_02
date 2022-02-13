<script>
    import { link } from "svelte-routing";
    // library for creating dropdown menu appear on click
    import { createPopper } from "@popperjs/core";
  
    // core components
  
    let dropdownPopoverShow = false;
  
    let btnDropdownRef;
    let popoverDropdownRef;
  
    const toggleDropdown = (event) => {
      event.preventDefault();
      if (dropdownPopoverShow) {
        dropdownPopoverShow = false;
      } else {
        dropdownPopoverShow = true;
        createPopper(btnDropdownRef, popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    };
  </script>
  
  <div>
    <a
      class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
      href="#pablo"
      bind:this="{btnDropdownRef}"
      on:click="{toggleDropdown}"
    >
      <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        <i class="fas fa-utensils text-blueGray-300 mr-2 text-sm"></i>
        Orders
      </h6>
    </a>
    <div
      bind:this="{popoverDropdownRef}"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow ? 'block':'hidden'}"
>
    <a
                    use:link
                    class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/order/neworder') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                    href="/order/neworder"
                    >
                    <i class="fas fa-utensils text-blueGray-300 mr-2 text-sm"></i>
                    New order
    </a>
    <a
                    use:link
                    class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/order/acceptedorder') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                    href="/order/acceptedorder"
                    >
                    <i class="fas fa-infinity text-blueGray-300 mr-2 text-sm"></i>
                    Accepted order
     </a>
     <a
                    use:link
                    class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/order/readyforpickup') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                    href="/order/readyforpickup"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Ready for pickup
     </a>
     <a
                    use:link
                    class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/order/dispatchedorder') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                    href="/order/dispatchedorder"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Dispatched orders
     </a>
     <a
                    use:link
                    class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/order/completedorder') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                    href="/order/completedorder"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Completed order
     </a>
     <a
                    use:link
                    class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/order/cancelledorder') !== -1 ? 'text-red-500 hover:text-red-600':'text-blueGray-700 hover:text-blueGray-500'}"
                    href="/order/cancelledorder"
                    >
                    <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                    Cancelled order
    </a>
      <!-- <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        Admin Layout
      </span> -->
      <!-- <a
        use:link
        href="/admin/dashboard"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Dashboard
      </a>
      <a
        use:link
        href="/admin/dashboard-1"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Dashboard-1
      </a>
      <a
        use:link
        href="/admin/settings"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Settings
      </a>
      <a
        use:link
        href="/admin/tables"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Tables
      </a>
      <a
        use:link
        href="/admin/maps"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Maps
      </a>
      <div class="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        Auth Layout
      </span>
      <a
        use:link
        href="/auth/login"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Login
      </a>
      <a
        use:link
        href="/auth/register"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Register
      </a>
      <div class="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        No Layout
      </span>
      <a
        use:link
        href="/landing"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Landing
      </a>
      <a
        use:link
        href="/profile"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Profile
      </a> -->
    </div>
  </div>
  