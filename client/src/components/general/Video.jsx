/* eslint-disable react/prop-types */
const Video = ({ videoId, height = 315, width = 560, rounded = "xl" }) => {
    return (
        <div className="w-fit">
            <div
                className={`w-[${width}] h-[${height}px] rounded-${rounded} overflow-hidden`}
            >
                {typeof videoId === "string" && videoId != "" ? (
                    <iframe
                        width={width}
                        height={height}
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    />
                ) : (
                    <p className="text-text dark:text-text-dark">
                        Video No Disponible
                    </p>
                )}
            </div>
        </div>
    );
};

export default Video;
