<script>
    const baseUrl = "http://localhost:4000/addon";
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import {
      link
    } from "svelte-routing";
    export let color = "light";
    
      // ===============================
      let selected = 1;
      let files;
        
        function onChangeFoodType(event) {
        console.log(event.currentTarget.value);
            selected = event.currentTarget.value;
        }
      // ===============================
      
    
    
      export let location;
        // $: queryParam = new URLSearchParams(location.search).get("id");
        const urlParams = new URLSearchParams(window.location.search);
        const isBeta = urlParams;
        const pathName = location.pathname;
        const objectId = pathName.substring(pathName.lastIndexOf("/")+1, pathName.length);
        console.log(pathName, "------", objectId);
    
        
    
    
    // import { toasts, ToastContainer, FlatToast, BootstrapToast }  from "svelte-toasts";
    
    // const showToast = () => {
    //   const toast = toasts.add({
    //     title: 'Message title',
    //     description: 'Message body',
    //     duration: 10000, // 0 or negative to avoid auto-remove
    //     placement: 'bottom-right',
    //     type: 'info',
    //     theme: 'dark',
    //     placement: 'bottom-right',
    //     type: 'success',
    //     theme,
    //     onClick: () => {},
    //     onRemove: () => {},
    //     // component: BootstrapToast, // allows to override toast component/template per toast
    //   });
    
    //   // toast.remove()
    
    // };
      // =========================================
    
      let data = {
        name: "",
        price:"",
      };
    
        onMount(async () => {
          console.log('the component has mounted', objectId);
          if (objectId != "addaddon") {
            const res = await fetch(`${baseUrl}/${objectId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              },
            });
            data = await res.json(); 
            // console.log(data, typeof data.food_type, data.food_type);
          }
        });
  
    
      //create functionality
      async function submitForm(event) {
        event.preventDefault();
        const formData = new FormData();
        delete data._id;
        // data.isapproved= false;
        if (files && files.length > 0) {
          formData.append("file", files[0]);
          console.log(">>>>>>>", formData, files[0])
        }
        formData.append("data", JSON.stringify(data));
        // formData.push({...data});
        const response = await fetch(`${baseUrl}`, {
          method: "POST",
          // headers: [["Content-Type", "multipart/form-data"]],
          body: formData,
          // headers: {"Content-Type": "multipart/form-data"},
        });
        const addon = response.json();
        // dispatch("postCreated", restaurant);
        return await addon;
      }
      let addAddon = async () => {
        data.file = files;
        const res = await fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          console.log(JSON.stringify(data));
          const addon = res.json();
          navigate("/productsection/manageaddon", { replace: true });
          // dispatch("postCreated", restaurant);
          return await addon;
      }
      //update functionality
      let updateAddon = async () => {
        const res = await fetch(`${baseUrl}/${objectId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          const addon = res.json();
          navigate("/productsection/manageaddon", { replace: true });
          // dispatch("postCreated", restaurant);
          return await addon;
      }
      // =========================================
    
      function readURL(input) {
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function(e) {
              // $('#forum-img').attr('src', e.target.result);
              document.getElementById("viewer").setAttribute("src", e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]); // convert to base64 string
          }
        }
    
        $: if (files) {
          // Note that `files` is of type `FileList`, not an Array:
          // https://developer.mozilla.org/en-US/docs/Web/API/FileList
          console.log(files);
    
          for (const file of files) {
            data.logo = file.name;
            console.log(`${file.name}: ${file.size} bytes`);
          }
        }
        function loadImage() {
          readURL(this);
        }
    // core components
    // import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
    // can be one of light or dark
    </script>
   
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}" >
        <div class="block w-full overflow-x-auto">
            
            <div class="col-sm-12 col-lg-12 mb-3 mb-lg-2">
              
               <form method="post" enctype="multipart/form-data">
                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase" style="margin-left: 2%;">
                   Add New Addon
                </h6>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="name"
                      >
                       Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Addon Name"
                        bind:value={data.name}
                      />
                    </div>
                  </div>
                <!-- </div>
                <div class="flex flex-wrap"> -->
                 <div class="w-full lg:w-6/12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="price"
                  >
                   Price (₹)
                  </label>
                  <input
                    id="price"
                    type="number"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="10"
                    bind:value={data.price}
                  />
                  </div>
                 </div>
               
             
              
                  <hr class="mt-6 border-b-1 border-blueGray-300" />
    
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12 px-4" style="margin-block: 2%;">
                      <div class="relative w-full mb-3">
                          {#if objectId != "addaddon" }
                          <button type="submit" on:click|preventDefault={updateAddon} class="btn btn-primary">
                            Update Addon
                          </button>  
                          {:else}
                          <button type="submit" on:click|preventDefault={addAddon} class="btn btn-primary">
                            Add Addon
                          </button> 
                          {/if}
                        
                      </div>
                    </div>
                  </div>
                </form>
            </div>
        </div>
    </div>
  
   
    