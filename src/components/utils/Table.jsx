import React, { useEffect } from "react";
import { HiOutlineDotsVertical, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomeDetails, setCurrentPage } from "../../services/slices/income/getUserIncomeSlice";
import { fetchUserDetails } from "../../services/slices/userSlice";

const Table = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { userIncomeDetails, currentPage, incomesPerPage, totalIncomes, loading, error } = useSelector(state => state.getUserIncomes);

    useEffect(() => {
        if (auth.user && auth.user._id) {
            dispatch(fetchIncomeDetails({ userId: auth.user._id, page: currentPage, incomesPerPage }));
            dispatch(fetchUserDetails(auth.user._id));
        }
    }, [dispatch, currentPage, incomesPerPage, auth.user]);

    const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const totalPages = Math.ceil(totalIncomes / incomesPerPage);
    const startIndex = (currentPage - 1) * incomesPerPage + 1;
    const endIndex = Math.min(currentPage * incomesPerPage, totalIncomes);

    const date = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-CA");
    };

    const placeholderRows = Array.from({ length: 10 - (userIncomeDetails ? userIncomeDetails.length : 0) }, (_, index) => (
        <tr key={`placeholder-${index}`} className="colored-table">
            <td className="w-[35%]">&nbsp;</td>
            <td className="w-[20%]">&nbsp;</td>
            <td className="w-[20%]">&nbsp;</td>
            <td className="w-[25%]">&nbsp;</td>
            <td className="cursor-pointer">
                <HiOutlineDotsVertical className="invisible" />
            </td>
        </tr>
    ));

    console.log(totalIncomes)
    return (
        <>
        </>
        // <section>
        //     {totalIncomes === 0 ? (
        // <NoRecords/>
        //     )
        //         :


        //         <div>
        //             <div className="overflow-x-auto">


        //                 <table className="w-full">
        //                     <thead className="bg-main w-full text-white">
        //                         <tr>
        //                             <th className="w-[35%]">Description</th>
        //                             <th className="w-[20%]">Amount</th>
        //                             <th className="w-[20%]">Date</th>
        //                             <th className="w-[25%]">Category</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         {userIncomeDetails &&
        //                             userIncomeDetails.map((item, index) => (
        //                                 <tr key={index} className="colored-table">
        //                                     <td>{item.description}</td>
        //                                     <td>{item.amount}</td>
        //                                     <td>{date(item.date)}</td>
        //                                     <td>{item.category}</td>
        //                                     <td className="cursor-pointer">
        //                                         <HiOutlineDotsVertical />
        //                                     </td>
        //                                 </tr>
        //                             ))}
        //                         {placeholderRows}
        //                     </tbody>
        //                 </table>
        //             </div>
        //             <div className="flex justify-between">
        //                 <p>Showing {startIndex} to {endIndex} of {totalIncomes} entries</p>
        //                 <div className=" flex space-x-4">
        //                     <button
        //                         onClick={() => handlePageChange(currentPage - 1)}
        //                         disabled={currentPage <= 1}
        //                         className={`text-gray-600 hover:text-gray-900 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        //                     >
        //                         <HiOutlineChevronLeft className="w-6 h-6" />
        //                     </button>
        //                     {Array.from({ length: totalPages }, (_, index) => (
        //                         <button
        //                             key={index + 1}
        //                             onClick={() => handlePageChange(index + 1)}
        //                             className={`text-gray-600 hover:text-gray-900 ${currentPage === index + 1 ? 'bg-red-400' : ''}`}
        //                         >
        //                             {index + 1}
        //                         </button>
        //                     ))}
        //                     <button
        //                         onClick={() => handlePageChange(currentPage + 1)}
        //                         disabled={currentPage >= totalPages}
        //                         className={`text-gray-600 hover:text-gray-900 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        //                     >
        //                         <HiOutlineChevronRight className="w-6 h-6" />
        //                     </button>
        //                 </div>
        //             </div>

        //         </div>
        //     }
        // </section>
    );
};

export default Table;
