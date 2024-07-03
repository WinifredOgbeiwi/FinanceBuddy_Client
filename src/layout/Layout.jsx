import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = () => {
    return (
        <div className='flex '>
            <section className='bg-main w-[70px] md:w-[27%] min-h-screen p-2'>
                <Sidebar />
            </section>

            <section className=' w-full p-2 '>
                <Navbar />
                <Outlet />
            </section>

        </div>
    )
}

export default Layout