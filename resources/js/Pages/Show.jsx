import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import Checkbox from "@/Components/Checkbox";
import axios from "axios";
import { useState } from "react";

export default function Show({ mustVerifyEmail,user,loanDetail,emiDetail }) {
    // const { data, setData, post, errors, reset } = useForm({
    //     id: "",
    //     checked: "",
    //     _method: "PUT",
    // });

    const [localEmiDetails, setLocalEmiDetails] = useState(emiDetail);

    

    const changeStatus = (e) => {
        e.preventDefault();
        const newStatus = e.target.checked ? "paid" : "pending"; // Determine the new status based on whether the checkbox is checked
        const emiId = e.target.value; // Get the EMI id from the checkbox value

        console.log("EMI ID:", emiId);
        console.log("New Status:", newStatus);

        // You can now make an API call to update the status
        // Example: You can send a POST request with the new status
        axios.put(route("emi-detail.update", loanDetail.id), {
            id: emiId,
            status: newStatus, // Send the new status
        })
            .then((response) => {
                // Handle the response after updating
                setLocalEmiDetails((prevDetails) =>
                    prevDetails.map((emi) =>
                        emi.id === parseInt(emiId)
                            ? { ...emi, status: newStatus }
                            : emi
                    )
                );
                console.log(response);
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Show
                </h2>
            }
        >
            <Head title="Loan Detail" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <table className="table-auto w-full border-collapse border border-gray-300 m-5 p-5 text-gray-700 dark:text-gray-200">
                            <tbody>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Name:
                                    </td>
                                    <td className="px-4 py-2">{user.name}</td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Provider:
                                    </td>
                                    <td className="px-4 py-2">
                                        {loanDetail.provider}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Amount:
                                    </td>
                                    <td className="px-4 py-2">
                                        {loanDetail.amount}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Emi Amount:
                                    </td>
                                    <td className="px-4 py-2">
                                        {loanDetail.emi_amount}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Tenure:
                                    </td>
                                    <td className="px-4 py-2">
                                        {loanDetail.emi_count}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Processing Fees:
                                    </td>
                                    <td className="px-4 py-2">
                                        {loanDetail.processing_fee}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Interest Rate:
                                    </td>
                                    <td className="px-4 py-2">
                                        {loanDetail.interest_rate}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Disbursed Date:
                                    </td>
                                    <td className="px-4 py-2">
                                        {loanDetail.disbursed_date}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                                        Status:
                                    </td>
                                    <td className="px-4 py-2">
                                        {loanDetail.status}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 border-separate border-spacing-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                    <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="py-3 px-6 text-center">SI. No</th>
                            <th className="py-3 px-6 text-center">Amount</th>
                            <th className="py-3 px-6 text-center">Due Date</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">
                                Action (Check if paid)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {localEmiDetails.map((emiDetail, key) => (
                            <tr
                                key={key}
                                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 ease-in-out"
                            >
                                <td className="py-3 px-6 text-center">
                                    {key + 1}.
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {emiDetail.amount}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {emiDetail.due_date}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span
                                        className={`font-semibold ${
                                            emiDetail.status === "paid"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {emiDetail.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <Checkbox
                                        onChange={changeStatus}
                                        value={emiDetail.id}
                                        checked={emiDetail.status === "paid"}
                                        className={`${
                                            emiDetail.status === "paid"
                                                ? "checked"
                                                : ""
                                        }`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
