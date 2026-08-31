import { useState } from "react";
import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
import SortComp from "../../components/ui/SortComp/SortComp";
const BrowseAll = () => {
  const [activePlayList, setActivePlayList] = useState("all")
  const [activeSort, setActiveSort] = useState("newest")
  const playLists = [
    {
      name: useLang("all", "الكل"),
      key: "all"
    },
    {
      name: useLang("argaam weekend", "أرقام ويك اند"),
      key: "weekend"
    },
    {
      name: "1+1",
      key: "onePlusOne"
    },
    {
      name: useLang("argaam onPoint", "أرقام أون بوينت"),
      key: "onPoint"
    }, {
      name: useLang("with maryam", "مع مريم"),
      key: "withMaryam"
    },
    {
      name: useLang("bebasata", "ببساطه"),
      key: "bebasata"
    },
    {
      name: useLang("inside the fund", "داخل الصندوق"),
      key: "insideTheFund"
    },
    {
      name: useLang("nataej", "نتائج"),
      key: "nataej"
    }
  ]
  const episodesData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
  return (
    <div className="container-fluid px-5 mb-5 browse-all">
      {/* page heder */}
      <div className="mb-3 text-capitalize">
        <h4 className="mb-2 theme_text_main custom-fs-24-30 fw-semibold">{useLang("browse all", "تصفح الكل")}</h4>

        <div className="d-flex align-items-center gap-2 theme_text_secondary custom-fs-16">
          <p className="m-0 p-0">48 {useLang("episodes", "حلقه")}</p>
          <p className="m-0 p-0">.</p>
          <p className="m-0 p-0">7 {useLang("channels", "قناه")}</p>
        </div>

      </div>
      {/* playlists filter and videos sort */}
      <div className="playlists-filter d-flex justify-content-between align-items-center flex-wrap row-gap-2 my-3">
        {/* playlists filter */}
        <ul className="playlists list-unstyled d-flex flex-row flex-wrap gap-2">
          {playLists?.map((playList, idx) =>
            <li
              key={idx}
              className={`custom-fs-12 text-capitalize theme_text_secondary border rounded-5 px-3 py-1 cursor-pointer theme_bg_secondary d-flex justify-content-center align-items-center fw-bold ${activePlayList === playList?.key ? "active-playlist" : ""}`}
              style={{ borderColor: "var(--text_secondary)" }}
              onClick={() => setActivePlayList(playList?.key)}
            >
              <p className="m-0">
                {playList?.name}
              </p>
            </li>
          )}
        </ul>
        {/* videos sort */}
        <SortComp sortList={sortList} activeSort={activeSort} setActiveSort={setActiveSort} />
      </div>

      {/* videos */}
      <div className="row mx-0">
        {episodesData?.length > 0 ? (
          episodesData.map((item, idx) => (
            <div
              key={idx}
              className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0"
            >
              <VideoCard />
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
            btnFnc={() => setActivePlayList("all")}
          />
        )}
      </div>

    </div>
  );
};

export default BrowseAll;
