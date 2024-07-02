import React from 'react';
import { IMAGES, PATH, sidebar } from '../constants/util';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';

const Sidebar = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <div className='flex flex-col flex-1 items-center sm:items-start'>
        <div className=' w-full flex justify-center mb-4'>
          <img src={IMAGES.LogoWhite} alt="" className='w-16' />
        </div>

        <div className='flex flex-col gap-9 mt-4'>
          {sidebar.map(({ id, title, icon: Icon, link }) => (
            <Link key={id} to={link} className='flex items-center gap-2 text-white'>
              <Icon className='text-2xl sm:text-xl' />
              <span className='hidden sm:block font-medium'>{title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className='flex flex-col items-center sm:items-start gap-4 pb-4'>
        <Link to={PATH.SETTINGS} className='flex items-center gap-2 text-white'>
          <IoSettingsOutline className='text-2xl sm:text-xl' />
          <span className='hidden sm:block font-medium'>Setting</span>
        </Link>
        <Link to={PATH.LOGIN} className='flex items-center gap-2 text-white'>
          <CiLogout className='text-2xl sm:text-xl' />
          <span className='hidden sm:block font-medium'>Log out</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
