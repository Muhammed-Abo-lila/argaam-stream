import { Navigate, redirect, useParams } from "react-router-dom";
import VideoCard from "../../components/common/VideoCard/VideoCard";
import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
import SortComp from "../../components/ui/SortComp/SortComp";
import useLang from "../../utils/useLang";
import { useState } from "react";
import { getEpisodesByChannelId } from "../../data/selectorFunctions";
import { channels } from "../../data/channelsData";
const channel = () => {
    const { id } = useParams();
    const [activeSort, setActiveSort] = useState("newest")
    const episodesByChannel = getEpisodesByChannelId(id);
    const sortList = [
        {
            key: "newest",
            label: useLang("newest", "الأحدث"),
        },
        {
            key: "oldest",
            label: useLang("oldest", "الأقدم"),
        },
        {
            key: "mostWatched",
            label: useLang("most watched", "الأكثر مشاهدة"),
        },
    ];
    const sortedEpisodes = [...episodesByChannel].sort((a, b) => {
        switch (activeSort) {
            case "newest":
                return b.number - a.number;

            case "oldest":
                return a.number - b.number;

            case "mostWatched":
                return b.views - a.views;

            default:
                return 0;
        }
    });
    const isChannelIdValid = channels?.some((channel) => channel?.id === id);
    if (!isChannelIdValid) { return (<Navigate to={`/${useLang("en", "ar")}/not-found`} replace />) }
    return (
        <div className="container-fluid px-5 mb-5">
            {/*section header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                {/* playlists Title */}
                <h4 className="custom-fs-16 text-capitalize theme_text_secondary">{useLang("all episodes", "كل الحلقات")}</h4>
                {/* videos sort */}
                <SortComp sortList={sortList} activeSort={activeSort} setActiveSort={setActiveSort} />
            </div>
            {/* section episode */}
            <div className="row mx-0">
                {sortedEpisodes?.length > 0 ? (
                    sortedEpisodes.map((episode, idx) => (
                        <div
                            key={idx}
                            className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0"
                        >
                            <VideoCard videoData={episode} />
                        </div>
                    ))
                ) : (
                    <EmptyComp
                        titleEn="no episodes listed"
                        titleAr="لا توجد حلقات مُدرجة"
                        subTitleEn="this show has launched, but no episodes are published on argaam’s youTube channel yet, so there is nothing to play here."
                        subTitleAr="انطلق هذا البرنامج، لكن لا توجد له حلقات منشورة على قناة أرقام في يوتيوب حتى الآن، فلا يمكن تشغيله هنا."
                        isLink={true}
                        linkLabelEn="browse all"
                        linkLabelAr="تصفح الكل"
                        link="browse"
                    />
                )}
            </div>
        </div>
    )
}
export default channel
