

<script>
    // core components
    // import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
    import { navigate } from "svelte-routing";

    // --------------------------------------------------------
    const baseUrl = "http://localhost:4000/DeliveryPerson";
    function reloadData() {
      doLoginCheck = fetchData()
    }
    async function fetchData() {
      const res = await fetch(`http://localhost:4000/approved-DeliveryPerson/false`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      return res.json();
    };

    //delete functionality
    // const deleteNote = async (id) => {
      async function deleteNote (id) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", id);
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      }).then(() =>{
        location.reload()
      })
      // await fetchdata();
      return await res.json();
    };


    let updateDeliveryPerson = async (id) => {
      const data = {isapproved: true};
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const restaurant = res.json();
      navigate("/deliveryman/managedeliveryman", { replace: true });
      // dispatch("postCreated", restaurant);
      return await restaurant;
  }

    
    // --------------------------------------------------------
    import {
    link
} from "svelte-routing";
  
    const bootstrap = "../assets/img/bootstrap.jpg";
    const angular = "../assets/img/angular.jpg";
    const sketch = "../assets/img/sketch.jpg";
    const react = "../assets/img/react.jpg";
    const vue = "../assets/img/react.jpg";
  
    const veg = "../assets/img/veg.jpg";
    const nonVeg = "../assets/img/nonveg.jpg";
    const team3 = "../assets/img/team-3-800x800.jpg";
    const team4 = "../assets/img/team-4-470x470.png";

  
    // can be one of light or dark
    export let color = "light";
  </script>
  
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-1">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
          >
         Delivery Person Approvel
          </h3>
         <div>
          <form class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"><div class="relative flex  flex-wrap items-stretch"><span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"><i class="fas fa-search"></i></span> 
            <input type="text" placeholder="Search here..." class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"></div></form>
        
        </div>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
        <!-- Projects table -->
        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}" >
               Image
              </th>
  
              <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}">
               Name
              </th>
  
              <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}" >
               Email
              </th>
  
              <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}" >
              Phone
              </th>
        
              <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"> 
              Action
              </th>
  
            </tr>
          </thead>
          
          <tbody>
            {#await fetchData()}
              <p>loading</p>
            {:then deliverypersons}
              {#each deliverypersons as i}
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
              >
                <img
                  src="{i.delivery_person_image}"
                  alt="..."
                  class="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
               />
              </th>
  
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              {i.firstname} {i.lastname}
              </td>
              
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              {i.email}
              </td>
  
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              {i.phone}
              </td>
  
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              <button class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"          
               on:click={() => updateDeliveryPerson(i._id) }>Confirm</button>
              <button class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"          
               on:click={() => deleteNote(i._id) }>Delete</button>
                <!-- <button>Edit</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-danger" on:click|preventDefault={deleteNote(i._id)}>Delete</button> -->
              </td>
          
            </tr>
            {/each}
            {:catch error}
              <p style="color: red">{error.message}</p>
            {/await}
           
          </tbody>
        </table>
      </div>
  
  </div>
  