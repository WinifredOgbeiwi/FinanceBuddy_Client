import React from 'react'
import { IoIosArrowDown, IoIosNotifications } from 'react-icons/io'
import { IMAGES, PATH } from '../constants/util'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='w-full'>
      <nav className='flex w-full'>
        <h3 className='flex-1'>Hi, Winifred</h3>
        <div className='flex justify-center items-center'>
          <IoIosNotifications className='mr-6 text-2xl' />
          <Link to={PATH.SETTINGS} className='flex items-center'>
            <div className='w-10 h-10 mr-3 rounded-full overflow-hidden'><img src={IMAGES.ProfilePic} alt="pic" /></div>
            <h2 className='font-medium'>Winifred Ogbeiwi</h2>
          </Link>

          <IoIosArrowDown className='ml-2 ' />

        </div>
      </nav>

    </header>

  )
}

export default Navbar