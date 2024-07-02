import React from 'react'
import { IMAGES } from '../../constants/util'

const Loader = () => {
    return (
        <div className='bg-slate-100 bg-opacity-90 flex items-center justify-center w-screen h-full absolute z-50'>
            <img src={IMAGES.Loader} alt="loader" />
        </div>
    )
}

export default Loader