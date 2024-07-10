import React, { useEffect, useState } from "react";
import Logo from "../utils/Logo";
import Button from "../utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { PATH, IMAGES, passwordConditions } from "../../constants/util";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel, MdErrorOutline } from "react-icons/md";
import axios from "axios";
import { registerUser } from "../../services/slices/registerSlice";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Loader } from "../utils/Loader";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [isFocused, setIsFocused] = useState({
    passwordValidation: false,
    confirmPasswordValidation: false
  });
  const [passwordError, setPasswordError] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    location: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: ""
  });
  const { loading, error } = useSelector((state) => state.register);

  const checkCondition = (regex) => regex.test(userData.password);
  const allConditionsMet = passwordConditions.every((condition) =>
    checkCondition(condition.regex)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        navigate(PATH.LOGIN);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <main className="flex flex-col md:flex-row min-h-screen relative">
      {loading && <Loader/>}
      <section className="w-full md:w-1/2 section">
        <Logo />
        <h1 className="text-3xl md:text-5xl font-bold text-center">WELCOME</h1>
        <h3 className="text-2xl md:text-3xl font-semibold text-center mt-3 mb-5">Register</h3>


        <form onSubmit={handleSubmit} className="flex flex-col sm:grid sm:grid-cols-2 gap-4">

          <div>
            <label htmlFor="firstname" >Firstname</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={userData.firstName}
              required
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              placeholder="Enter your firstname"
              className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
            />
          </div>

          <div>
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={userData.lastName}
              required
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              placeholder="Enter your lastname"
              className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              required
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
            />
          </div>

          <div>
            <label htmlFor="occupation" className="block">Occupation</label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              value={userData.occupation}
              required
              onChange={(e) =>
                setUserData({ ...userData, occupation: e.target.value })
              }
              placeholder="Enter your occupation"
              className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
            />
          </div>

          <div>
            <label htmlFor="location" className="block">Location</label>
            <select
              id="country"
              value={userData.location}
              className={`w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none ${userData.location === '' ? 'text-gray-400' : ''}`}
              onChange={(e) => setUserData({ ...userData, location: e.target.value })}
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          <div className="block col-span-2 relative">
            <label htmlFor="password" className="block">Password</label>
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              id="password"
              value={userData.password}
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              onFocus={() => setIsFocused({ ...isFocused, passwordValidation: true })}
              placeholder="• • • • • • • •"
              className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
            />
            <div onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })} className="absolute top-[42px] right-2 cursor-pointer">
              {showPassword.password ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>

            {isFocused.passwordValidation && !allConditionsMet && (
              <div className="mt-2 col-span-2">
                {passwordConditions.map((condition, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    {checkCondition(condition.regex) ? (
                      <IoMdCheckmarkCircle className="text-green-500 text-md" />
                    ) : (
                      <MdCancel className="text-red-500 text-md" />
                    )}
                    <p className={`${checkCondition(condition.regex) ? 'text-green-500' : 'text-red-500'} leading-5 text-xs`}>
                      {condition.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="block col-span-2 relative">
            <label htmlFor="confirm_password" className="block">Confirm Password</label>
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              value={userData.confirmPassword}
              required
              onChange={(e) => {
                setUserData({ ...userData, confirmPassword: e.target.value });
                if (e.target.value === userData.password) {
                  setPasswordError("");
                } else {
                  setPasswordError("Passwords do not match");
                }
              }}
              onFocus={() => {
                setIsFocused({ ...isFocused, confirmPasswordValidation: true });
                if (userData.password !== userData.confirmPassword) {
                  setPasswordError("Passwords do not match");
                }
              }}
              placeholder="• • • • • • • •"
              className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
            />
            <div onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })} className="absolute top-[42px] right-2 cursor-pointer">
              {showPassword.confirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
            {isFocused.confirmPasswordValidation && passwordError && (
              <div className="mt-2 text-red-500 text-xs">
                {passwordError}
              </div>
            )}
          </div>

          <div className="w-full flex items-center justify-between mt-4 col-span-2">
            <div>
              <input type="checkbox" name="remember" id="remember" className="mr-2" />
              <label htmlFor="remember" className=" max-[330px]:text-sm">Remember me</label>
            </div>
            <Link to={PATH.RESETPASSWORD} className="hover:underline max-[330px]:text-sm">
              Forget Password
            </Link>
          </div>
          {error && (
            <div className="col-span-2 border-2 border-red-600 bg-red-200 backdrop-blur-3xl flex items-center gap-2 rounded-[3px] pl-2 py-[2px]">
              <MdErrorOutline size={20} />
              <p className="text-sm py-2">
                Email already exist! Please try again!
              </p>
            </div>
          )}
          <Button text="Register" type="submit" specific="filled_button col-span-2" />
        </form>
        <p className="max-[330px]:text-sm mt-3">
          Already Have an Account?
          <Link to={PATH.LOGIN} className="hover:underline ml-1">
            Login now
          </Link>
        </p>
      </section>

      <section className="w-1/2 bg-main relative hidden md:block">
        <img className="w-80 absolute right-0" src={IMAGES.BgCircle} alt="" />
        <div className="w-4/5 my-0 mx-auto flex justify-center items-center h-screen" >
          <img src={IMAGES.LogoWhite} alt="Logo" className="w-full " />
        </div>
      </section>
    </main>
  );
};

export default Register;
