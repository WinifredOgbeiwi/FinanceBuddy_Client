import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/Modal";
import Button from "../utils/Button";
import {
  addIncomes,
  resetSuccess,
} from "../../services/slices/income/addIncomeSlice";
import { InlineLoader } from "../utils/Loader";
import { fetchUserDetails } from "../../services/slices/userSlice";

import {
  fetchIncomeDetails,
  setCurrentPage,
} from "../../services/slices/income/getUserIncomeSlice";
import NoRecords from "../utils/NoRecords";
import Headers from "../utils/Headers";
import Table from "../utils/Table";
import Error500 from "../utils/Error500";

const Income = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.addIncomes);
  const { userIncomeDetails, currentPage, incomesPerPage, totalIncomes } =
    useSelector((state) => state.getUserIncomes);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [incomeData, setIncomeData] = useState({
    userId: "",
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncomes(incomeData));
    dispatch(fetchUserDetails(auth.user._id));
    window.location.reload();
  };

  useEffect(() => {
    if (auth.user && auth.user._id) {
      setIncomeData((prevState) => ({ ...prevState, userId: auth.user._id }));
      dispatch(
        fetchIncomeDetails({
          userId: auth.user._id,
          page: currentPage,
          incomesPerPage,
        })
      );
      dispatch(fetchUserDetails(auth.user._id));
    }
  }, [dispatch, currentPage, incomesPerPage, auth.user]);

  useEffect(() => {
    if (success) {
      setModalIsOpen(false);
      setIncomeData({
        userId: auth.user ? auth.user._id : "",
        amount: "",
        description: "",
        date: "",
        category: "",
      });
      dispatch(resetSuccess());
    }
  }, [success, auth.user, dispatch]);

  return (
    <main>
      <div className="mt-6">
        <div className=" h-52 mb-6 shadow bg-white mx-4 px-4 ">
          <Headers
            title="Income"
            message="Add Incomes and track your statement"
            onclick={setModalIsOpen}
          />

          <Modal
            isOpen={modalIsOpen}
            isClose={() => setModalIsOpen(false)}
            title="Add Income"
            handleSubmit={handleSubmit}
            stateData={incomeData}
            setStateData={setIncomeData}
            loading={loading}
          />

        </div>

        {/* TABLE */}
        <section>
          {error && <Error500 />}
          {totalIncomes === 0 ? (
            <NoRecords />
          ) : (
            <div className="container mx-auto">
              <div className="container mx-auto px-4 pb-4">
                <div className="overflow-x-auto shadow bg-white px-4 ">
                  <div
                    id="user-details"
                    className="hidden mb-2 items-center justify-between"
                  >
                    <h4 className="text-2xl font-semibold">Income Statment</h4>
                    <div className=" tex">
                      <h4 className="capitalize">
                        {user.userDetails.firstName} {user.userDetails.lastName}
                      </h4>
                      <p>{user.userDetails.email}</p>
                      <p>
                        {user.userDetails.occupation},{" "}
                        {user.userDetails.location}
                      </p>
                    </div>
                  </div>

                  <Table
                    userDetails={userIncomeDetails}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalInput={totalIncomes}
                    inputPerPage={incomesPerPage}
                    pdf_title="Income_Statement"
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Income;
