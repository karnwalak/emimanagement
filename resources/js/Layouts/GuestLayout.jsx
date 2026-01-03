import NavBar from '@/Components/NavBar';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F8FAFC] dark:bg-[#0F172A] sm:justify-center relative overflow-hidden selection:bg-indigo-500 selection:text-white">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <NavBar />

            <div className="relative z-10 mt-28 w-full overflow-hidden bg-white/80 backdrop-blur-xl dark:bg-gray-800/80 px-8 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:max-w-md sm:rounded-[2.5rem] border border-white/20 dark:border-gray-700/50">
                {children}
            </div>

            <p className="relative z-10 mt-8 text-sm text-gray-400 dark:text-gray-500 font-medium tracking-wide">
                &copy; {new Date().getFullYear()} EMIManagement. Premium Finance Tracking.
            </p>
        </div>
    );
}
