import React from 'react'
import { IMAGES, PATH } from '../../constants/util'
import Button from './Button'
import { Link } from 'react-router-dom'

const Error404Page = () => {
    return (
        <div className=" w-screen h-screen flex justify-center items-center flex-col " >
            <img src={IMAGES.Error404} alt="" className="w-[30rem]" />
            <p className='font-medium'>Sorry, the page you are looking for does not exist. </p>
            <Link to={PATH.LOGIN} className='w-36 mt-2'>
                <Button text="Go back" specific="filled_button" />
            </Link>

        </div>
    )
}

export default Error404Page