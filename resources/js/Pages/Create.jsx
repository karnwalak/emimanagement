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

export default function Create({ mustVerifyEmail,users }) {
    const { data, setData, post, errors, reset } = useForm({
        user: "",
        provider: "",
        amount: "",
        processing_fee: "",
        interest_rate: "",
        tenure: "",
        emi_amount: "",
        loan_type: "tenure",
        date: "",
    });

    const [loan_type, setLoanType] = useState("tenure");

    const handleLoanTypeChange = (e) => {
        const selectedType = e.target.value;

        // Use functional form of setData to ensure consistent updates
        setData((prevData) => ({
            ...prevData,
            loan_type: selectedType,
            emi_amount: "", // Reset EMI amount
            tenure: "", // Reset Number of EMIs
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
      post(route("loan-detail.store"));
    } 
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create
                </h2>
            }
        >
            <Head title="Loan Detail" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <form onSubmit={handleSubmit} method="post">
                            <div>
                                <InputLabel htmlFor="user" value="User" />
                                <SelectInput
                                    className="mt-1 block w-full"
                                    value={data.user}
                                    onChange={(e) =>
                                        setData("user", e.target.value)
                                    }
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.user}
                                    className="mt-2"
                                />
                            </div>
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
                            <div>
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
                            </div>

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
                                    Save
                                </button>

                                {/* <Transition
                                show="{recentlySuccessful}"
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Saved.
                                </p>
                            </Transition> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
