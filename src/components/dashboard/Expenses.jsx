import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/Modal";
import Button from "../utils/Button";
import { InlineLoader } from "../utils/Loader";
import { fetchUserDetails } from "../../services/slices/userSlice";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import NoRecords from "../utils/NoRecords";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { addExpenses } from "../../services/slices/expenses/addExpensesSlice";
import { fetchExpensesDetails, setCurrentPage } from "../../services/slices/expenses/getUserExpenses";
import Headers from "../utils/Headers";


const Expenses = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.addExpenses);
  const { userExpensesDetails, currentPage, expensesPerPage, totalExpenses, } = useSelector(state => state.getUserExpenses);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [expensesData, setExpensesData] = useState({
    userId: "",
    amount: "",
    description: "",
    date: "",
    category: ""
  });

  const totalPages = Math.ceil(totalExpenses / expensesPerPage);
  const startIndex = (currentPage - 1) * expensesPerPage + 1;
  const endIndex = Math.min(currentPage * expensesPerPage, totalExpenses);
  const date = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };
  const placeholderRows = Array.from({ length: 10 - (userExpensesDetails ? userExpensesDetails.length : 0) }, (_, index) => (
    <tr key={`placeholder-${index}`} className="colored-table">
      <td>&nbsp;</td>
      <td >&nbsp;</td>
      <td >&nbsp;</td>
      <td>&nbsp;</td>
      {/* <td className="cursor-pointer">
        <HiOutlineDotsVertical className="invisible" />
      </td> */}
    </tr>
  ));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpenses(expensesData));
    dispatch(fetchUserDetails(auth.user._id));
    window.location.reload();
  };
  const downloadPDF = () => {
    const input = document.getElementById('pdf-table');

    const userDetailsDiv = document.getElementById('user-details');
    userDetailsDiv.style.display = 'flex';

    // const downloadButton = document.getElementById('download-button');
    // downloadButton.style.display = 'none'

    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("Expenses_Statement.pdf");
      });
  };

  useEffect(() => {
    if (auth.user && auth.user._id) {
      setExpensesData((prevState) => ({ ...prevState, userId: auth.user._id }));
      dispatch(fetchExpensesDetails({ userId: auth.user._id, page: currentPage, ExpensesPerPage: expensesPerPage }));
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
        category: ""
      });
      dispatch(resetSuccess());
    }
  }, [success, auth.user, dispatch]);


  return (
    <main>

      <div className="mt-6">

        <div className=" h-52 shadow bg-white  px-4 mx-4 mb-6">
          <Headers title="Expenses" message="Add Expenses and track your statement" onclick={setModalIsOpen} />

          <Modal
            isOpen={modalIsOpen}
            isClose={() => setModalIsOpen(false)}
            title="Add Expenses"
          >
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                required
                value={expensesData.amount}
                onChange={(e) =>
                  setExpensesData({ ...expensesData, amount: e.target.value })
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
                value={expensesData.date}
                onChange={(e) =>
                  setExpensesData({ ...expensesData, date: e.target.value })
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
                value={expensesData.category}
                onChange={(e) =>
                  setExpensesData({ ...expensesData, category: e.target.value })
                }
                placeholder="Enter category"
                className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none "
              />
              <label className="mt-4" htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={expensesData.description}
                onChange={(e) =>
                  setExpensesData({ ...expensesData, description: e.target.value })
                }
                className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none mb-4"
                placeholder="Enter description"
              ></textarea>
              <Button text={loading ? <InlineLoader /> : "Add"} type="submit" specific="filled_button" />
            </form>

          </Modal>
        </div>

        {/* TABLE */}

        <section>
          {totalExpenses === 0 ? (
            <NoRecords />
          )
            :
            <div className="container mx-auto px-4 pb-4">
              <div className="overflow-x-auto shadow bg-white px-4 ">
                <div
                  id="user-details" className="hidden mb-2 items-center justify-between"

                >
                  <h4 className="text-2xl font-semibold">Expenses Statment</h4>
                  <div className=" tex">
                    <h4 className="capitalize">{user.userDetails.firstName} {user.userDetails.lastName}</h4>
                    <p>{user.userDetails.email}</p>
                    <p>{user.userDetails.occupation}, {user.userDetails.location}</p>
                  </div>
                </div>

                <table className="min-w-full my-4">
                  <thead className="bg-main text-white uppercase">
                    <tr>
                      <th >Description</th>
                      <th >Amount</th>
                      <th >Date</th>
                      <th >Category</th>
                    </tr>
                  </thead>
                  <tbody >
                    {userExpensesDetails &&
                      userExpensesDetails.map((item, index) => (
                        <tr key={index} className="colored-table">
                          <td className=" whitespace-nowrap first-letter:capitalize">{item.description}</td>
                          <td className=" py-4 whitespace-nowrap first-letter:capitalize">{item.amount}</td>
                          <td className=" py-4 whitespace-nowrap first-letter:capitalize">{date(item.date)}</td>
                          <td className=" py-4 whitespace-nowrap first-letter:capitalize">{item.category}</td>
                          </tr>
                          ))}
                   
                    {placeholderRows}
                  </tbody>
                </table>
              </div>
            </div>

          }
        </section>


      </div >
    </main >
  );
};

export default Expenses;


{/* {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`text-gray-600 hover:text-gray-900 ${currentPage === index + 1 ? 'bg-green-400' : ''}`}
                      >
                        {index + 1}
                      </button>
                    ))} */}