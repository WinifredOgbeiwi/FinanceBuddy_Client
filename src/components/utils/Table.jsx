import React from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineDotsVertical } from 'react-icons/hi';
import Button from './Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useDispatch } from 'react-redux';

const Table = ({ userDetails, currentPage, setCurrentPage, totalInput, inputPerPage, pdf_title }) => {

    const dispatch = useDispatch();

    const date = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-CA");
    };

    const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };


    const totalPages = Math.ceil(totalInput / inputPerPage);
    const startIndex = (currentPage - 1) * inputPerPage + 1;
    const endIndex = Math.min(currentPage * inputPerPage, totalInput);

    const placeholderRows = Array.from(
        { length: 10 - (userDetails ? userDetails.length : 0) },
        (_, index) => (
            <tr key={`placeholder-${index}`} className="colored-table">
                <td className="w-[35%]">&nbsp;</td>
                <td className="w-[20%]">&nbsp;</td>
                <td className="w-[20%]">&nbsp;</td>
                <td className="w-[25%]">&nbsp;</td>

            </tr>
        )
    );

    // const downloadPDF = () => {
    //     const input = document.getElementById("pdf-table");
    //     const userDetailsDiv = document.getElementById("user-details");
    //     userDetailsDiv.style.display = "flex";
    //     userDetailsDiv.style.alignItems = "center";
    //     userDetailsDiv.style.justifyContent = "space-between";
    //     const downloadButton = document.getElementById("download-button");
    //     downloadButton.style.display = "none";
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF();
    //         const imgProps = pdf.getImageProperties(imgData);
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //         // pdf.save("Income_Table.pdf");
    //         pdf.save(`${pdf_title}`);
    //     });
    // };
    return (
        <div>
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
                    {userDetails &&
                        userDetails.map((item, index) => (
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
                <Button
                    text="Download as PDF"
                    specific="short-filled"
                    onClick={downloadPDF}
                />
                <div className="flex items-center space-x-2">
                    <div className=" flex space-x-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className={`text-gray-600 hover:text-main ${currentPage <= 1
                                ? "opacity-85 cursor-not-allowed"
                                : ""
                                }`}
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
                            className={`text-gray-600 hover:text-gray-900 ${currentPage >= totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                                }`}
                        >
                            <HiOutlineChevronRight className=" text-3xl font-extrabold" />
                        </button>
                    </div>
                    <p>
                        {" "}
                        {startIndex} to {endIndex} of {totalInput} entries
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Table