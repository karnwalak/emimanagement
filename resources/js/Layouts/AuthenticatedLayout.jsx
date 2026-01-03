import NavBar from '@/Components/NavBar';

export default function AuthenticatedLayout({ header, children }) {

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] selection:bg-indigo-500 selection:text-white pt-20">
            <NavBar />

            {header && (
                <header className="bg-white/40 dark:bg-gray-800/40 border-b border-gray-200 dark:border-gray-700">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
