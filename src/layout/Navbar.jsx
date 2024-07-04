import React, { useEffect } from 'react'
import { IoIosArrowDown, IoIosNotifications } from 'react-icons/io'
import { IMAGES, PATH } from '../constants/util'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../services/slices/userSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (auth.user && auth.user._id) {
      dispatch(fetchUserDetails(auth.user._id));
    }
  }, [dispatch, auth.user]);

  if (!user.userDetails) {
    return null; 
  }
  return (
    <header className='w-full'>
      <nav className='flex w-full'>
        <h3 className='flex-1'>Hi, {user.userDetails.firstName}</h3>
        <div className='flex justify-center items-center'>
          <IoIosNotifications className='mr-6 text-2xl' />
          <Link to={PATH.SETTINGS} className='flex items-center'>
            <div className='w-10 h-10 mr-3 rounded-full overflow-hidden'><img src={IMAGES.ProfilePic} alt="pic" /></div>
            <h2 className='font-medium capitalize'>{user.userDetails.firstName} {user.userDetails.lastName}</h2>
          </Link>

          <IoIosArrowDown className='ml-2 ' />

        </div>
      </nav>

    </header>

  )
}

export default Navbar