import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/Modal";
import { fetchUserDetails } from "../../services/slices/userSlice";
import NoRecords from "../utils/NoRecords";
import { addExpenses, resetSuccess } from "../../services/slices/expenses/addExpensesSlice";
import {
  fetchExpensesDetails,
  setCurrentPage,
} from "../../services/slices/expenses/getUserExpenses";
import Headers from "../utils/Headers";
import Error500 from "../utils/Error500";
import Table from "../utils/Table";

const Expenses = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.addExpenses);
  const { userExpensesDetails, currentPage, expensesPerPage, totalExpenses } =
    useSelector((state) => state.getUserExpenses);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expensesData, setExpensesData] = useState({
    userId: "",
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpenses(expensesData));
    dispatch(fetchUserDetails(auth.user._id));
    window.location.reload();
  };

  useEffect(() => {
    if (auth.user && auth.user._id) {
      setExpensesData((prevState) => ({ ...prevState, userId: auth.user._id }));
      dispatch(
        fetchExpensesDetails({
          userId: auth.user._id,
          page: currentPage,
          ExpensesPerPage: expensesPerPage,
        })
      );
      dispatch(fetchUserDetails(auth.user._id));
    }
  }, [dispatch, currentPage, expensesPerPage, auth.user]);

  useEffect(() => {
    if (success) {
      setModalIsOpen(false);
      setExpensesData({
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
            title="Expenses"
            message="Add Expenses and track your statement"
            onclick={setModalIsOpen}
            buttonTitle="+  Add Expenses"
          />

          <Modal
            isOpen={modalIsOpen}
            isClose={() => setModalIsOpen(false)}
            title="Add Expenses"
            handleSubmit={handleSubmit}
            stateData={expensesData}
            setStateData={setExpensesData}
            loading={loading}
          />
        </div>

        {/* TABLE */}
        <section>
          {error && <Error500 />}
          {totalExpenses === 0 ? (
            <NoRecords />
          ) : (
            <div className="container mx-auto">
              <div className="container mx-auto px-4 pb-4">
                <div className="overflow-x-auto shadow bg-white px-4 ">

                  <Table
                    userDetails={userExpensesDetails}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalInput={totalExpenses}
                    inputPerPage={expensesPerPage}
                    pdf_title="Expenses_Statement"
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

export default Expenses;
