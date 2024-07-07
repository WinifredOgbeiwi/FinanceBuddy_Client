import React, { useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomeDetails } from "../../services/slices/income/getUserIncomeSlice";

const Table = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const userIncomes = useSelector((state) => state.getUserIncomes);
    
    useEffect(() => {
        if (auth.user && auth.user._id) {
            dispatch(fetchIncomeDetails(auth.user._id));
        }
    }, [auth.user, dispatch]);
    const incomeDetails = userIncomes?.userIncomeDetails?.incomes;

    const date = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-CA");
    };
    return (
        <section >
            <div className=" overflow-scroll">
                <table className="w-full ">
                    <thead className="bg-main w-full text-white">
                        <tr>
                            <th className="w-[35%]">Description</th>
                            <th className="w-[20%]">Amount</th>
                            <th className="w-[20%]">Date</th>
                            <th className="w-[25%]">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomeDetails &&
                            incomeDetails.map((item) => (
                                <tr className="colored-table">
                                    <td>{item.description}</td>
                                    <td>{item.amount}</td>
                                    <td>{date(item.date)}</td>
                                    <td>{item.category}</td>
                                    <td className=" cursor-pointer">
                                        <HiOutlineDotsVertical />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Table;
