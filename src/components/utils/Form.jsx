import React from 'react'

const Form = () => {
  return (
         <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                required
                value={incomeData.amount}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, amount: e.target.value })
                }
                placeholder="Enter the amount"
                className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
              />

              <label className="mt-4" htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                required
                value={incomeData.date}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, date: e.target.value })
                }
                placeholder="Enter the date"
                className="border-2 placeholder:text-gray-400 rounded-[3px] p-2 mt-[3px] border-main outline-none"
              />
              <label className="mt-4" htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                required
                value={incomeData.category}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, category: e.target.value })
                }
                placeholder="Enter category"
                className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none "
              />
              <label className="mt-4" htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={incomeData.description}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, description: e.target.value })
                }
                className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none mb-4"
                placeholder="Enter description"
              ></textarea>
              <Button text={loading ? <InlineLoader /> : "Add"} type="submit" specific="filled_button" />
            </form>
  )
}

export default Form