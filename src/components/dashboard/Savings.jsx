import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/Modal";
import { fetchUserDetails } from "../../services/slices/userSlice";
import NoRecords from "../utils/NoRecords";
import {
  addSavings,
  resetSuccess,
} from "../../services/slices/savings/addSavingsSlice";
import {
  fetchSavingsDetails,
  setCurrentPage,
} from "../../services/slices/savings/getUserSavings";
import Error500 from "../utils/Error500";
import Headers from "../utils/Headers";

const Savings = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.addSavings);
  const { userSavingsDetails, currentPage, savingsPerPage, totalSavings } =
    useSelector((state) => state.getUserSavings);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [savingsData, setSavingsData] = useState({
    userId: "",
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSavings(savingsData));
    dispatch(fetchUserDetails(auth.user._id));
    window.location.reload();
  };

  useEffect(() => {
    if (auth.user && auth.user._id) {
      setSavingsData((prevState) => ({ ...prevState, userId: auth.user._id }));
      dispatch(
        fetchSavingsDetails({
          userId: auth.user._id,
          page: currentPage,
          savingsPerPage: savingsPerPage,
        })
      );
      dispatch(fetchUserDetails(auth.user._id));
    }
  }, [dispatch, currentPage, savingsPerPage, auth.user]);

  useEffect(() => {
    if (success) {
      setModalIsOpen(false);
      setSavingsData({
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
            title="Savings"
            message="Add Savings and track your statement"
            onclick={setModalIsOpen}
            buttonTitle="+  Add Savings"
          />

          <Modal
            isOpen={modalIsOpen}
            isClose={() => setModalIsOpen(false)}
            title="Add Savings"
            handleSubmit={handleSubmit}
            stateData={savingsData}
            setStateData={setSavingsData}
            loading={loading}
          />
        </div>

        {/* TABLE */}
        <section>
          {error && <Error500 />}
          {totalSavings === 0 ? (
            <NoRecords />
          ) : (
            <div className="container mx-auto">
              <div className="container mx-auto px-4 pb-4">
                <div className="overflow-x-auto shadow bg-white px-4 ">
                  <div
                    id="user-details"
                    className="hidden mb-2 items-center justify-between"
                  >
                    <h4 className="text-2xl font-semibold">Savings Statment</h4>
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
                    userDetails={userSavingsDetails}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalInput={totalSavings}
                    inputPerPage={savingsPerPage}
                    pdf_title="Savings_Statement"
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

export default Savings;
