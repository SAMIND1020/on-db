/* eslint-disable react/prop-types */
const Modal = ({ children }) => {
    return (
        <div className="w-full flex items-center justify-center h-full">
            <div className="flex flex-col h-fit p-4 bg-background dark:bg-background-dark rounded-lg shadow-sm">
                {children}
            </div>
        </div>
    );
};

export default Modal;
