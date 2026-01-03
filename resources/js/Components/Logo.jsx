import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";

export default function Logo({ className = '', ...props }) {
    return (
        <Link href={route('welcome')} className="flex items-center gap-3 group">
            <ApplicationLogo className="h-10 w-auto rounded-md shadow-sm" />
            <div className='flex flex-col leading-tight'>
                <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
                    EMI<span className="text-indigo-600 group-hover:text-indigo-500 transition-colors">Pro</span>
                </span>
                <span className="text-[10px] tracking-wider font-medium text-gray-500 dark:text-gray-400">
                    Your EMI, Under Control
                </span>
            </div>
        </Link>
    );
}
