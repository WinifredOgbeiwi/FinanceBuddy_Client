import React, { useState } from 'react';
import { IMAGES, PATH, sidebar } from '../constants/util';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';

const Sidebar = () => {

  return (
    <div className=' flex flex-col h-screen justify-between  items-center md:items-start fixed text-white'>
      <div className='flex flex-col flex-1'>
        <div className=' w-full flex justify-center items-center mb-4'>
          <img src={IMAGES.LogoWhite} alt="" className=' w-[50px] md:w-20 ' />
        </div>

        <div className='flex flex-col gap-9 mt-4 items-center md:items-start'>
          {sidebar.map(({ id, title, icon: Icon, link }) => (
            <Link key={id} to={link} className='flex items-center gap-2 text-white max-[807px]:text-sm'>
              <Icon className='text-2xl md:text-xl' />
              <span className='hidden md:block font-medium '>{title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className='flex flex-col items-center md:items-start gap-4 pb-4'>
        <Link to={PATH.SETTINGS} className='flex items-center gap-2 text-white'>
          <IoSettingsOutline className='text-2xl md:text-xl' />
          <span className='hidden md:block font-medium'>Setting</span>
        </Link>
        <Link to={PATH.LOGIN} className='flex items-center gap-2 text-white'>
          <CiLogout className='text-2xl md:text-xl' />
          <span className='hidden md:block font-medium'>Log out</span>
        </Link>
    
      </div>
    </div>
  );
};

export default Sidebar;
