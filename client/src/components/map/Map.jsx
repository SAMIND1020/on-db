/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const Map = ({
    className = "w-screen h-screen",
    scrollWheelZoom = false,
    centerLocation = [0, 0],
    initialZoom = 12,
    onClick = () => {},
    onDoubleClick = () => {},
    children,
    setMapRef = () => {},
}) => {
    useEffect(() => {
        if (setMapRef) {
            setMapRef(null);
        }
    }, [setMapRef]);

    return (
        <div className={className}>
            <MapContainer
                className="h-full w-full"
                center={centerLocation}
                zoom={initialZoom}
                scrollWheelZoom={scrollWheelZoom}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapContent
                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    setMapRef={setMapRef}
                >
                    {children}
                </MapContent>
            </MapContainer>
        </div>
    );
};

const MapContent = ({ children, onClick, onDoubleClick, setMapRef }) => {
    const map = useMapEvents({
        click: (event) => onClick(event),
        dblclick: (event) => onDoubleClick(event),
    });

    map.doubleClickZoom.disable();

    useEffect(() => {
        if (setMapRef) {
            setMapRef(map);
        }
    }, [map, setMapRef]);

    return children;
};

export default Map;
