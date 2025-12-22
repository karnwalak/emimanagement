import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faCalendarAlt,
    faMoneyBillWave,
    faPercentage,
    faUniversity,
    faClock,
    faInfoCircle,
    faCheckCircle,
    faExclamationCircle,
    faUser
} from "@fortawesome/free-solid-svg-icons";

export default function Show({ mustVerifyEmail, user, loanDetail, emiDetail }) {
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
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 leading-tight">
                            Loan Details
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Viewing details for {loanDetail.provider} loan
                        </p>
                    </div>

                    <Link
                        href={route("loan-detail.index")}
                        className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-bold text-gray-700 dark:text-gray-200 shadow-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-y-0.5"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back to Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Loan Detail" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Loan Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Status Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <FontAwesomeIcon icon={faInfoCircle} size="3x" className="text-indigo-600" />
                            </div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Status</h4>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${loanDetail.status === 'active'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                    {loanDetail.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 flex items-center">
                                <FontAwesomeIcon icon={faUser} className="mr-2 text-indigo-400" />
                                {user.name}
                            </p>
                        </div>

                        {/* Principal Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Loan Amount</h4>
                            <p className="text-2xl font-black text-gray-900 dark:text-white">
                                ₹{parseFloat(loanDetail.amount).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-2 flex items-center">
                                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-1 text-green-500" />
                                Principal Amount
                            </p>
                        </div>

                        {/* EMI Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Monthly EMI</h4>
                            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                ₹{parseFloat(loanDetail.emi_amount).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-2 flex items-center">
                                <FontAwesomeIcon icon={faClock} className="mr-1 text-indigo-400" />
                                Duration: {loanDetail.emi_count} Months
                            </p>
                        </div>

                        {/* Cost Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Interest Rate</h4>
                            <p className="text-2xl font-black text-gray-900 dark:text-white">
                                {loanDetail.interest_rate}%
                            </p>
                            <p className="text-xs text-gray-500 mt-2 flex items-center">
                                <FontAwesomeIcon icon={faPercentage} className="mr-1 text-purple-400" />
                                Annual Percentage Rate
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Full Details Table (Sidebar Style) */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                                        <FontAwesomeIcon icon={faUniversity} className="mr-2 text-indigo-500" />
                                        Loan Particulars
                                    </h3>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Provider</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{loanDetail.provider}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Disbursed Date</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
                                            {new Date(loanDetail.disbursed_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Processing Fee</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">₹{parseFloat(loanDetail.processing_fee).toLocaleString()}</span>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl">
                                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Total EMIs Paid</span>
                                            <span className="text-lg font-black text-indigo-700 dark:text-indigo-300">
                                                {localEmiDetails.filter(e => e.status === 'paid').length} / {loanDetail.emi_count}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Schedule Table */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-900 dark:text-white">Repayment Schedule</h3>
                                    <span className="text-xs text-gray-500 font-medium">Auto-calculated based on disbursement</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">No.</th>
                                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Due Date</th>
                                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-right">EMI Amount</th>
                                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-center">Status</th>
                                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                            {localEmiDetails.map((emi, idx) => (
                                                <tr key={emi.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-gray-400">{idx + 1}.</td>
                                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-200 font-medium">
                                                        {new Date(emi.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-black text-gray-700 dark:text-gray-300">
                                                        ₹{parseFloat(emi.amount).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${emi.status === 'paid'
                                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                            }`}>
                                                            <FontAwesomeIcon icon={emi.status === 'paid' ? faCheckCircle : faExclamationCircle} className="mr-1" />
                                                            {emi.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <Checkbox
                                                                onChange={changeStatus}
                                                                value={emi.id}
                                                                checked={emi.status === "paid"}
                                                                className="w-5 h-5 text-indigo-600 border-gray-300 rounded-lg focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-600 transition-all cursor-pointer"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
