import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function Textarea(
    { className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            className={
                'rounded-xl border-gray-200 bg-gray-50/50 shadow-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 ' +
                className
            }
            ref={localRef}
        ></textarea>
    );
});
