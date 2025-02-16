"use client";
import React, { MouseEvent, useState } from 'react';
import classNames from '@/ultilities/common/classNames';

type ToastMessageProps = {
    message: string;
};

const ToastMessage = ({ message }: ToastMessageProps) => {
    const words = message.split(' ');
    const [showFullMessage, setShowFullMessage] = useState(false);
    const isLongMessage = words.length > 10;


    const toggleMessage = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setShowFullMessage((pre) => !pre);
    };

    return (
        <div
            className={classNames(
                showFullMessage ? 'md:min-w-[550px] toast-box-shadow' : 'md:whitespace-nowrap'
            )}
        >
            {isLongMessage && !showFullMessage ? (
                <>
                    {words.slice(0, 10).join(' ')}...{' '}
                    <span onClick={toggleMessage} className="italic text-sm font-semibold">
                        view more
                    </span>
                </>
            ) : (
                message
            )}
        </div>
    );
};

export default ToastMessage;
