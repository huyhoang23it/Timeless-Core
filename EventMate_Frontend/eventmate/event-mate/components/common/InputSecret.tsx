import React, { ChangeEventHandler, MouseEventHandler, useState } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    disable?: boolean;
    className?: string;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onClick?: MouseEventHandler<HTMLInputElement> | undefined;
    isFull?: boolean;
    isCreate?: boolean;
}

export const InputSecret: React.FC<Props> = ({
    disable = false,
    className = '',
    placeholder,
    defaultValue,
    value,
    onChange,
    onClick,
    isFull = false,
    isCreate = true,
    ...props
}) => {
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
    };
    return (
        <div className={`flex flex-col gap-2 ${isFull && 'w-full'}`}>
            <div className={`flex items-center ${isFull && 'w-full'}`}>
                <input
                    placeholder={placeholder}
                    type={isRevealPassword ? 'text' : 'password'}
                    id={placeholder}
                    defaultValue={defaultValue}
                    readOnly={disable}
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                    className={`${className || 'm-1 p-1 border rounded-lg border-primary-500'} ${
                        disable ? 'bg-gray-100' : ''
                    }`}
                    autoComplete={isCreate ? 'new-password' : 'on'}
                    {...props}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    onClick={togglePassword}
                    className="relative right-8 bg-transparent"
                >
                    {isRevealPassword ? (
                        <svg
                            width="16px"
                            height="18px"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-3 -2.2)">
                                <path
                                    d="M3 3L21 21"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.5 10.6771C10.1888 11.0296 10 11.4928 10 12C10 13.1045 10.8954 14 12 14C12.5072 14 12.9703 13.8112 13.3229 13.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7.36185 7.5611C5.68002 8.73968 4.27894 10.4188 3 12C4.88856 14.991 8.2817 18 12 18C13.5499 18 15.0434 17.4772 16.3949 16.6508"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 6C16.0084 6 18.7015 9.1582 21 12C20.6815 12.5043 20.3203 13.0092 19.922 13.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    ) : (
                        <svg
                            width="16px"
                            height="18px"
                            viewBox="0 0 18 18"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g data-name="Layer 2" transform="translate(-3 -2.2)">
                                <g data-name="eye">
                                    <rect width="10" height="10" opacity="0" />
                                    <path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z" />
                                    <path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z" />
                                </g>
                            </g>
                        </svg>
                    )}
                </svg>
            </div>
        </div>
    );
};
