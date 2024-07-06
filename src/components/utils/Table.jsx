import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const Table = () => {
  return (

          <section className='w-full overflow-x-auto '>
              <table className=' mt-3'>
                  <thead className='bg-main text-white'>
                      <tr>
                          <th className='w-[35%]'>Description</th>
                      <th className='w-[20%]'>Amount</th>
                      <th className='w-[20%]'>Date</th>
                      <th className='w-[25%]'>Category</th>
                      </tr>
                       </thead>
                  <tbody>
                      <tr>
                          <td>Alfreds Futterkiste</td>
                          <td>Maria Anders</td>
                          <td>Germany</td>
                      <td>Germany</td>
                      <td><HiOutlineDotsVertical /></td>
                      </tr>
                    
                  </tbody>
               
              
              </table>
          </section>
  )
}

export default Table