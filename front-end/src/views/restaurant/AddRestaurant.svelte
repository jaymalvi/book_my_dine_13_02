<script>
  const baseUrl = "http://localhost:4000/restaurant";
  import { onMount } from 'svelte';
  import { navigate } from "svelte-routing";

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
  let foodtype = 1;
  let data = {
    name: "",
    address: "",
    tax: "",
    charge: "",
    minimum_delivery_time: "",
    maximum_delivery_time: "",
    opening_time: "",
    closing_time: "",
    // logo: files,
    foodtype: "",
    food_type: 1,
    latitude: "",
    longitude: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  };

    onMount(async () => {
      console.log('the component has mounted', objectId, objectId != "addrestaurant");
      if (objectId != "addrestaurant") {
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
    //   const location = await getLocation().catch((err) => {
		// 	console.log(err);
		// 	window.alert(err.message);
		// });
		// currentLocation = location;
		// map = new window.google.maps.Map(mapContainer, {
		// 	center: location,
		// 	zoom: 15,
		// });
		// const marker = new window.google.maps.Marker({
		// 	position: location,
		// 	map: map,
		// 	draggable: true,
		// });
		// marker.addListener("dragend", (e) => {
		// 	currentLocation.lat = e.latLng.lat();
		// 	currentLocation.lng = e.latLng.lng();
		// 	console.log("new Location : ", currentLocation);
		// });
    // });

  //create functionality
  async function submitForm(event) {
    event.preventDefault();
    const formData = new FormData();
    delete data._id;
    data.isapproved= false;
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
    const restaurant = response.json();
    // dispatch("postCreated", restaurant);
    return await restaurant;
  }
  let addRestaurant = async () => {
    data.file = files;
    const res = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
        body: data
      });
      console.log(JSON.stringify(data));
      const restaurant = res.json();
      navigate("/restaurant/restaurantapprovel", { replace: true });
      // dispatch("postCreated", restaurant);
      return await restaurant;
  }
  //update functionality
  let updateRestaurant = async () => {
    const res = await fetch(`${baseUrl}/${objectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const restaurant = res.json();
      navigate("/restaurant/managerestaurant", { replace: true });
      // dispatch("postCreated", restaurant);
      return await restaurant;
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
import {
    link
} from "svelte-routing";
// can be one of light or dark
export let color = "light";
</script>
<!-- <main class="flex flex-col container items-center mt-10">
	<h1 class="text-lg block text-center">Svelte Toasts</h1>
  <button on:click={showToast}>Show Toast</button>
  <ToastContainer placement="bottom-right" let:data={data}>
    <FlatToast {data} />
  </ToastContainer>
</main> -->
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}" >
    <div class="block w-full overflow-x-auto">
        <!-- Restaurant info -->
        <div class="col-sm-12 col-lg-12 mb-3 mb-lg-2">
          
           <form method="post" enctype="multipart/form-data" on:submit={submitForm}>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase" style="margin-left: 2%;">
              Restaurant Information
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="name"
                  >
                    Restaurant Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Restaurant Name"
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
                  for="address"
                >
                  Restaurant Address
                </label>
                <textarea
                  id="address"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  bind:value={data.address}
                  placeholder="Restaurant Address"
                />
              </div>
             </div>
           <!-- </div>
           <div class="flex flex-wrap"> -->
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="tax"
                >
                  TAX(%)
                </label>
                <input
                  id="tax"
                  type="number"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="VAT/TAX"
                  min="0"
                  step=".05"
                  required="" 
                  bind:value={data.tax}
                />
              </div>
            </div>
          <!-- </div>
          <div class="flex flex-wrap"> -->
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="charge"
                >
                  Delivery charge(₹)
                </label>
                <input
                  id="charge"
                  type="number"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="10"
                  min="0"
                  bind:value={data.charge}
                />
              </div>
            </div>
          <!-- </div>
          <div class="flex flex-wrap"> -->
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="minimum_delivery_time"
                >
                Minimum delivery time (Minutes)
                </label>
                <input
                  id="minimum_delivery_time"
                  type="number"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  bind:value={data.minimum_delivery_time}
                  placeholder="30"
                  min="0"
                  step="5"
                  max="30"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="maximum_delivery_time"
                >
                Maximum delivery time (Minutes)
                </label>
                <input
                  id="maximum_delivery_time"
                  type="number"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  bind:value={data.maximum_delivery_time}
                  placeholder="40"
                  min="0"
                  step="5"
                  max="40"
                />
              </div>
            </div>
          <!-- </div>
          <div class="flex flex-wrap"> -->
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="opening_time"
                >
                Opening time 
                </label>
                <input
                  id="opening_time"
                  type="time"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  bind:value={data.opening_time}
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="maximum_delivery_time"
                >
                Closing time 
                </label>
                <input
                  id="closing_time"
                  type="time"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  bind:value={data.closing_time}/>
              </div>
            </div>
          <!-- </div> -->
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="logo">
                Restaurant Logo
              <small style="color: red"> ( Ratio 1:1 )</small>
              </label>
              <input
                id="logo"
                on:change={loadImage}
                type="file"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                bind:files={files}
                placeholder="Choose File"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
              />
            </div>
            <br>
            <div class="relative w-full mb-3">
              <label id="food_type"
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                >
                Food Type
                </label>
              <label>
                <input name="food_type" type=radio bind:group={data.food_type} value={"1"}>
                VEG
              </label>
              
              <label>
                <input name="food_type" type=radio bind:group={data.food_type} value={"2"}>
                NON-VEG
              </label>
              
              <label>
                <input name="food_type" type=radio bind:group={data.food_type} value={"3"}>
                BOTH
              </label>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <center>
              <img style="border: 1px solid; border-radius: 10px;width:200px !important;height: 200px !important;" id="viewer" src="https://demo.6amtech.com/stackfood/public/assets/admin/img/400x400/img2.jpg" alt="delivery-man image">
            </center>
          </div>
          <!-- <div class="flex flex-wrap"> -->
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="latitude"
                >
                Latitude
                </label>
                <input
                  id="latitude"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  bind:value={data.latitude}
                  placeholder="Ex : -94.22213"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="longitude"
                >
                Longitude
                </label>
                <input
                  id="longitude"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  bind:value={data.longitude}
                  placeholder="Ex : 106.22513"/>
              </div>
            </div>
            
            <div style="width: 100%"><iframe width="50%" height="80%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=gujarat%20university+(book%20my%20dine)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/sport-gps/">fitness tracker</a></iframe></div>
          </div>
         
          <!-- <div class="flex flex-wrap"> -->
            <!-- <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="logo">
                  Restaurant Logo
                <small style="color: red"> ( Ratio 1:1 )</small>
                </label>
                <input
                  id="logo"
                  type="file"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  bind:value={data.title}
                  placeholder="Choose File"
                  accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                />
              </div>
            </div> -->
          <!-- </div> -->
          
            
            <hr class="mt-6 border-b-1 border-blueGray-300" />

              <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase" style="margin-left: 2%;">
                Owner Information
              </h6>
              <div class="flex flex-wrap">
                <div class="w-full lg:w-4/12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="firstname"
                    >
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
                <div class="w-full lg:w-4/12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="lastname"
                    >
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
                <div class="w-full lg:w-4/12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="phone"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      bind:value={data.phone}
                      placeholder="EX- 1234567890"
                    />
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
                      placeholder="6+ character reqired"
                    />
                  </div>
                </div>
              </div>
              <hr class="mt-6 border-b-1 border-blueGray-300" />

              <div class="flex flex-wrap">
                <div class="w-full lg:w-12/12 px-4" style="margin-block: 2%;">
                  <div class="relative w-full mb-3">
                    <a 
                use:link
                href="/restaurant/managerestaurant" 
                class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">          
                Back
                </a>
                    <!-- {#if objectId != "addrestaurant" }
                    <button type="submit" on:click|preventDefault={updateRestaurant} class="btn btn-primary">
                      Update Restaurant
                    </button>  
                    {:else}
                    <button type="submit" on:click|preventDefault={addRestaurant} class="btn btn-primary">
                      Add Restaurant
                    </button>
                    {/if} -->
                    <!-- <a 
                     use:link
                     href="/restaurant/managerestaurant" 
                     class="bg-red-400 text-white  active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" style="margin-left:2%;">          
                     SUBMIT
                     on:click|preventDefault={addRestaurant}
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
