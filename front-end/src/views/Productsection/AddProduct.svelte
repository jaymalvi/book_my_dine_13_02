<script>
    const baseUrl = "http://localhost:4000/product";
    import Tags from "svelte-tags-input";
    import { onMount } from "svelte";
    import { link } from "svelte-routing";
    import { each } from "svelte/internal";
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
    const objectId = pathName.substring(
      pathName.lastIndexOf("/") + 1,
      pathName.length
    );
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
      description: "",
      price: "",
      tex: "",
      textype: "",
      categoryRef: "",
      subcategoryRef: "",
      addonRef: "",
      attributeRef: "",
    };
  
    let categoryData = [];
    let subcategoryData = [];
    let addonData = [];
    let attributeData = [];

    
  
    onMount(async () => {
      console.log("the component has mounted", objectId);
      const res = await fetch(`http://localhost:4000/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      categoryData = await res.json();

      const res1 = await fetch(`http://localhost:4000/subcategory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      subcategoryData = await res1.json();

      const res2 = await fetch(`http://localhost:4000/addon`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      addonData = await res2.json();

      const res3 = await fetch(`http://localhost:4000/attribute`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      attributeData = await res3.json();

      if (objectId != "addproduct") {
        const productData = await fetch(`${baseUrl}/${objectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        data = await productData.json();
        console.log(categoryData);
        console.log(subcategoryData);
        console.log(addonData);
        console.log(attributeData);
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
        console.log(">>>>>>>", formData, files[0]);
      }
      formData.append("data", JSON.stringify(data));
      // formData.push({...data});
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        // headers: [["Content-Type", "multipart/form-data"]],
        body: formData,
        // headers: {"Content-Type": "multipart/form-data"},
      });
      const category = response.json();
      // dispatch("postCreated", restaurant);
      return await category;
    }
    let addProduct = async () => {
      const res = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(JSON.stringify(data));
      const category = res.json();
      // dispatch("postCreated", restaurant);
      return await category;
    };
    //update functionality
    let updateProduct = async () => {
      const res = await fetch(`${baseUrl}/${objectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const product = res.json();
      // dispatch("postCreated", restaurant);
      return await product;
    };
    // =========================================
  
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
          // $('#forum-img').attr('src', e.target.result);
          document.getElementById("viewer").setAttribute("src", e.target.result);
        };
  
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
  
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color ===
    'light'
      ? 'bg-white'
      : 'bg-red-800 text-white'}"
  >
    <div class="block w-full overflow-x-auto">
      <div class="col-sm-12 col-lg-12 mb-3 mb-lg-2">
        <form method="post" enctype="multipart/form-data">
          <h6
            class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"
            style="margin-left: 2%;"
          >
            Add Product
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4">
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
                  placeholder="Product Name"
                  bind:value={data.name}
                />
              </div>
            </div>

            <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="description"
                  >
                Short Description
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    bind:value={data.description}
                    placeholder=""
                  />
                </div>
            </div>

            <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="price"
                  >
                   Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Price"
                    bind:value={data.price}
                  />
                </div>
              </div>

              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="tex"
                  >
                   Tex
                  </label>
                  <input
                    id="tex"
                    type="number"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Tex"
                    bind:value={data.tex}
                  />
                </div>
              </div>

              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="textype"
                  >
                   Tex Type
                  </label>
                  <select
                  id="textype"
                  bind:value={data.categoryRef}
                  name="parent_id"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required=""
                
                >
                 
                    <option>Amount</option>
                    <option>Percentage</option>
               
                </select>
                </div>
              </div>

  
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="name"
                >
                 Category Name
                </label>
                <select
                  id="name"
                  bind:value={data.categoryRef}
                  name="parent_id"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required=""
                
                >
                  {#each categoryData as i}
                    <option value={i._id}>{i.name}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="name"
                  >
                    Sub Category Name
                  </label>
                  <select
                    id="name"
                    bind:value={data.subcategoryRef}
                    name="parent_id"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required=""
                  
                  >
                    {#each subcategoryData as i}
                      <option value={i._id}>{i.name}</option>
                    {/each}
                  </select>
                </div>
              </div>

              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="name"
                  >
                    Addon
                  </label>
                  
                  <select 
                    id="name"
                    allowDrop=false
                    bind:value={data.addonRef}
                    name="parent_id"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required=""
                  
                  >
                    {#each addonData as i}
                      <option value={i._id}>{i.name}</option>
                    {/each}
                  </select>
                </div>
              </div>

              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="logo">
                    Image
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
                </div>

                <div class="w-full lg:w-12/12 px-4">
                    <center>
                      <img style="border: 1px solid; border-radius: 10px;width:200px !important;height: 200px !important;" id="viewer" src="https://demo.6amtech.com/stackfood/public/assets/admin/img/400x400/img2.jpg" alt="delivery-man image">
                    </center>
                  </div>
  
            <hr class="mt-6 border-b-1 border-blueGray-300" />
  
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4" style="margin-block: 2%;">
                <div class="relative w-full mb-3">
                  {#if objectId != "addproduct"}
                    <button
                      type="submit"
                      on:click|preventDefault={updateProduct}
                      class="btn btn-primary"
                    >
                      Update Product
                    </button>
                  {:else}
                    <button
                      type="submit"
                      on:click|preventDefault={addProduct}
                      class="btn btn-primary"
                    >
                      Add Product
                    </button>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  