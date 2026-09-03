import { useEffect, useRef } from "react";
import YouTube from "react-youtube";


export default function Player({
    episodeId,
    videoId,
    title,
    lang,
    startSeconds = 0,
    onProgress,
}) {
    const playerRef = useRef(null);
    const timerRef = useRef(null);
    const onProgressRef = useRef(onProgress);
    onProgressRef.current = onProgress;

    const progressTrackableEpisodes = (currentTime, fraction) => {
        const stored = JSON.parse(localStorage.getItem("videoProgress") || "{}");
        if (fraction >= 1) {
            delete stored[episodeId];
        } else {
            stored[episodeId] = { currentTime, fraction };
        }

        localStorage.setItem("videoProgress", JSON.stringify(stored));
    };

    const handleReady = (event) => {
        playerRef.current = event.target;
        timerRef.current = setInterval(() => {
            const player = playerRef.current;
            if (!player) return;
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            if (duration <= 0) return;
            const fraction = currentTime / duration;
            progressTrackableEpisodes(currentTime, fraction);
            onProgressRef.current?.(currentTime, fraction);
        }, 4000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            const player = playerRef.current;

            if (!player) return;

            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();

            if (duration > 0) {
                const fraction = currentTime / duration;
                onProgressRef.current?.(currentTime, fraction);
            }

            player.destroy();
            playerRef.current = null;
        };
    }, [videoId]);

    return (
        <YouTube
            videoId={videoId}
            title={title}
            iframeClassName="w-100 h-100 d-block"
            opts={{
                playerVars: {
                    autoplay: 1,
                    rel: 0,
                    modestbranding: 1,
                    hl: lang,
                    start: Math.floor(startSeconds),
                },
            }}
            onReady={handleReady}
        />
    );
}