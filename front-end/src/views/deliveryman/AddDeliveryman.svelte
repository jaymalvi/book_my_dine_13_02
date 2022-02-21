<script>
  const baseUrl = "http://localhost:4000/deliveryPerson";
  import { onMount } from 'svelte';


  export let location;
    // $: queryParam = new URLSearchParams(location.search).get("id");
    const urlParams = new URLSearchParams(window.location.search);
    const isBeta = urlParams;
    const pathName = location.pathname;
    const objectId = pathName.substring(pathName.lastIndexOf("/")+1, pathName.length);
    console.log(pathName, "------", objectId);
     
    // =========================================
  let data = {
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    vehicle_number: "",
    licence_number: "",
    delivery_person_image: "",
    licence_image: "",
    email: "",
    password: "",
  };

  onMount(async () => {
      console.log('the component has mounted', objectId);
      if (objectId != "adddeliveryman") {
        const res = await fetch(`${baseUrl}/${objectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        data = await res.json(); 
        console.log(data);
      }
    });

    //create functionality
  async function addDeliveryPerson() {
    const res = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const deliveryperson = res.json();
      // dispatch("postCreated", restaurant);
      return await deliveryperson;
  }

  //update functionality
  let updateDeliveryPerson = async () => {
    const res = await fetch(`${baseUrl}/${objectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const deliveryperson = res.json();
      // dispatch("postCreated", restaurant);
      return await deliveryperson;
  }
     
  // =========================================

    function readLicenceURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            // $('#forum-img').attr('src', e.target.result);
            document.getElementById("licencenumber").setAttribute("src", e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
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
      let files;
  
      $: if (files) {
        // Note that `files` is of type `FileList`, not an Array:
        // https://developer.mozilla.org/en-US/docs/Web/API/FileList
        console.log(files);
  
        for (const file of files) {
          console.log(`${file.name}: ${file.size} bytes`);
        }
      }
      function loadImage() {
        readURL(this);
      }
      function licenceImage() {
        readLicenceURL(this);
      }
  // core components
  // import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
  import {
      link
  } from "svelte-routing";
  
  // can be one of light or dark
  export let color = "light";
  </script>
  
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}" >
    <div class="block w-full overflow-x-auto">
          <!-- Restaurant info -->
          <div class="col-sm-12 col-lg-12 mb-3 mb-lg-2">
            <form method="post" >
              
  
                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase" style="margin-left: 2%;">
                  Deliveryman Information
                </h6>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="firstname">
                        First Name
                      </label>
                      <input
                        id="firstname"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.firstname}
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="lastname">
                        Last Name
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.lastname}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="address"
                      >
                      Address
                      </label>
                      <textarea
                        id="address"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.address}
                        placeholder="Address"
                      />
                    </div>
                   </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="phone">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.phone}
                        placeholder=" EX- 1234567890"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="vehicle_number">
                        Vehicle Number
                      </label>
                      <input
                        id="vehicle_number"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.vehicle_number}
                        placeholder="Enter Your Vehicle Number"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="licencen_number">
                        Licence Number
                      </label>
                      <input
                        id="licencen_number"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.licencen_number}
                        placeholder="Enter Your Licence Number"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="delivery_person_image">
                        Deliveryman Image
                      <small style="color: red"> ( Ratio 1:1 )</small>
                      </label>
                      <input
                        id="delivery_person_image"
                        bind:files
                        on:change={loadImage}
                        type="file"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.delivery_person_image}
                        placeholder="Choose File"
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"/>
                    </div>
                 </div>
                 <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="licence_image">
                        Licence Image
                      <small style="color: red"> ( Ratio 1:1 )</small>
                      </label>
                      <input
                        id="licence_image"
                        bind:files
                        on:change={licenceImage}
                        type="file"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.licence_image}
                        placeholder=""
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"/>
                    </div>
                 </div>
                 <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                        <center>
                            <img style="border: 1px solid; border-radius: 10px;width:200px !important;height: 200px !important;" id="viewer" src="https://demo.6amtech.com/stackfood/public/assets/admin/img/400x400/img2.jpg" alt="delivery-man image">
                          </center> 
                    </div>
                 </div>
                 <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                        <center>
                            <img style="border: 1px solid; border-radius: 10px;width:200px !important;height: 200px !important;" id="licencenumber" src="https://demo.6amtech.com/stackfood/public/assets/admin/img/400x400/img2.jpg" alt="delivery-man image">
                          </center>
                    </div>
                 </div>
                </div>
          
                <hr class="mt-6 border-b-1 border-blueGray-300" />
          
                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase" style="margin-left: 2%;">
                  Login Information
                </h6>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.email}
                        placeholder="EX- example@gmal.com"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        bind:value={data.password}
                        placeholder="6+ character reqired"
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        for="confirmpassword"
                      >
                        Confirm Password
                      </label>
                      <input
                        id="confirmpassword"
                        type="password"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value=""
                        placeholder="6+ character reqired"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-6 border-b-1 border-blueGray-300" />
  
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-12/12 px-4" style="margin-block: 2%;">
                    <div class="relative w-full mb-3">
                    {#if objectId != "adddeliveryman" }
                      <button type="submit" on:click|preventDefault={updateDeliveryPerson} class="btn btn-primary">
                        Update Delivery Person
                      </button>  
                      {:else}
                      <button type="submit" on:click|preventDefault={addDeliveryPerson} class="btn btn-primary">
                        Add Delivery Person
                      </button>
                      {/if}
                      <!-- <a 
                       use:link
                       href="/deliveryman/managedeliveryman" 
                       class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" style="margin-left:2%;">          
                       SUBMIT
                      </a> -->
                      <!-- <a 
                       use:link
                       href="/restaurant/addrestaurant" 
                       class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" style="margin-left:3%;">          
                       CANCLE
                      </a> -->
                    </div>
                  </div>
                </div>
              </form>
          </div>
      </div>
  </div>
  