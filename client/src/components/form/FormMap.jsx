/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import CustomMarker from "../map/CustomMarker";
import SearchLocation from "../map/SearchLocation";
import FullScreenMapButton from "../map/FullScreenMapButton";
import Map from "../map/Map";
import useReverseGeocoding from "../../hooks/location/useReverseGeocoding";

import Alert from "../general/Alert";

const FormMap = ({
    label,
    centerLocation = [4.653374, -74.08363],
    onChange = () => {},
    alert = {},
    value = {},
}) => {
    // States
    const [isMapClickable, setIsMapClickable] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [markerPosition, setMarkerPosition] = useState();
    const [mapRef, setMapRef] = useState();
    const [fullscreen, setFullscreen] = useState(false);
    const [renderMap, setRenderMap] = useState(true);

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
        }, 2000);

        setTimeout(() => {
            setFullscreen(false);
        }, 3000);

        setIsEditing(true);
    };

    //To Re-render the map when fullscreen change
    useEffect(() => {
        setRenderMap(false);
        setTimeout(() => {
            setRenderMap(true);
        }, 50);
    }, [fullscreen]);

    //On reload or change page, show info
    useEffect(() => {
        if (!value.lat || !value.lng) return;
        if (!mapRef?._container || !renderMap || fullscreen) return;

        handleSetMarker({ latlng: value }, false);
        if (!markerPosition) return;
        setIsEditing(true);
        handleSetLocation(markerPosition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapRef, markerPosition]);

    return (
        <div
            className={
                !fullscreen
                    ? "flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 transition-all duration-200 ease-in-out"
                    : "absolute top-0 left-0 transition-all duration-200 ease-in-out"
            }
        >
            <label className="flex flex-col min-w-40 flex-1">
                <div
                    className={
                        !fullscreen ? "flex flex-row justify-between" : "hidden"
                    }
                >
                    <p className="text-text dark:text-text-dark text-base font-medium leading-normal pb-2">
                        {label}
                    </p>
                    {Object.keys(alert).length != 0 && (
                        <Alert type={alert.type} size="sm">
                            {alert.text}
                        </Alert>
                    )}
                </div>
                {renderMap && (
                    <Map
                        className={
                            !fullscreen
                                ? `h-[370px] max-w-[380px] rounded-xl overflow-hidden relative transition-all duration-200 ease-in-out`
                                : "relative h-screen w-screen p-5 overflow-hidden transition-all duration-200 ease-in-out"
                        }
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
                                    isEditing
                                        ? "Change Location"
                                        : "Set Location"
                                }
                            />
                        )}
                        <SearchLocation
                            onSelect={handleSearchSelect}
                            fullscreen={fullscreen}
                        />
                        <FullScreenMapButton
                            onClick={() => setFullscreen((s) => !s)}
                            fullscreen={fullscreen}
                        />
                    </Map>
                )}
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
