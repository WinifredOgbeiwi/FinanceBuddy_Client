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
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineDotsVertical,
} from "react-icons/hi";
import {
  fetchIncomeDetails,
  setCurrentPage,
} from "../../services/slices/income/getUserIncomeSlice";
import NoRecords from "../utils/NoRecords";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Headers from "../utils/Headers";

const Income = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.addIncomes);
  const { userIncomeDetails, currentPage, incomesPerPage, totalIncomes } =
    useSelector((state) => state.getUserIncomes);
  const userIncomes = useSelector((state) => state.getUserIncomes);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);

  const [incomeData, setIncomeData] = useState({
    userId: "",
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const totalPages = Math.ceil(totalIncomes / incomesPerPage);
  const startIndex = (currentPage - 1) * incomesPerPage + 1;
  const endIndex = Math.min(currentPage * incomesPerPage, totalIncomes);
  const date = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };
  const placeholderRows = Array.from(
    { length: 10 - (userIncomeDetails ? userIncomeDetails.length : 0) },
    (_, index) => (
      <tr key={`placeholder-${index}`} className="colored-table">
        <td className="w-[35%]">&nbsp;</td>
        <td className="w-[20%]">&nbsp;</td>
        <td className="w-[20%]">&nbsp;</td>
        <td className="w-[25%]">&nbsp;</td>
        <td className="cursor-pointer">
          <HiOutlineDotsVertical className="invisible" />
        </td>
      </tr>
    )
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncomes(incomeData));
    dispatch(fetchUserDetails(auth.user._id));
    window.location.reload();
  };
  const downloadPDF = () => {
    const input = document.getElementById("pdf-table");
    const userDetailsDiv = document.getElementById("user-details");
    userDetailsDiv.style.display = "flex";
    userDetailsDiv.style.alignItems = "center";
    userDetailsDiv.style.justifyContent = "space-between";
    const downloadButton = document.getElementById("download-button");
    downloadButton.style.display = "none";
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Income_Table.pdf");
    });
  };
  // useEffect(() => {
  //   if (auth.user && auth.user._id) {
  //     dispatch(fetchIncomeDetails({ userId: auth.user._id, page: currentPage, incomesPerPage }));
  //     dispatch(fetchUserDetails(auth.user._id));
  //   }
  // }, [dispatch, currentPage, incomesPerPage, auth.user]);
  // Update userId when auth.user changes
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

  const handlesAction = () => {};

  return (
    <main>
      <div className="mt-6">
        <div className=" h-52 mb-6 shadow bg-white mx-4 px-4 ">
          <Headers title="Income" message="Add Incomes and track your statement" onclick={setModalIsOpen}/>

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

              <label className="mt-4" htmlFor="date">
                Date
              </label>
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
              <label className="mt-4" htmlFor="category">
                Category
              </label>
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
              <label className="mt-4" htmlFor="description">
                Description
              </label>
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
              <Button
                text={loading ? <InlineLoader /> : "Add"}
                type="submit"
                specific="filled_button"
              />
            </form>
          </Modal>
        </div>

        {/* TABLE */}
        <section>
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

                  <table className="min-w-full my-4">
                    <thead className="bg-main text-white uppercase">
                      <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userIncomeDetails &&
                        userIncomeDetails.map((item, index) => (
                          <tr key={index} className="colored-table">
                            <td className=" whitespace-nowrap first-letter:capitalize">
                              {item.description}
                            </td>
                            <td className=" py-4 whitespace-nowrap first-letter:capitalize">
                              {item.amount}
                            </td>
                            <td className=" py-4 whitespace-nowrap first-letter:capitalize">
                              {date(item.date)}
                            </td>
                            <td className=" py-4 whitespace-nowrap first-letter:capitalize">
                              {item.category}
                            </td>
                          </tr>
                        ))}

                      {placeholderRows}
                    </tbody>
                  </table>
                    <div className="flex flex-row max-[550px]:flex-col-reverse max-[550px]:gap-5 justify-between items-center mb-5"> 
                     <Button text="Download as PDF" specific="short-filled" onClick={downloadPDF} />
                      <div className="flex items-center space-x-2" >
                        <div className=" flex space-x-6">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className={`text-gray-600 hover:text-main ${currentPage <= 1 ? 'opacity-85 cursor-not-allowed' : ''}`}
                          >
                            <HiOutlineChevronLeft className="text-3xl font-extrabold" />
                          </button>
                          {/* {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`text-gray-600 hover:text-gray-900 ${currentPage === index + 1 ? 'bg-green-400' : ''}`}
                        >
                          {index + 1}
                        </button>
                                            ))} */}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className={`text-gray-600 hover:text-gray-900 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <HiOutlineChevronRight className=" text-3xl font-extrabold" />
                          </button>
                        </div>
                        <p> {startIndex} to {endIndex} of {totalIncomes} entries</p>
                      </div>

                    



                    
                    </div>
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
