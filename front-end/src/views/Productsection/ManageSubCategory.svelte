<script>
    // core components
    // import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
    import { navigate } from "svelte-routing";


    // --------------------------------------------------------
    const baseUrl = "http://localhost:4000/subcategory";
    function reloadData() {
      doLoginCheck = fetchData()
    }
    async function fetchData() {
      const res = await fetch(`${baseUrl}`, {
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
         Sub Category
          </h3>
         <div>
          <form class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"><div class="relative flex  flex-wrap items-stretch"><span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"><i class="fas fa-search"></i></span> 
            <input type="text" placeholder="Search here..." class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"></div></form>
         
          <a 
          use:link
          href="/productsection/addsubcategory" 
          class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" style="margin-left: 82%;">          
          <i class="fa fa-plus" aria-hidden="true"></i> Add SUb Category
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
              Sub Category Name
            </th>

            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}">
             Main Category
            </th>

            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}" >
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
          {:then subcategories}
            {#each subcategories as i}
            <tr>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
              >
              {i.name}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              {i.categoryRef[0].name}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              
               </td>
                
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
              >
              <a 
                use:link
                href="/productsection/addsubcategory/{i._id}" 
                class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">          
                 Edit
                </a>
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
  