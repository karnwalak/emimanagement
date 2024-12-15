import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@headlessui/react";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ loanDetails }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Loan Detail
                    </h2>

                    <Link
                        href={route("loan-detail.create")}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 false"
                    >
                        Add Loan
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th>SI. No</th>
                                        <th>Provider</th>
                                        <th>Amount</th>
                                        <th>Processing Fee</th>
                                        <th>Amount You Get</th>
                                        <th>Int.</th>
                                        <th>No. of EMI</th>
                                        <th>Paid EMI</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loanDetails.data.map((loanDetail, key) => (
                                        <tr key={key}>
                                            <td>{key + 1}.</td>
                                            <td>{loanDetail.provider}</td>
                                            <td>{loanDetail.amount}</td>
                                            <td>{loanDetail.processing_fee}</td>
                                            <td>
                                                {loanDetail.amount -
                                                    loanDetail.processing_fee}
                                            </td>
                                            <td>{loanDetail.interest_rate}</td>
                                            <td>{loanDetail.emi_count}</td>
                                            <td>
                                                {
                                                    loanDetail.emi_details.filter(
                                                        (emi) =>
                                                            emi.status ===
                                                            "paid"
                                                    ).length
                                                }
                                            </td>
                                            <td className="p-2 flex">
                                                <Link
                                                    href={route(
                                                        "loan-detail.edit",
                                                        loanDetail.id
                                                    )}
                                                    className="bg-green-500 uppercase hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "loan-detail.show",
                                                        loanDetail.id
                                                    )}
                                                    className="bg-blue-500 mx-2 uppercase hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Show
                                                </Link>

                                                <form
                                                    method="POST"
                                                    action={route(
                                                        "loan-detail.destroy",
                                                        loanDetail.id
                                                    )}
                                                    onSubmit={(e) => {
                                                        if (
                                                            !confirm(
                                                                "Are you sure you want to delete this loan?"
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="_token"
                                                        value={document
                                                            .querySelector(
                                                                'meta[name="csrf-token"]'
                                                            )
                                                            .getAttribute(
                                                                "content"
                                                            )}
                                                    />

                                                    <input
                                                        type="hidden"
                                                        name="_method"
                                                        value="DELETE"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-red-500 mx-2 uppercase hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
