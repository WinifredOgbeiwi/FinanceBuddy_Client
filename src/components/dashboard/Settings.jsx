
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import { editUserDetails } from "../../services/slices/editUserSlice";
import { PATH, passwordConditions } from "../../constants/util";
import { fetchUserDetails } from "../../services/slices/userSlice";
import CountrySelect from "../utils/CountrySelect";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { Loader } from "../utils/Loader";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.user);
  const { user, loading, error } = useSelector((state) => state.editUser);
  const userDelts = userDetails.userDetails;


  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    location: "",
    image: "",
    oldPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isFocused, setIsFocused] = useState({
    oldPasswordValidation: false,
    newPasswordValidation: false,
    confirmPasswordValidation: false,
  });
  const [passwordError, setPasswordError] = useState("");

  const checkCondition = (regex) => regex.test(userData.newPassword);
  const allConditionsMet = passwordConditions.every((condition) =>
    checkCondition(condition.regex)
  );

  useEffect(() => {
    if (auth.user && auth.user._id) {
      dispatch(fetchUserDetails(auth.user._id));
    }
  }, [dispatch, auth.user]);

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        occupation: user.occupation || "",
        location: user.location || "",
        email: user.email || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth.user && auth.user._id) {
      const updatedUserData = { ...userData };
      if (selectedFile) {
        updatedUserData.image = selectedFile;
      }
      dispatch(
        editUserDetails({ id: auth.user._id, userData: updatedUserData })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchUserDetails(auth.user._id));
          navigate(PATH.SETTINGS);
        })
        .catch((error) => {
          console.error("Edit profile failed:", error);
        });
    }
  };

  console.log("selected file", selectedFile);
  return (
    <main className="scroll-auto">
      {loading && <Loader />}
      <section className="w-full section">
        <h1 className="shadow p-4 bg-white text-3xl font-semibold">
          Account Settings
        </h1>
        {error && (
          <div className="col-span-2 border-2 border-red-600 bg-red-200 backdrop-blur-3xl flex items-center gap-2 rounded-[3px] pl-2 py-[2px] mt-4">
            <p className="text-sm py-2">{error.error}</p>
          </div>
        )}
        <div className="shadow p-8 mt-8 bg-white ">
          <h2 className="text-2xl font-semibold mb-3">Personal Info</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col justify-center items-center ">
              <div className="w-40 h-40 mr-3 rounded-full overflow-hidden border-2 ">
                {userData.image ? (
                  <img
                    src={userData.image}
                    alt="pic"
                    className=" object-cover w-full "
                    style={{ objectPosition: "center center" }}
                  />
                ) : (
                  <div className="flex items-center justify-center bg-main font-bold text-white rounded-full w-full h-full text-7xl uppercase">
                    {userDelts.firstName.charAt(0)}
                    {userDelts.lastName.charAt(0)}
                  </div>
                )}
              </div>

              <label
                htmlFor="image"
                className="border-2 rounded-[3px] px-2 mt-3 border-main bg-main text-white outline-none"
              >
                Choose file
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                    setUserData({
                      ...userData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
              </label>
            </div>

            {/* <div className='col-span-2 flex flex-col justify-center items-center '>
              <div className='w-40 h40 mr-3 rounded-full overflow-hidden'><img src={userData.image ? userData.image : IMAGES.ProfilePic} alt="pic" />
              </div>
              <label htmlFor="image" className='border-2 rounded-[3px] px-2 mt-3 border-main bg-main text-white outline-none'>Choose file
                <input type="file" name="image" id="image"
                  className='hidden'
                  value={userData.image}
                  onChange={(e) => {
                    setUserData({ ...userData, image: e.target.files[0] })
                    console.log(userData.image)
                  }} />
              </label>

            </div> */}

            <div>
              <label htmlFor="firstname" className="block">
                Firstname
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                placeholder={userDelts.firstName}
                className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none placeholder:text-black"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block">
                Lastname
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                placeholder={userDelts.lastName}
                className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none placeholder:text-black"
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                readOnly
                placeholder={userDelts.email}
                className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="occupation" className="block">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                value={userData.occupation}
                onChange={(e) =>
                  setUserData({ ...userData, occupation: e.target.value })
                }
                placeholder={
                  userDelts.occupation
                    ? userDelts.occupation
                    : "Enter occupation"
                }
                className={`w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none ${userDelts.occupation ? "placeholder:text-black" : ""
                  }`}
              />
            </div>
            <CountrySelect
              value={userData.location}
              onChange={(e) =>
                setUserData({ ...userData, location: e.target.value })
              }
              className={
                userData.location === null ? "text-gray-400" : "text-gray-800"
              }
              defaultText={
                userDelts.location ? userDelts.location : "Select a country"
              }
            />

            <hr className="border-2 border-main col-span-2 my-8" />
            <h2 className="text-2xl col-span-2 font-semibold mb-3">
              Change Password{" "}
            </h2>

            <div className="col-span-2 relative">
              <label htmlFor="firstname" className="block">
                Old Password
              </label>
              <input
                type={showPassword.oldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                value={userData.oldPassword}
                onChange={(e) =>
                  setUserData({ ...userData, oldPassword: e.target.value })
                }
                onFocus={() =>
                  setIsFocused({ ...isFocused, oldPasswordValidation: true })
                }
                placeholder="• • • • • • • •"
                className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none  "
              />
              <div
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    oldPassword: !showPassword.oldPassword,
                  })
                }
                className="absolute top-[42px] right-2 cursor-pointer"
              >
                {showPassword.oldPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </div>
            </div>

            <div className="col-span-2 relative">
              <label htmlFor="firstname" className="block">
                New Password
              </label>
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={userData.newPassword}
                onChange={(e) =>
                  setUserData({ ...userData, newPassword: e.target.value })
                }
                onFocus={() =>
                  setIsFocused({ ...isFocused, newPasswordValidation: true })
                }
                placeholder="• • • • • • • •"
                className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none  "
              />
              <div
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    newPassword: !showPassword.newPassword,
                  })
                }
                className="absolute top-[42px] right-2 cursor-pointer"
              >
                {showPassword.newPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </div>
              {isFocused.newPasswordValidation && !allConditionsMet && (
                <div className="mt-2 col-span-2">
                  {passwordConditions.map((condition, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      {checkCondition(condition.regex) ? (
                        <IoMdCheckmarkCircle className="text-green-500 text-md" />
                      ) : (
                        <MdCancel className="text-red-500 text-md" />
                      )}
                      <p
                        className={`${checkCondition(condition.regex)
                            ? "text-green-500"
                            : "text-red-500"
                          } leading-5 text-xs`}
                      >
                        {condition.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-2 relative">
              <label htmlFor="firstname" className="block">
                Confirm Password
              </label>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={userData.confirmPassword}
                onChange={(e) => {
                  setUserData({ ...userData, confirmPassword: e.target.value });
                  if (e.target.value === userData.newPassword) {
                    setPasswordError("");
                  } else {
                    setPasswordError("Passwords do not match");
                  }
                }}
                onFocus={() => {
                  setIsFocused({
                    ...isFocused,
                    confirmPasswordValidation: true,
                  });
                  if (userData.newPassword !== userData.confirmPassword) {
                    setPasswordError("Passwords do not match");
                  }
                }}
                placeholder="• • • • • • • •"
                className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none  "
              />
              <div
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
                className="absolute top-[42px] right-2 cursor-pointer"
              >
                {showPassword.confirmPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </div>
            </div>

            {isFocused.confirmPasswordValidation && passwordError && (
              <div className=" text-red-500 text-xs">{passwordError}</div>
            )}

            <div className="col-span-2">
              <Button
                text="Save Changes"
                type="submit"
                specific="filled_button"
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Settings;
