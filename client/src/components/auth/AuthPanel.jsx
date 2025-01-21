/* eslint-disable react/prop-types */
import Button from "../general/Button";

const AuthPanel = ({ user = {}, onClick = () => {}, selectedPage }) => {
    return (
        <>
            {typeof user.name === "string" ? (
                <div className="flex flex-col">
                    <h1 className="text-text dark:text-text-dark text-base font-medium leading-normal">
                        {user.name}
                    </h1>
                    <p className="text-text2 dark:text-text2-dark text-sm font-normal leading-normal">
                        {user.email}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col rounded-xl shadow-md border border-selected dark:border-selected-dark">
                    <Button onClick={onClick} mode={2} rounded="md" shadow="md">
                        {selectedPage ? "Login" : "Close"}
                    </Button>
                </div>
            )}
        </>
    );
};

export default AuthPanel;
