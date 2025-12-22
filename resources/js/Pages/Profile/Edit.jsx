import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faShieldAlt,
    faTrashAlt,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 leading-tight">
                            Account Settings
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage your personal information and security preferences
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
            <Head title="Profile" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
                    {/* Profile Info Section */}
                    <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                                <FontAwesomeIcon icon={faUserCircle} className="mr-3 text-indigo-500 text-xl" />
                                Profile Information
                            </h3>
                        </div>
                        <div className="p-6 sm:p-8">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-2xl"
                            />
                        </div>
                    </div>

                    {/* Password Update Section */}
                    <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                                <FontAwesomeIcon icon={faShieldAlt} className="mr-3 text-indigo-500 text-xl" />
                                Security & Password
                            </h3>
                        </div>
                        <div className="p-6 sm:p-8">
                            <UpdatePasswordForm className="max-w-2xl" />
                        </div>
                    </div>

                    {/* Danger Zone Section */}
                    <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-2xl border border-red-100 dark:border-red-900/30 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-red-50/30 dark:bg-red-900/10">
                            <h3 className="font-bold text-red-600 dark:text-red-400 flex items-center">
                                <FontAwesomeIcon icon={faTrashAlt} className="mr-3 text-xl" />
                                Danger Zone
                            </h3>
                        </div>
                        <div className="p-6 sm:p-8">
                            <DeleteUserForm className="max-w-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
