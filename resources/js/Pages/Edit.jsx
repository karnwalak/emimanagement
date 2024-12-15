import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function Edit({ mustVerifyEmail, loanDetail, emiDetail }) {
    const { data, setData, post, errors, reset } = useForm({
        provider: loanDetail.provider,
        amount: loanDetail.amount,
        processing_fee: loanDetail.processing_fee,
        interest_rate: loanDetail.interest_rate,
        tenure: loanDetail.emi_count,
        emi_amount: loanDetail.emi_amount,
        loan_type: loanDetail.loan_type,
        date: loanDetail.disbursed_date,
        _method: "PUT",
    });

    // const [loan_type, setLoanType] = useState("tenure");

    // const handleLoanTypeChange = (e) => {
    //     const selectedType = e.target.value;

    //     // Use functional form of setData to ensure consistent updates
    //     setData((prevData) => ({
    //         ...prevData,
    //         loan_type: selectedType,
    //         emi_amount: "", // Reset EMI amount
    //         tenure: "", // Reset Number of EMIs
    //     }));
    // };

    const [emiDetails, setEmiDetail] = useState(emiDetail);
    const handleInputChange = (index, field, value) => {
        const updatedEmiDetail = [...emiDetails];
        updatedEmiDetail[index][field] = value;
        setEmiDetail(updatedEmiDetail);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Get the span element
        const loanUpdateSuccessMessage = document.getElementById("loanUpdateSuccess");
        post(route("loan-detail.update", loanDetail.id), {
            onSuccess: () => {
                // Update the span with success message and classes
                loanUpdateSuccessMessage.innerHTML =
                    "Loan details updated successfully!";
                loanUpdateSuccessMessage.className =
                    "text-green-600 font-semibold mt-2";

                // Remove the message after 5 seconds
                setTimeout(() => {
                    loanUpdateSuccessMessage.innerHTML = "";
                    loanUpdateSuccessMessage.className = "";
                }, 5000);
            },
            onError: (errors) => {
               
                loanUpdateSuccessMessage.innerHTML =
                    "An error occurred while updating EMI details.";
                loanUpdateSuccessMessage.className =
                    "text-red-600 font-semibold mt-2";

                // Remove the error message after 5 seconds (optional)
                setTimeout(() => {
                    loanUpdateSuccessMessage.innerHTML = "";
                    loanUpdateSuccessMessage.className = "";
                }, 5000);
            },
            onFinish: () => {
                console.log("Request completed.");
            },
        });
    };

    // Handle form submission
    const handleEmiSubmit = async (e) => {
        e.preventDefault();
        // Get the loan_detail_id from the form
        const loanDetailId = document.getElementById("loan_detail_id").value;
        // Get the span element
        const successMessageSpan = document.getElementById("successMessage");

        // Include loan_detail_id in the payload
        const payload = {
            loan_detail_id: loanDetailId,
            emi_details: emiDetail, // Existing EMI details array
        };
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");
            const response = await fetch("/update-emi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.status === true) {
                setEmiDetail(result.updatedEmi);
                // Update the span with success message and classes
                successMessageSpan.innerHTML =
                    "EMI details updated successfully!";
                successMessageSpan.className =
                    "text-green-600 font-semibold mt-2";

                // Remove the message after 5 seconds
                setTimeout(() => {
                    successMessageSpan.innerHTML = "";
                    successMessageSpan.className = "";
                }, 5000);
            }else{
                throw new Error(
                    result.message || "Failed to update EMI details."
                );
            }
        } catch (error) {
            console.error("Error:", error);
            successMessageSpan.innerHTML =
                "An error occurred while updating EMI details.";
            successMessageSpan.className = "text-red-600 font-semibold mt-2";

            // Remove the error message after 5 seconds (optional)
            setTimeout(() => {
                successMessageSpan.innerHTML = "";
                successMessageSpan.className = "";
            }, 5000);
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit
                </h2>
            }
        >
            <Head title="Loan Detail" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <form onSubmit={handleSubmit} method="post">
                            <div>
                                <InputLabel
                                    htmlFor="provider"
                                    value="Provider"
                                />

                                <TextInput
                                    id="provider"
                                    onChange={(e) =>
                                        setData("provider", e.target.value)
                                    }
                                    value={data.provider}
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="provider"
                                />

                                <InputError
                                    message={errors.provider}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="amount" value="Amount" />

                                <TextInput
                                    id="amount"
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                    value={data.amount}
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="amount"
                                />

                                <InputError
                                    message={errors.amount}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="processing_fee"
                                    value="Processing Fee"
                                />

                                <TextInput
                                    id="processing_fee"
                                    onChange={(e) =>
                                        setData(
                                            "processing_fee",
                                            e.target.value
                                        )
                                    }
                                    value={data.processing_fee}
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="processing_fee"
                                />

                                <InputError
                                    message={errors.processing_fee}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="interest_rate"
                                    value="Interest Rate"
                                />

                                <TextInput
                                    id="interest_rate"
                                    onChange={(e) =>
                                        setData("interest_rate", e.target.value)
                                    }
                                    value={data.interest_rate}
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="interest_rate"
                                />

                                <InputError
                                    message={errors.interest_rate}
                                    className="mt-2"
                                />
                            </div>
                            {/* Loan Type Toggle */}
                            {/* <div>
                                <InputLabel value="Loan Payment Type" />
                                <div className="flex gap-4 mt-2">
                                    <label>
                                        <input
                                            type="radio"
                                            name="loan_type"
                                            value="tenure"
                                            checked={
                                                data.loan_type === "tenure"
                                            }
                                            onChange={handleLoanTypeChange}
                                        />
                                        <span className="ml-2">Tenure</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="loan_type"
                                            value="emi_amount"
                                            checked={
                                                data.loan_type === "emi_amount"
                                            }
                                            onChange={handleLoanTypeChange}
                                        />
                                        <span className="ml-2">
                                            Amount per EMI
                                        </span>
                                    </label>
                                </div>
                            </div> */}

                            {/* Conditional Inputs */}
                            {data.loan_type === "tenure" && (
                                <div>
                                    <InputLabel
                                        htmlFor="tenure"
                                        value="Tenure"
                                    />
                                    <TextInput
                                        id="tenure"
                                        name="tenure"
                                        type="number"
                                        value={data.tenure || ""}
                                        onChange={
                                            (e) =>
                                                setData(
                                                    "tenure",
                                                    e.target.value
                                                ) // Update tenure correctly
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.tenure}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            {data.loan_type === "emi_amount" && (
                                <div>
                                    <InputLabel
                                        htmlFor="emi_amount"
                                        value="Amount per EMI"
                                    />
                                    <TextInput
                                        id="emi_amount"
                                        name="emi_amount"
                                        type="number"
                                        value={data.emi_amount || ""}
                                        onChange={
                                            (e) =>
                                                setData(
                                                    "emi_amount",
                                                    e.target.value
                                                ) // Update emi_amount correctly
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.emi_amount}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                            <div>
                                <InputLabel
                                    htmlFor="date"
                                    value="Disbursed Date"
                                />

                                <TextInput
                                    id="date"
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                    type="date"
                                    value={data.date}
                                    className="mt-1 block w-full"
                                    autoComplete="date"
                                />

                                <InputError
                                    message={errors.date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 my-2 uppercase hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Update
                                </button>
                            </div>
                            <p id="loanUpdateSuccess" className=""></p>
                        </form>
                        <form onSubmit={handleEmiSubmit} method="post">
                            <div className="my-3">
                                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                    EMI Detail:-
                                </h2>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Please note: The EMI details shown here are
                                    system-generated and may vary due to
                                    different calculation methods used by loan
                                    providers. We recommend verifying the
                                    details and updating them if necessary to
                                    match your loan provider's calculations.
                                </p>
                                <input
                                    type="hidden"
                                    name="loan_detail_id"
                                    id="loan_detail_id"
                                    value={loanDetail.id}
                                />
                                <table className="min-w-full table-auto border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                                                Si. No.
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                                                Amount
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emiDetails &&
                                            emiDetails.map((emi, key) => (
                                                <tr
                                                    key={key}
                                                    className={
                                                        key % 2 === 0
                                                            ? "bg-white"
                                                            : "bg-gray-50"
                                                    } // Alternate row colors
                                                >
                                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                                        {key + 1}
                                                        <input
                                                            type="hidden"
                                                            id="id"
                                                            name="id"
                                                            value={emi.id}
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                                        <input
                                                            type="text"
                                                            name="amount"
                                                            id="amount"
                                                            value={emi.amount}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    key,
                                                                    "amount",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                                        <input
                                                            type="date"
                                                            name="due_date"
                                                            id="due_date"
                                                            value={emi.due_date}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    key,
                                                                    "due_date",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="bg-green-500 my-2 uppercase hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                                <span id="successMessage" className=""></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
