import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Income = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error} = useSelector((state) => state.addIncome)
  
  return (
    <main>
      {/* header */}
      <div className="mt-2">
        <div className='w-full h-52 bg-main mb-2 '></div>
        <div className='flex justify-between items-start'>
          <div className='border-2 flex flex-col justify-center  items-center py-4 px-10'>
            <h4>Total Balance</h4>
            <h2>$4000</h2>
          </div>
          <div className='border-2 flex flex-col bg-[008000] justify-center items-center px-5 py-3'>
            Add Income
          </div>
        </div>

      </div>
    </main>
  )
}

export default Income