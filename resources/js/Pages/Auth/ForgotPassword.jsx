import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Reset Password
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic px-4">
                    Enter your email address and we'll send you a link to choose a new one.
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-sm font-bold text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        placeholder="Enter your registered email"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-4 rounded-2xl text-md font-black shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 active:scale-[0.98] transition-all"
                        disabled={processing}
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        Send Reset Link
                    </PrimaryButton>
                </div>

                <div className="text-center mt-6">
                    <Link
                        href={route('login')}
                        className="text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors inline-flex items-center"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-xs" />
                        Back to Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
