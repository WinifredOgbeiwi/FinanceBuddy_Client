



// import React, { useEffect, useState } from "react";
// import Button from "../utils/Button";
// import { useNavigate } from "react-router-dom";
// import { PATH, passwordConditions } from "../../constants/util";
// import { useDispatch, useSelector } from "react-redux";
// import { MdCancel } from "react-icons/md";
// import Loader from "../utils/Loader";
// import axios from "axios";
// import { registerUser } from "../../services/slices/registerSlice";
// import { IoMdCheckmarkCircle } from "react-icons/io";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { fetchUserDetails } from "../../services/slices/userSlice";
// import CountrySelect from "../utils/CountrySelect";

// const Settings = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [countries, setCountries] = useState([]);
//   const [showPassword, setShowPassword] = useState({
//     password: false,
//     confirmPassword: false,
//     oldPassword: false
//   });
//   const [isFocused, setIsFocused] = useState({
//     passwordValidation: false,
//     confirmPasswordValidation: false,
//     oldPasswordValidation: false
//   });
//   const [passwordError, setPasswordError] = useState("");
//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     occupation: "",
//     location: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     oldPassword: ""
//   });
//   const { loading, error } = useSelector((state) => state.register);

//   const checkCondition = (regex) => regex.test(userData.password);
//   const allConditionsMet = passwordConditions.every((condition) =>
//     checkCondition(condition.regex)
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userData.password !== userData.confirmPassword) {
//       setPasswordError("Passwords do not match");
//       return;
//     }
//     dispatch(registerUser(userData))
//       .unwrap()
//       .then(() => {
//         navigate(PATH.LOGIN);
//       })
//       .catch((error) => {
//         console.error("Registration failed:", error);
//       });
//   };

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const sortedCountries = response.data.sort((a, b) =>
//           a.name.common.localeCompare(b.name.common)
//         );
//         setCountries(sortedCountries);
//       } catch (error) {
//         console.error('Error fetching countries:', error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const auth = useSelector((state) => state.auth);
//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     if (auth.user && auth.user._id) {
//       dispatch(fetchUserDetails(auth.user._id));
//     }
//   }, [dispatch, auth.user]);

//   const userDetails = user.userDetails


//   if (user.error) return <p>Error: {user.error}</p>;

//   return (
//     <main className="scroll-auto">
//       {user.loading && <Loader />}
//       <h1 className='shadow p-4 bg-white text-3xl font-semibold'>Account Settings</h1>
//       <div className='shadow p-8 mt-8 bg-white '>
//         <h2 className='text-2xl font-semibold mb-3'>Personal Info</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//           <div>
//             <label htmlFor="firstname" className="block">Firstname</label>
//             <input
//               type="text"
//               name="firstname"
//               id="firstname"
//               value={userDetails.firstName}
//               onChange={(e) =>
//                 setUserData({ ...userData, firstName: e.target.value })
//               }
//               placeholder="Enter your firstname"
//               className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
//             />
//           </div>

//           <div>
//             <label htmlFor="lastname" className="block">Lastname</label>
//             <input
//               type="text"
//               name="lastname"
//               id="lastname"
//               value={userDetails.lastName}
//               onChange={(e) =>
//                 setUserData({ ...userData, lastName: e.target.value })
//               }
//               placeholder="Enter your lastname"
//               className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
//             />
//           </div>

//           <div className="col-span-2">
//             <label htmlFor="email" className="block">Email</label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={userDetails.email}
//               readOnly
//               onChange={(e) =>
//                 setUserData({ ...userData, email: e.target.value })
//               }
//               placeholder="Enter your email"
//               className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none text-gray-400"
//             />
//           </div>

//           <div>
//             <label htmlFor="occupation" className="block">Occupation</label>
//             <input
//               type="text"
//               name="occupation"
//               id="occupation"
//               value={userDetails.occupation}
//               required
//               onChange={(e) =>
//                 setUserData({ ...userData, occupation: e.target.value })
//               }
//               placeholder="Enter your occupation"
//               className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
//             />
//           </div>


//           <CountrySelect value={userDetails.location} onChange={(e) => setUserData({ ...userData, location: e.target.value })} className={userDetails.location === null ? 'text-gray-400' : ''} />

//           <hr className="border-2 border-main col-span-2 my-8" />

//           <h2 className='text-2xl col-span-2 font-semibold mb-3'>Change Password </h2>
//           <div className="block col-span-2 relative">
//             <label htmlFor="password" className="block">Old Password</label>
//             <input
//               type={showPassword.oldPassword ? "text" : "password"}
//               name="password"
//               id="password"
//               value={userData.oldPassword}
//               required
//               onChange={(e) =>
//                 setUserData({ ...userData, oldPassword: e.target.value })
//               }
//               onFocus={() => setIsFocused({ ...isFocused, oldPasswordValidation: true })}
//               placeholder="• • • • • • • •"
//               className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
//             />
//             <div onClick={() => setShowPassword({ ...showPassword, oldPassword: !showPassword.password })} className="absolute top-[42px] right-2 cursor-pointer">
//               {showPassword.oldPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//             </div>

//           </div>

//           <div className="block col-span-2 relative">
//             <label htmlFor="password" className="block">New Password</label>
//             <input
//               type={showPassword.password ? "text" : "password"}
//               name="password"
//               id="password"
//               value={userData.password}
//               required
//               onChange={(e) =>
//                 setUserData({ ...userData, password: e.target.value })
//               }
//               onFocus={() => setIsFocused({ ...isFocused, passwordValidation: true })}
//               placeholder="• • • • • • • •"
//               className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
//             />
//             <div onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })} className="absolute top-[42px] right-2 cursor-pointer">
//               {showPassword.password ? <AiFillEyeInvisible /> : <AiFillEye />}
//             </div>

//             {isFocused.passwordValidation && !allConditionsMet && (
//               <div className="mt-2 col-span-2">
//                 {passwordConditions.map((condition, index) => (
//                   <div key={index} className="flex gap-2 items-center">
//                     {checkCondition(condition.regex) ? (
//                       <IoMdCheckmarkCircle className="text-green-500 text-md" />
//                     ) : (
//                       <MdCancel className="text-red-500 text-md" />
//                     )}
//                     <p className={`${checkCondition(condition.regex) ? 'text-green-500' : 'text-red-500'} leading-5 text-xs`}>
//                       {condition.message}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="block col-span-2 relative">
//             <label htmlFor="confirm_password" className="block">Confirm Password</label>
//             <input
//               type={showPassword.confirmPassword ? "text" : "password"}
//               name="confirm_password"
//               id="confirm_password"
//               value={userData.confirmPassword}
//               required
//               onChange={(e) => {
//                 setUserData({ ...userData, confirmPassword: e.target.value });
//                 if (e.target.value === userData.password) {
//                   setPasswordError("");
//                 } else {
//                   setPasswordError("Passwords do not match");
//                 }
//               }}
//               onFocus={() => {
//                 setIsFocused({ ...isFocused, confirmPasswordValidation: true });
//                 if (userData.password !== userData.confirmPassword) {
//                   setPasswordError("Passwords do not match");
//                 }
//               }}
//               placeholder="• • • • • • • •"
//               className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
//             />
//             <div onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })} className="absolute top-[42px] right-2 cursor-pointer">
//               {showPassword.confirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//             </div>
//             {isFocused.confirmPasswordValidation && passwordError && (
//               <div className="mt-2 text-red-500 text-xs">
//                 {passwordError}
//               </div>
//             )}
//           </div>



//           <Button text="Register" type="submit" specific="filled_button col-span-2" />
//         </form>
//       </div>


//     </main>
//   );
// };

// export default Settings;