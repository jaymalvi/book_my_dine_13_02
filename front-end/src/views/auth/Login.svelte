<script>
  const baseUrl = "http://localhost:4000/login";
  import { link } from "svelte-routing";
  import { navigate } from "svelte-routing";

  // core components
  const github = "../assets/img/github.svg";
  const google = "../assets/img/google.svg";
  export let location;

  let data = {
    email: "",
    password: "",
  };
   let error={
    email: "",
    password: "",
   };



  // async function submitForm(event) {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   delete data._id;
  //   // data.isapproved= false;
  //   if (files && files.length > 0) {
  //     formData.append("file", files[0]);
  //     console.log(">>>>>>>", formData, files[0])
  //   }
  //   formData.append("data", JSON.stringify(data));
  //   // formData.push({...data});
  //   const response = await fetch(`${baseUrl}`, {
  //     method: "POST",
  //     // headers: [["Content-Type", "multipart/form-data"]],
  //     body: formData,
  //     // headers: {"Content-Type": "multipart/form-data"},
  //   });
  //   const restaurant = response.json();
  //   // dispatch("postCreated", restaurant);
  //   return await restaurant;
  // }

  let addUser = async () => {
    // data.file = files;
    const res = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      console.log(result);

      if (result && result.error) {
        console.log(result.message);
        error.email = result.message.email && result.message.email[0] && result.message.email[0] ? result.message.email[0] : "";
        error.password = result.message.password && result.message.password[0] && result.message.password[0] ? result.message.password[0] : "";
      }

      if (result.error === "Email_not_found") {
        error.email = "User doesn't exist!";
        error.password = ""
      }

      if (result && result.token) {
        // 
        const data = await result;
        console.log("here...........", data);
        localStorage.setItem("loginData", JSON.stringify(data));
        navigate("/admin/dashboard", { replace: true });
        // setContext("loginData", data);
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>", getContext("loginData"));
      }
      // dispatch("postCreated", restaurant);
      return await result;
  }

</script>

<div class="container mx-auto px-4 h-full">
  <div class="flex content-center items-center justify-center h-full">
    <div class="w-full lg:w-4/12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
      >
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="text-center mb-3">
            <h6 class="text-blueGray-500 text-sm font-bold">
              Sign in with
            </h6>
          </div>
          <div class="btn-wrapper text-center">
            <button
              class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." class="w-5 mr-1" src="{github}" />
              Github
            </button>
            <button
              class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." class="w-5 mr-1" src="{google}" />
              Google
            </button>
          </div>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div class="text-blueGray-400 text-center mb-3 font-bold">
            <small>Or sign in with credentials</small>
          </div>
          <form method="post">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-email"
              >
                Email
              </label>
              <input
                id="grid-email"
                type="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Email"
                bind:value={data.email}
              />
              <p style="color: red">{error.email}</p>
            </div>

            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <input
                id="grid-password"
                type="password"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
                bind:value={data.password}
              />
              <p style="color: red">{error.password}</p>
            </div>
            <div>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  id="customCheckLogin"
                  type="checkbox"
                  class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
                <span class="ml-2 text-sm font-semibold text-blueGray-600">
                  Remember me
                </span>
              </label>
            </div>

            <div class="text-center mt-6">
              <a use:link href="/admin/dashboard" class="text-blueGray-200">
              <button
                class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="button"
                on:click|preventDefault={addUser}
              >
                Sign In
              </button>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div class="flex flex-wrap mt-6 relative">
        <div class="w-1/2">
          <a href="#pablo" on:click={(e) => e.preventDefault()} class="text-blueGray-200">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="w-1/2 text-right">
          <a use:link href="/auth/register" class="text-blueGray-200">
            <small>Create new account</small>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
