/* eslint-disable react/prop-types */
const FullScreenMapButton = ({ onClick, fullscreen }) => {
    return (
        <div className="relative z-[400]">
            <div className="w-60 absolute left-0 top-[75px]">
                <button
                    className="ml-[10px] mt-1 bg-white px-1 pt-1 hover:bg-slate-300 rounded-md border border-slate-500"
                    onClick={onClick}
                >
                    <span className="material-icons-outlined">
                        {!fullscreen ? "fullscreen" : "fullscreen_exit"}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default FullScreenMapButton;
