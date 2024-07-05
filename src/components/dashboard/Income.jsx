import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Modal from '../utils/Modal';

const Income = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.addIncome)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <main>

      <div className="mt-2">
        {/* header */}
        <div className='w-full h-52 bg-main mb-2 '></div>

        <div className='flex justify-between items-start'>
          <div className='border-2 flex flex-col justify-center  items-center py-4 px-10'>
            <h4>Total Balance</h4>
            <h2>$4000</h2>
          </div>
          <div onClick={() => setModalIsOpen(true)} className='border-2 flex flex-col bg-[008000] justify-center items-center px-5 py-3'>
            Add Income
          </div>
          <Modal isOpen={modalIsOpen} isClose={setModalIsOpen} title="Add Income">
   
          </Modal>
        </div>

      </div>
    </main>
  )
}

export default Income