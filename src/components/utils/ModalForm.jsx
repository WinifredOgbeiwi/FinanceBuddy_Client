import React from 'react'
import { InlineLoader } from './Loader'
import Button from './Button'

const ModalForm = ({ handleSubmit, stateData, setStateData, loading }) => {
  return (
      <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="amount">Amount</label>
          <input
              type="number"
              name="amount"
              id="amount"
              required
              value={stateData.amount}
              onChange={(e) =>
                  setStateData({ ...stateData, amount: e.target.value })
              }
              placeholder="Enter the amount"
              className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
          />

          <label className="mt-4" htmlFor="date">
              Date
          </label>
          <input
              type="date"
              name="date"
              id="date"
              required
              value={stateData.date}
              onChange={(e) =>
                  setStateData({ ...stateData, date: e.target.value })
              }
              placeholder="Enter the date"
              className="border-2 placeholder:text-gray-400 rounded-[3px] p-2 mt-[3px] border-main outline-none"
          />
          <label className="mt-4" htmlFor="category">
              Category
          </label>
          <input
              type="text"
              name="category"
              id="category"
              required
              value={stateData.category}
              onChange={(e) =>
                  setStateData({ ...stateData, category: e.target.value })
              }
              placeholder="Enter category"
              className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none "
          />
          <label className="mt-4" htmlFor="description">
              Description
          </label>
          <textarea
              name="description"
              id="description"
              value={stateData.description}
              onChange={(e) =>
                  setStateData({ ...stateData, description: e.target.value })
              }
              className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none mb-4"
              placeholder="Enter description"
          ></textarea>
          <Button
              text={loading ? <InlineLoader /> : "Add"}
              type="submit"
              specific="filled_button"
          />
      </form>
  )
}

export default ModalForm