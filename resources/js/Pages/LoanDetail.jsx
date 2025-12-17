import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@headlessui/react";
import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTable.use(DT);

import React, { useRef, useEffect } from "react";
import axios from "axios";

export default function Dashboard({ loanDetails }) {
    const tableRef = useRef();

    const handlePayment = async () => {
        const amount = 5000; // replace with dynamic amount

        // 1. Create order on backend
        const res = await axios.post("/create-order", { amount });

        const { order_id, razorpay_key, currency } = res.data;

        // 2. Open Razorpay Checkout
        const options = {
            key: "rzp_test_2FVsQnHLJifMbi",
            amount: amount * 100,
            currency: currency,
            name: "Akk Technology",
            description: "Subscription charge for EMI Management!",
            order_id: order_id,
            handler: function (response) {
                console.log(response);
                axios.post("/verify-payment", {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature
                });
            },
            prefill: {
                name: "Akshay Kumar Karnwal",
                email: "karnwalakshay7@gmail.com",
                contact: "9568936879",
            },
            notes: {
                loan_id: "123456",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // DataTable configuration with AJAX
    const dataTableOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL",
        processing: true,
        serverSide: true,
        ajax: {
            url: "/api/loan-detail", // Your AJAX endpoint
            type: "GET",
            data: function (d) {
                // You can add custom parameters here
                // d.custom_param = "value";
                return d;
            },
            error: function (xhr, error, code) {
                console.error('DataTable AJAX error:', error, code);
            }
        },
        columns: [
            {
                data: null,
                name: 'serial',
                orderable: false,
                searchable: false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 + '.';
                }
            },
            { data: 'provider', name: 'provider' },
            {
                data: 'amount',
                name: 'amount',
                render: function (data, type, row) {
                    console.log(row);
                    return '₹' + parseFloat(data).toLocaleString();
                }
            },
            {
                data: 'processing_fee',
                name: 'processing_fee',
                render: function (data, type, row) {
                    return '₹' + parseFloat(data).toLocaleString();
                }
            },
            {
                data: null,
                name: 'amount_you_get',
                orderable: false,
                render: function (data, type, row) {
                    const amountYouGet = parseFloat(row.amount) - parseFloat(row.processing_fee);
                    return '₹' + amountYouGet.toLocaleString();
                }
            },
            {
                data: 'interest_rate',
                name: 'interest_rate',
                render: function (data, type, row) {
                    return data + '%';
                }
            },
            {
                data: 'emi_count',
                name: 'emi_count',
                render: function (data, type, row) {
                    return row.emi_count;
                }
            },
            {
                data: 'paid_emi_count',
                name: 'paid_emi_count',
                orderable: false,
                render: function (data, type, row) {
                    const paidEmi = row.emi_detail.filter(
                        (emi) => emi.status === "paid"
                    ).length;
                    return paidEmi;
                }
            },
            {
                data: 'status',
                name: 'status',
                render: function (data, type, row) {
                    const statusClass = data === 'closed' ? 'text-red-600' : 'text-green-600';
                    return `<span class="${statusClass} font-semibold">${data.toUpperCase()}</span>`;
                }
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
                        <div class="flex space-x-2">
                            <a href="/loan-detail/${data}/edit" 
                               class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-xs uppercase">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="/loan-detail/${data}" 
                               class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-xs uppercase">
                                <i class="fas fa-eye"></i>
                            </a>
                            <button onclick="deleteLoan(${data})" 
                                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs uppercase">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }
            }
        ],
        pageLength: 10,
        lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
        pagingType: "full_numbers",
        order: [[1, 'asc']], // Default sort by provider
        responsive: true,
        language: {
            processing: "Loading...",
            emptyTable: "No loan details available",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            infoEmpty: "Showing 0 to 0 of 0 entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            lengthMenu: "Show _MENU_ entries",
            loadingRecords: "Loading...",
            // paginate: {
            //     first: "First",
            //     last: "Last",
            //     next: "Next",
            //     previous: "Previous"
            // },
            search: "Search:",
            zeroRecords: "No matching records found",
            paginate: {
                first: "«",
                last: "»",
                next: "›",
                previous: "‹"
            }
        },
        dom: '<"flex flex-col lg:flex-row justify-between items-center mb-4 space-y-2 lg:space-y-0"lf>rt<"flex flex-col lg:flex-row justify-between items-center mt-4 space-y-2 lg:space-y-0"ip>',
        className: "w-full text-sm text-left text-gray-500 dark:text-gray-400"
    };


    // Delete function (make it global so it can be called from rendered HTML)
    useEffect(() => {
        // Custom CSS for DataTables pagination styling
        const addCustomStyles = () => {
            const style = document.createElement('style');
            style.textContent = `
                /* DataTables pagination styling */
                .dataTables_paginate {
                    margin-top: 1rem;
                }
                
                .dataTables_paginate .paginate_button {
                    display: inline-block;
                    padding: 0.5rem 0.75rem;
                    margin: 0 0.125rem;
                    border: 1px solid #d1d5db;
                    background: #ffffff;
                    color: #374151;
                    text-decoration: none;
                    border-radius: 0.375rem;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }
                
                .dataTables_paginate .paginate_button:hover {
                    background: #f3f4f6;
                    border-color: #9ca3af;
                }
                
                .dataTables_paginate .paginate_button.current {
                    background: #3b82f6;
                    border-color: #3b82f6;
                    color: #ffffff;
                }
                
                .dataTables_paginate .paginate_button.current:hover {
                    background: #2563eb;
                    border-color: #2563eb;
                }
                
                .dataTables_paginate .paginate_button.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    pointer-events: none;
                }
                
                /* Dark mode pagination */
                .dark .dataTables_paginate .paginate_button {
                    background: #374151;
                    border-color: #4b5563;
                    color: #f9fafb;
                }
                
                .dark .dataTables_paginate .paginate_button:hover {
                    background: #4b5563;
                    border-color: #6b7280;
                }
                
                .dark .dataTables_paginate .paginate_button.current {
                    background: #3b82f6;
                    border-color: #3b82f6;
                }
                
                /* DataTables info styling */
                .dataTables_info {
                    color: #6b7280;
                    font-size: 0.875rem;
                }
                
                .dark .dataTables_info {
                    color: #9ca3af;
                }
                
                /* Length menu styling */
                .dataTables_length select {
                    padding: 0.25rem 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.375rem;
                    background: #ffffff;
                    color: #374151;
                    margin: 0 0.5rem;
                }
                
                .dark .dataTables_length select {
                    background: #374151;
                    border-color: #4b5563;
                    color: #f9fafb;
                }
                
                /* Search input styling */
                .dataTables_filter input {
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.375rem;
                    background: #ffffff;
                    color: #374151;
                    margin-left: 0.5rem;
                }
                
                .dark .dataTables_filter input {
                    background: #374151;
                    border-color: #4b5563;
                    color: #f9fafb;
                }
                
                /* Processing indicator */
                .dataTables_processing {
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    color: #374151;
                }
                
                .dark .dataTables_processing {
                    background: rgba(55, 65, 81, 0.9);
                    border-color: #4b5563;
                    color: #f9fafb;
                }
                ul.pagination {
                    display: flex;
                    list-style: none;
                    padding-left: 0;
                    justify-content: center; /* Center the pagination */
                    gap: 5px; /* Space between buttons */
                }

                ul.pagination li {
                    display: inline;
                }

                ul.pagination li button{
                    height: 35px;
                    width: 35px;
                    background-color: blue;
                    color: white;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                ul.pagination li a {
                    display: inline-block;
                    padding: 6px 12px;
                    margin: 0 2px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    background-color: #f9f9f9;
                    color: #333;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                ul.pagination li a:hover {
                    background-color: #007bff;
                    color: white;
                    border-color: #007bff;
                }

                ul.pagination li.active a,
                    ul.pagination li.active span {
                    background-color: #007bff;
                    color: white;
                    border-color: #007bff;
                    cursor: default;
                }

            `;
            document.head.appendChild(style);
        };

        addCustomStyles();

        window.deleteLoan = async (loanId) => {
            if (confirm('Are you sure you want to delete this loan?')) {
                try {
                    await axios.delete(`/loan-detail/${loanId}`, {
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        }
                    });

                    // Reload the DataTable
                    if (tableRef.current) {
                        tableRef.current.dt().ajax.reload();
                    }

                    // Show success message
                    alert('Loan deleted successfully!');
                } catch (error) {
                    console.error('Error deleting loan:', error);
                    alert('Error deleting loan. Please try again.');
                }
            }
        };

        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        // Cleanup
        return () => {
            delete window.deleteLoan;
        };
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Loan Detail
                    </h2>

                    <div className="flex space-x-4">
                        <button
                            onClick={handlePayment}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                        >
                            Pay Now!
                        </button>

                        <Link
                            href={route("loan-detail.create")}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                        >
                            Add Loan
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable
                                ref={tableRef}
                                options={dataTableOptions}
                                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                            >
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
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}