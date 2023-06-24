export default (error: any) => {
  //? duplicate error code  signup page errors
  // console.log("first", error);
  /*   Object.keys(error.errors).forEach((field) => {
    const validationError = error.errors[field];
    console.log(`Field: ${field}`);
    console.log(`Message: ${validationError.message}`);
    console.log(`Type: ${validationError.name}`);
    console.log("---");
  }); */

  /*  if (error.code === 11000) {
    return "400=username or email already exists";
  }  */

  console.log(error);

  if (error.code === 11000) {
    return "400=username already exists";
  }
  // Object.keys(error.errors).map((k) => console.log(k));
  if (error.message.includes("Blog validation failed")) {
    let message = "";
    Object.keys(error.errors).forEach((field) => {
      const validationError = error.errors[field];

      message = `${field} ${validationError.message}`;
    });

    return `401=${message}`;
  }

  return "500=something went wrong! please try again";
};
