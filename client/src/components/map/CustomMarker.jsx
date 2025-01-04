/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ position, info, onButtonClick, buttonText }) => {
    return (
        <Marker position={position}>
            <Popup>
                <div className="font-sans">
                    <p className="font-medium text-base w-48 line-clamp-2">
                        {info.name}
                    </p>
                    <button className="transition-all flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-7 px-2 bg-primary dark:bg-primary-dark font-bold hover:bg-hover dark:hover:bg-hover-dark text-secondary dark:text-secondary-dark">
                        <span
                            className="truncate"
                            onClick={() => onButtonClick(position)}
                        >
                            {buttonText}
                        </span>
                    </button>
                </div>
            </Popup>
        </Marker>
    );
};

export default CustomMarker;
