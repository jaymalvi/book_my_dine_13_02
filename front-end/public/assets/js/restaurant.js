$(() => {
    $("#RestaurantForm").validate({
      rules: {
        name: {
          required: true,
        },
        answer: {
          required: true,
        },
        order: {
          required: true,
        },
      },
      messages: {
        name: {
          required: 'Restaurant Name is required',
        },
        answer: {
          required: 'Answer is required',
        },
        order: {
          required: 'Order is required',
        },
      },
      errorElement: "span",
      errorLabelContainer: ".error",
      submitHandler: (form) => {
        form.submit()
      },
    })
  })