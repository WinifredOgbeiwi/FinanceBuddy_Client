import Logo from '../assets/images/logo.png'
import LogoWhite from "../assets/images/logo-white.png";
import BgCircle from "../assets/images/bgcircle.png";
import Loader from "../assets/images/loaderLogo.gif";
export const PATH = {
  DEFAULT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  RESETPASSWORD: "/reset-password",

  //   protected path
  DASHBOARD:"/dashboard",
  INCOME:"/income",
  EXPENSES:"/expenses",
  SAVINGS:"/savings",
  SETTINGS:"/settings"

};

export const IMAGES = {
  Logo,
  BgCircle,
  LogoWhite,
  Loader,
};


  export const passwordConditions = [
    { regex: /.{8,}/, message: "Must be at least 8 characters" },
    { regex: /\d/, message: "Must contain one number" },
    { regex: /[A-Z]/, message: "Must contain one alphabet in uppercase" },
    { regex: /[a-z]/, message: "Must contain one alphabet in lowercase" },
    {
      regex: /[!@#$%^&*]/,
      message: "Must contain one special character (@, #, &, % etc)",
    },
  ];

