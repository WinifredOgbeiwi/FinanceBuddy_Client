import React from 'react'
import { IMAGES } from '../../constants/util'

export const Loader = () => {
    return (
        <div className='bg-slate-100 bg-opacity-95 flex items-center justify-center w-screen h-full absolute z-50'>
            <img src={IMAGES.Loader} alt="loader" />
        </div>
    )
}
export const InlineLoader = () => {
    return (
        <div className=' flex items-center justify-center '>
            <img src={IMAGES.InlineLoader} alt="loader" width="37px"/>
        </div>
    )
}
