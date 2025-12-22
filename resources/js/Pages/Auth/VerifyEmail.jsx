import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email" />

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Verify Your Email
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 px-4 italic">
                    Great to have you! Please verify your email address by clicking on the link we just sent.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-sm font-bold text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800">
                    A fresh verification link has been sent to your inbox.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="flex flex-col gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="w-full justify-center py-4 rounded-2xl text-md font-black shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 active:scale-[0.98] transition-all"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Resend Code
                    </PrimaryButton>

                    <div className="text-center">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm font-bold text-gray-400 hover:text-red-600 transition-colors inline-flex items-center"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-xs" />
                            Log Out
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
