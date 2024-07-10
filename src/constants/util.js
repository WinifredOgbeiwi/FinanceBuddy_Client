import Logo from "../assets/images/logo.png";
import LogoWhite from "../assets/images/logo_white.png";
import BgCircle from "../assets/images/bgcircle.png";
import NoDataImg from "../assets/images/no-data.png";
import ProfilePic from "../assets/images/sample_pic.jpg";
import Error500 from "../assets/images/500-error.png";
import Loader from "../assets/images/loaderLogo.gif";
import InlineLoader from "../assets/images/inline-loader.gif";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
export const PATH = {
  DEFAULT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  RESETPASSWORD: "/reset-password",

  //   protected path
  DASHBOARD: "/dashboard",
  INCOME: "/income",
  EXPENSES: "/expenses",
  SAVINGS: "/savings",
  SETTINGS: "/settings",
};

export const IMAGES = {
  Logo,
  BgCircle,
  LogoWhite,
  Loader,
  Error500,
  NoDataImg,
  ProfilePic,
  InlineLoader,
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

export const sidebar = [
  {
    id: 1,
    title: "Dashboard",
    icon: MdOutlineDashboardCustomize,
    link: PATH.DASHBOARD,
  },
  {
    id: 2,
    title: "Expenses",
    icon: GiPayMoney,
    link: PATH.EXPENSES,
  },
  {
    id: 3,
    title: "Income",
    icon: GiReceiveMoney,
    link: PATH.INCOME,
  },
  {
    id: 4,
    title: "Savings",
    icon: BsCashCoin,
    link: PATH.SAVINGS,
  },
];
