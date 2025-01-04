/* eslint-disable react/prop-types */
import { useState } from "react";

import CustomMarker from "../map/CustomMarker";
import SearchLocation from "../map/SearchLocation";
import Map from "../map/Map";
import useReverseGeocoding from "../../hooks/location/useReverseGeocoding";

const FormMap = ({
    label,
    centerLocation = [4.653374, -74.08363],
    onChange = () => {},
}) => {
    // States
    const [isMapClickable, setIsMapClickable] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [markerPosition, setMarkerPosition] = useState();
    const [mapRef, setMapRef] = useState();

    // Use the custom hook
    const { info: markerInfo, setFetch: setFetch } =
        useReverseGeocoding(markerPosition);

    const handleSetMarker = (info, fetch = true) => {
        const { latlng } = info;

        if (!latlng) return;

        if (!fetch) {
            const afterFetch = setFetch(info);
            setMarkerPosition(latlng);
            afterFetch();
        } else setMarkerPosition(latlng);

        mapRef.flyTo(latlng, mapRef.getZoom());
    };

    const handleClickMap = (event) => {
        const { latlng, originalEvent } = event;
        if (originalEvent.target !== mapRef?._container) return;
        if (!latlng || !isMapClickable) return;

        handleSetMarker(event);
    };

    const handleSearchSelect = (s) => {
        if (!s?.lat || !s?.lon || !isMapClickable) return;

        handleSetMarker({ ...s, latlng: { lat: s.lat, lng: s.lon } }, false);
    };

    const handleSetLocation = (latlng) => {
        if (!mapRef) return;

        setIsMapClickable(isEditing); // Enable map for interaction
        configureMap(mapRef, isEditing);
        if (isEditing) return setIsEditing(false);

        // Enter selection mode
        const previousZoom = mapRef.getZoom();

        onChange({ latlng });

        mapRef.flyTo(latlng, 15);

        // Return to the previous zoom level after 3.5 seconds
        setTimeout(() => {
            mapRef.flyTo(latlng, previousZoom);
        }, 3500);

        setIsEditing(true);
    };

    return (
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
                <p className="text-text dark:text-text-dark text-base font-medium leading-normal pb-2">
                    {label}
                </p>
                <Map
                    className={`h-[380px] max-w-[380px] rounded-xl overflow-hidden relative`}
                    scrollWheelZoom={true}
                    centerLocation={centerLocation}
                    initialZoom={11}
                    onClick={handleClickMap}
                    setMapRef={setMapRef}
                >
                    {markerPosition && markerInfo && (
                        <CustomMarker
                            info={markerInfo}
                            position={markerPosition}
                            onButtonClick={handleSetLocation}
                            buttonText={
                                isEditing ? "Change Location" : "Set Location"
                            }
                        />
                    )}
                    <SearchLocation onSelect={handleSearchSelect} />
                </Map>
            </label>
        </div>
    );
};

const configureMap = (map, isEnabled) => {
    const actions = isEnabled ? "enable" : "disable";
    const mapMethods = [
        map.scrollWheelZoom,
        map.dragging,
        map.touchZoom,
        map.zoomControl,
    ];

    mapMethods.forEach((method) => method[actions]());
};

export default FormMap;
