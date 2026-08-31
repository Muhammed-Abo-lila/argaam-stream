import { useState } from "react";
import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
import SortComp from "../../components/ui/SortComp/SortComp";
import { getEpisodesByChannelId } from "../../data/selectorFunctions";
import { channels } from "../../data/channelsData";
import { episodesData } from "../../data/episodesData";
import { getEpisodeLabel } from "../../utils/helpers";
const BrowseAll = () => {
  const lang=useLang("en","ar")
  const [activeChannelId, setActiveChannelId] = useState("all")
  const [activeSort, setActiveSort] = useState("newest")
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodesData);

  const handleSelectChannelAndFilterEpisodes = (channelId) => {
    setActiveChannelId(channelId)
    if (channelId === "all") {
      setFilteredEpisodes(episodesData);
      return;
    }
    const episodesByChannel = getEpisodesByChannelId(channelId);
    setFilteredEpisodes(episodesByChannel)
  }
  const sortList = [
    {
      key: "newest",
      label: useLang("newest", "الأحدث"),
    },
    {
      key: "mostWatched",
      label: useLang("most watched", "الأكثر مشاهدة"),
    },
  ];

  const sortedEpisodes = [...filteredEpisodes].sort((a, b) => {
    switch (activeSort) {
      case "newest":
        return new Date(b.publishedAt) - new Date(a.publishedAt);

      case "mostWatched":
        return b.views - a.views;

      default:
        return 0;
    }
  });

  return (
    <div className="container-fluid px-5 mb-5 browse-all">
      {/* page heder */}
      <div className="mb-3 text-capitalize">
        <h4 className="mb-2 theme_text_main custom-fs-24-30 fw-semibold">{useLang("browse all", "تصفح الكل")}</h4>

        <div className="d-flex align-items-center gap-2 theme_text_secondary custom-fs-16">
          <p className="m-0 p-0">{sortedEpisodes?.length} {getEpisodeLabel(sortedEpisodes?.length, lang)}</p>
          <p className="m-0 p-0">.</p>
          <p className="m-0 p-0">{channels?.length} {useLang("channels", "قنوات")}</p>
        </div>

      </div>
      {/* channels filter and episodes sort */}
      <div className="playlists-filter d-flex justify-content-between align-items-center flex-wrap row-gap-2 my-3">
        {/* channels filter */}
        <ul className="playlists list-unstyled d-flex flex-row flex-wrap gap-2">
          <li
            className={`custom-fs-12 text-capitalize theme_text_secondary border rounded-5 px-3 py-1 cursor-pointer theme_bg_secondary d-flex justify-content-center align-items-center fw-bold ${activeChannelId === "all" ? "active-playlist" : ""}`}
            style={{ borderColor: "var(--text_secondary)" }}
            onClick={() => handleSelectChannelAndFilterEpisodes("all")}
          >
            <p className="m-0">
              {useLang("all", "الكل")}
            </p>
          </li>
          {channels?.map((channel, idx) =>
            <li
              key={idx}
              className={`custom-fs-12 text-capitalize theme_text_secondary border rounded-5 px-3 py-1 cursor-pointer theme_bg_secondary d-flex justify-content-center align-items-center fw-bold ${activeChannelId === channel?.id ? "active-playlist" : ""}`}
              style={{ borderColor: "var(--text_secondary)" }}
              onClick={() => handleSelectChannelAndFilterEpisodes(channel?.id)}
            >
              <p className="m-0">
                {useLang(channel?.name?.en, channel?.name?.ar)}
              </p>
            </li>
          )}
        </ul>
        {/* episodes sort */}
        <SortComp sortList={sortList} activeSort={activeSort} setActiveSort={setActiveSort} />
      </div>

      {/* episodes */}
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
            btnLabelEn="all"
            btnLabelAr="الكل"
            btnFnc={() => handleSelectChannelAndFilterEpisodes("all")}
          />
        )}
      </div>

    </div>
  );
};

export default BrowseAll;
