'@typescript-eslint/no-empty-object-type'
import ToastMessage from '@/components/generator/ToastMessage';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '@/public';
import { toast as reactToastify, ToastOptions, TypeOptions } from 'react-toastify';

/** Functions for configurations */
const DEFAULT_AUTO_CLOSE_SHORT_TEXT = 3000;
const DEFAULT_AUTO_CLOSE_LONG_TEXT = 5000;

const countWords = (str: string) => {
    // Use a regular expression to match words
    const words = str.match(/\b\w+\b/g);
    return words ? words.length : 0;
};

const getAutoCloseTime = (msg: string) => {
    const numOfWords = countWords(msg);

    return numOfWords <= 5 ? DEFAULT_AUTO_CLOSE_SHORT_TEXT : DEFAULT_AUTO_CLOSE_LONG_TEXT;
};

const mappingTypeToIcon: { [key in TypeOptions]: React.ReactElement } = {
    warning: <WarningIcon />,
    success: <SuccessIcon />,
    info: <InfoIcon />,
    error: <ErrorIcon />,
    default: <InfoIcon />,
};

const getIconByType = (type: TypeOptions): React.ReactElement => {
    return mappingTypeToIcon[type];
};

/** Global variables */
let currentToastId: number | string = '';
const setCurrentToastId = (id: number | string) => {
    currentToastId = id;
};

let currentMessage: string = '';
const setCurrentMessage = (msg: string) => {
    currentMessage = msg;
};

let numOfSameMessage: number = 0;
const setNumOfSameMessage = (num: number) => {
    numOfSameMessage = num;
};

/** Functions for showing the toast */
const getHandledMessage = (newMsg: string) => {
    // If the same message is repeated, whe should show the number of repeat
    if (newMsg === currentMessage) {
        setNumOfSameMessage(numOfSameMessage + 1);

        return `${newMsg} (${numOfSameMessage} times)`;
    }

    setCurrentMessage(newMsg);
    setNumOfSameMessage(1);

    return newMsg;
};

const handleCloseToast = () => {
    setCurrentToastId('');
    setCurrentMessage('');
    setNumOfSameMessage(0);
};

const openToastMessage = (
    message: string,
    type: TypeOptions,
    options?: ToastOptions<object> | undefined
) => {
    const autoClose = options?.autoClose || getAutoCloseTime(message);
    const handledMessage = getHandledMessage(message);
    // Show the new toast and save its ID
    const id = reactToastify(<ToastMessage message={handledMessage} />, {
        ...options,
        type,
        delay: 0,
        autoClose,
        onClose: handleCloseToast,
    });
    setCurrentToastId(id);
};

const showToast = (message: string, type: TypeOptions, options?: ToastOptions<object> | undefined) => {
    reactToastify.clearWaitingQueue();
    const autoClose = options?.autoClose || getAutoCloseTime(message);

    if (!!currentToastId) {
        console.log("currentToastId", currentToastId);
        const handledMessage = getHandledMessage(message);
        // If there is an existing toast, update it
        reactToastify.update(currentToastId, {
            render: <ToastMessage message={handledMessage} />,
            autoClose,
            onClose: handleCloseToast,
            type,
            icon: getIconByType(type),
        });
    } else {
        console.log("else");
        openToastMessage(message, type, options);
    }
};

/** Helper functions for user */
const error = (msg: string, options?: ToastOptions<object> | undefined) => {
    showToast(msg, 'error', { ...options, icon: getIconByType('error') });
};

const info = (msg: string, options?: ToastOptions<object> | undefined) => {
    showToast(msg, 'info', {
        ...options,
        icon: getIconByType('info'),
    });
};

const success = (msg: string, options?: ToastOptions<object> | undefined) => {
    showToast(msg, 'success', { ...options, icon: getIconByType('success') });
};

const warning = (msg: string, options?: ToastOptions<object> | undefined) => {
    showToast(msg, 'warning', {
        ...options,
        icon: getIconByType('warning'),
    });
};

export const toast = {
    error,
    info,
    warning,
    success,
    default: info,
};
