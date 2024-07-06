import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import Button from "../utils/Button";
import { addIncome, resetSuccess } from "../../services/slices/income/addIncomeSlice";
import { IMAGES } from "../../constants/util";
import { InlineLoader } from "../utils/Loader";


const Income = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.addIncome);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [incomeData, setIncomeData] = useState({
    userId: "",
    amount: "",
    description: "",
    date: "",
    category: ""
  });

  // Update userId when auth.user changes
  useEffect(() => {
    if (auth.user && auth.user._id) {
      setIncomeData((prevState) => ({ ...prevState, userId: auth.user._id }));
    }
  }, [auth.user]);

  useEffect(() => {
    if (success) {
      setModalIsOpen(false);
      setIncomeData({
        userId: auth.user ? auth.user._id : "",
        amount: "",
        description: "",
        date: "",
        category: ""
      });
      dispatch(resetSuccess()); 
    }
  }, [success, auth.user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncome(incomeData));
  };

  return (
    <main>

      <div className="mt-2">
        {/* header */}
        <div className="w-full h-52 bg-main mb-2 "></div>

        <div className="flex justify-between items-start">
          <div className="border-2 flex flex-col justify-center items-center py-4 px-10">
            <h4>Total Balance</h4>
            <h2>$4000</h2>
          </div>
          <div
            onClick={() => setModalIsOpen(true)}
            className="border-2 flex flex-col bg-[008000] justify-center items-center px-5 py-3"
          >
            Add Income
          </div>

          <Modal
            isOpen={modalIsOpen}
            isClose={() => setModalIsOpen(false)}
            title="Add Income"
          >
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
          </Modal>
        </div>
      </div>
    </main>
  );
};

export default Income;
