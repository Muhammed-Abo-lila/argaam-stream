import { Link, useParams } from "react-router-dom";
import VideoCard from "../../components/common/VideoCard/VideoCard";
import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
import SortComp from "../../components/ui/SortComp/SortComp";
import useLang from "../../utils/useLang";
import { useState } from "react";
import {
  getChannelByChannelId,
  getEpisodesByChannelId,
} from "../../data/selectorFunctions";
const Channel = () => {
  const { id } = useParams();
  const [activeSort, setActiveSort] = useState("newest");
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
  const channelDetails = getChannelByChannelId(id);
  return (
    <>



      <div className="channel-heroSection">
        <div className="channel-wrapper">
          <img src={channelDetails?.cover} alt="card img" />
        </div>
        <div className="channel-overlay"></div>
        <div className="container-fluid">
          <div className="channel-details mb-5">
            <span
              style={{
                display: "block",
                width: "60px",
                height: "2px",
                marginBlockEnd: "20px",
              }}
            ></span>
            <h3 className="text-white custom-fs-24-30">
              {useLang(channelDetails?.name?.en, channelDetails?.name?.ar)}
            </h3>
            <p>
              {useLang(
                channelDetails?.description?.en,
                channelDetails?.description?.ar,
              )}
            </p>
            <div className="channel-meta">
              <span>
                {useLang(channelDetails?.kicker?.en, channelDetails?.kicker?.ar)}
              </span>
              <span>.</span>
              <span>
                {useLang("Hosted by", "يقدّمه")}{" "}
                {useLang(channelDetails?.host?.en, channelDetails?.host?.ar)}
              </span>
              <span>.</span>
              <span>
                {useLang("Launched", "انطلق")}{" "}
                <span class="ag-num">{channelDetails?.launchedAt}</span>
              </span>
              <span>.</span>
              <span>
                <span class="ag-num">{episodesByChannel?.length}</span>{" "}
                {useLang("episodes", "حلقة")}
              </span>
            </div>
            <Link
              className="btn--primary"
              to={`/${useLang("en", "ar")}/watch/${sortedEpisodes[0]?.id}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.6-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2Z"></path>
              </svg>
              {useLang("Play", "تشغيل")}
            </Link>
          </div>
        </div>
      </div>



      <div className="container-fluid my-5">
        {/*section header */}
        <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
          {/* playlists Title */}
          <h4 className="custom-fs-16 text-capitalize theme_text_secondary">
            {useLang("all episodes", "كل الحلقات")}
          </h4>
          {/* videos sort */}
          <SortComp
            sortList={sortList}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
          />
        </div>
        {/* section episode */}
        <div className="row mx-0">
          {sortedEpisodes?.length > 0 ? (
            sortedEpisodes.map((episode, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0">
                <VideoCard videoData={episode} />
              </div>
            ))
          ) : (
            <EmptyComp
              titleEn="this show has not launched yet"
              titleAr="لا توجد حلقات مُدرجة"
              subTitleEn="The episode schedule will appear here as soon as the show launches."
              subTitleAr="انطلق هذا البرنامج، لكن لا توجد له حلقات منشورة على قناة أرقام في يوتيوب حتى الآن، فلا يمكن تشغيله هنا."
              isLink={true}
              linkLabelEn="browse all"
              linkLabelAr="تصفح الكل"
              link="browse"
            />
          )}
        </div>
      </div>
      
    </>
  );
};
export default Channel;
