import React from 'react'
import { IMAGES } from '../../constants/util'

const NoRecords = () => {
    return (
        <div className=" w-full h-full flex  justify-center items-center flex-col mt-5 mb-3" >
            <img src={IMAGES.NoDataImg} alt="" className="w-96" />
            <p>No records to display</p>
        </div>
    )
}

export default NoRecords