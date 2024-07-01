import toast from "react-hot-toast";

/** validate login page email */
export async function emailValidate(values) {
  const errors = emailVerify({}, values);
  return errors;
}

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

/** validate email */
function emailVerify(errors = {}, values) {
  if (!values.email) {
    errors.email = "Email Required!";
    toast.error("Email Required!");
  } else if (values.email.includes(" ")) {
    errors.email = "Invalid Email!";
    toast.error("Invalid Email!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email!";
    toast.error("Invalid Email!");
  }
  return errors;
}

/** validate password */
function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = "Password Required!";
    toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    errors.password = "Wrong Password...!";
    toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters long";
    toast.error("Password must be more than 4 characters long");
  } else if (!specialChars.test(values.password)) {
    errors.password = "Password must have special character";
    toast.error("Password must have special character");
  }

  return errors;
}
