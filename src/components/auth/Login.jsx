import React, { useState } from "react";
import Logo from "../utils/Logo";
import Button from "../utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { PATH, IMAGES } from "../../constants/util";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/slices/authSlice";
import { MdErrorOutline } from "react-icons/md";
import { Loader } from "../utils/Loader";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userDetails))
      .unwrap()
      .then(() => {
        navigate(PATH.DASHBOARD);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen relative">
      {loading && <Loader />}
      <section className="w-full md:w-1/2 section">
        <Logo />
        <h1 className="text-3xl md:text-5xl font-bold text-center">WELCOME BACK</h1>
        <h3 className="text-2xl md:text-3xl font-semibold text-center mt-3 mb-5">Login</h3>
        {error && (
          <div className="border-2 border-red-600 bg-red-200 backdrop-blur-3xl flex items-center gap-2 rounded-[3px] my-2 pl-2 py-[2px]">
            <MdErrorOutline size={20} />
            <p className="text-sm">
              Your email or password is incorrect. <br />
              Please try again!
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            placeholder="Enter your email"
            className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
          />

          <label htmlFor="password" className="mt-6">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            placeholder="• • • • • • • •"
            className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
          />
         
          <div className="flex justify-between mt-4">
            <div>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="mr-2"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to={PATH.RESETPASSWORD} className="hover:underline">
              Forget Password
            </Link>
          </div>
          <Button
            text="Login"
            type="submit"
            specific="filled_button"
          />
        </form>
        <p>
          Don't have an account?
          <Link to={PATH.REGISTER} className="hover:underline ml-1">
            Register now
          </Link>
        </p>
      </section>

      <section className="w-1/2 bg-main relative hidden md:block">
        <img className="w-80 absolute right-0" src={IMAGES.BgCircle} alt="" />
        <div style={{ width: "80%", margin: "0 auto" }}>
          <img src={IMAGES.LogoWhite} alt="Logo" className="w-full" />
        </div>
      </section>
    </main>
  );
};

export default Login;
