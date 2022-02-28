<script>
    // core components
    // import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
    import { navigate } from "svelte-routing";
    let showModal = false;

function toggleModal(){
  showModal = !showModal;
}

    // --------------------------------------------------------
    const baseUrl = "http://localhost:4000/restaurant";
    function reloadData() {
      doLoginCheck = fetchData()
    }
    async function fetchData() {
      const res = await fetch(`http://localhost:4000/approved-restaurant/true`, {
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
      })
      // await fetchdata();
      navigate("/restaurant/managerestaurant", { replace: true });
      return await res.json();
      
    };

    
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
  {#if showModal}
  <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex" style=  "margin-top: -11%;  margin-left: 25%;" >
<div class="relative w-auto my-6 mx-auto max-w-sm">
<!--content-->
<div class="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
<!--header-->
<div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
<h3 class="text-3xl font-semibold">
Are You Sure?
</h3>
<button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={toggleModal}>
<!-- <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
 x
</span> -->
</button>
</div>
<!--body-->
<div class="relative p-6 flex-auto">
<p class="my-4 text-blueGray-500 text-lg leading-relaxed">
 Want To Delete This
</p>
</div>
<!--footer-->
<div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
<button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModal}>
No
</button>
<button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={() => deleteNote(i._id) }>
Yes
</button>
</div>
</div>
</div>
</div>
<div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
{/if}
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}"
   >
    <div class="rounded-t mb-0 px-4 py-3 border-1">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
          >
            Manage Restaurant
          </h3>
         <div>
          <form class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"><div class="relative flex  flex-wrap items-stretch"><span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"><i class="fas fa-search"></i></span> 
            <input type="text" placeholder="Search here..." class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"></div></form>
         
          <a 
          use:link
          href="/restaurant/addrestaurant" 
          class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" style="margin-left: 82%;">          
          <i class="fa fa-plus" aria-hidden="true"></i> Add Restaurant
          </a>
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
             Restaurant Name
            </th>

            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}" >
             Email
            </th>

            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}" >
            Phone
            </th>
      
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}" >
              Owner Name 
            </th>

            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}">
             Status
            </th>

            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"> 
            Action
            </th>

          </tr>
        </thead>
        
        <tbody>
          {#await fetchData()}
            <p>loading</p>
          {:then restaurants}
            {#each restaurants as i}
            <tr>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
              >
              <img
                  src=""
                  alt="..."
                  class="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                />
                
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              {i.name}
              {#if i.food_type == 1}
                <img
                 src="{veg}"
                 alt="..."
                 class="w-5 h-5  border-2 border-blueGray-50 shadow"
                />
              {:else if i.food_type == 2}
              <img
                 src="{nonVeg}"
                 alt="..."
                 class="w-5 h-5  border-2 border-blueGray-50 shadow"
               />
              {:else}
              <img
              src="{veg}"
              alt="..."
              class="w-5 h-5  border-2 border-blueGray-50 shadow"
              />
              <img
                 src="{nonVeg}"
                 alt="..."
                 class="w-5 h-5  border-2 border-blueGray-50 shadow"
              />
              {/if} 
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
              {i.firstname} {i.lastname}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
              >
                
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
              >
              <a 
                use:link
                href="/restaurant/addrestaurant/{i._id}" 
                class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">          
                View
                </a>
              <button class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"          
              on:click={toggleModal}>Delete
              </button>
              
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
  