import React from 'react'
import Button from './Button'

const Headers = ({ title, message, onclick }) => {
    return (
        <div className="flex md:flex-row flex-col h-full justify-center gap-5 md:gap-2 md:justify-between items-center">
            <div className=' max-md:text-center'>
                <h1 className="text-4xl mb-2 font-semibold">{title}</h1>
                <p>{message}</p>
            </div>

        

            <Button
                text=" +  Add Expenses"
                onClick={()=>onclick(true)}
                specific="short-filled "
            />
        </div>
    )
}

export default Headers