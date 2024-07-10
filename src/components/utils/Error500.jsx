import React from 'react'
import { IMAGES } from '../../constants/util'

const Error500 = () => {
    return (
        <div className=" w-full h-full flex justify-center items-center flex-col mt-5 mb-3" >
            <img src={IMAGES.Error500} alt="" className="w-[30rem]" />
           
        </div>
    )
}

export default Error500