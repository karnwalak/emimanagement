import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faList,
    faUser,
    faWallet,
    faCalendarCheck,
    faChartLine,
    faHandHoldingUsd
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 leading-tight">
                            Welcome Back, {auth.user.name.split(' ')[0]}!
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your loans today.</p>
                    </div>

                    <Link
                        href={route("loan-detail.create")}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all hover:bg-indigo-700 hover:-translate-y-0.5"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        New Loan
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Welcome Banner / Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                                    <FontAwesomeIcon icon={faWallet} className="text-indigo-600 dark:text-indigo-400 text-xl" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-lg">Overview</span>
                            </div>
                            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Loans</h4>
                            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">Ready to manage</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                                    <FontAwesomeIcon icon={faCalendarCheck} className="text-purple-600 dark:text-purple-400 text-xl" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-lg">Today</span>
                            </div>
                            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Monthly EMIs</h4>
                            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">Track your dues</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
                                    <FontAwesomeIcon icon={faChartLine} className="text-green-600 dark:text-green-400 text-xl" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">Saving</span>
                            </div>
                            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Repayment Health</h4>
                            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">Excellent standing</p>
                        </div>
                    </div>

                    {/* Quick Action Navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Manage Loans Card */}
                        <Link
                            href={route("loan-detail.index")}
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 group hover:border-indigo-500 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FontAwesomeIcon icon={faList} size="5x" />
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg">
                                    <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" />
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Loan Registry</h3>
                            <p className="text-gray-500 dark:text-gray-400 line-clamp-2">Access your full list of loans, track EMI schedules, and manage payments in one central place.</p>
                            <div className="mt-6 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                Go to registry
                                <FontAwesomeIcon icon={faList} className="ml-2" />
                            </div>
                        </Link>

                        {/* Profile Settings Card */}
                        <Link
                            href={route("profile.edit")}
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 group hover:border-purple-500 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-purple-600">
                                <FontAwesomeIcon icon={faUser} size="5x" />
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-4 bg-purple-600 text-white rounded-2xl shadow-lg">
                                    <FontAwesomeIcon icon={faUser} size="2x" />
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Account Control</h3>
                            <p className="text-gray-500 dark:text-gray-400 line-clamp-2">Update your profile, secure your account with a new password, or manage your personal notification settings.</p>
                            <div className="mt-6 inline-flex items-center text-purple-600 dark:text-purple-400 font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                Edit Profile
                                <FontAwesomeIcon icon={faUser} className="ml-2" />
                            </div>
                        </Link>
                    </div>

                    {/* Placeholder Content for a complete look */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                            <div>
                                <h3 className="text-2xl font-black mb-2">Manage your finances like a pro.</h3>
                                <p className="text-indigo-100 max-w-xl">Our system helps you keep track of every single EMI so you never miss a payment and always know your outstanding principal.</p>
                            </div>
                            <Link
                                href={route("loan-detail.create")}
                                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-black uppercase tracking-widest shadow-xl hover:bg-gray-50 transition-all active:scale-95 whitespace-nowrap"
                            >
                                Start New Entry
                            </Link>
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-400/20 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
