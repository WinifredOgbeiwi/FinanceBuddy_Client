import React from 'react'

const Headers = ({title, message, onclick}) => {
  return (
      <div className="flex md:flex-row flex-col h-full justify-center gap-5 md:gap-2 md:justify-between items-center">
          <div className=' max-md:text-center'>
              <h1 className="text-4xl mb-2 font-semibold">{title}</h1>
              <p>{message}</p>
          </div>

          <button
              onClick={() => onclick(true)}
              className="border-2 flex flex-col bg-[008000] justify-center items-center px-5 py-3 rounded-[3px] bg-main text-white border-main font-semibold cursor-pointer"
          >
              +  Add Expenses
          </button>
      </div>
  )
}

export default Headers