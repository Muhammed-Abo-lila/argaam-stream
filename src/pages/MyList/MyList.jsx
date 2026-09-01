import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
import { episodesData } from "../../data/episodesData";
import { getEpisodeLabel } from "../../utils/helpers";
const MyList = () => {
  const lang = useLang("en", "ar");

  // get myList Ids from local storage
  const myListIds = JSON.parse(localStorage.getItem("myList") || "[]");

  // filter the episodes by myListIds to get speicific episodes added by user
  const myListEpisodes = episodesData.filter((episode) =>
    myListIds.includes(episode.id),
  );
  return (
    <div className="container-fluid my-5 browse-all">
      {/* page heder */}
      <div className=" mb-3 text-capitalize">
        <h4 className="mb-2 theme_text_main custom-fs-24-30 fw-semibold">
          {useLang("my list", "قائمتي")}
        </h4>
        <p className="m-0 theme_text_secondary custom-fs-16">
          {myListEpisodes?.length}{" "}
          {getEpisodeLabel(myListEpisodes?.length, lang)}
        </p>
      </div>

      {/* videos */}
      <div className="row mx-0">
        {myListEpisodes?.length > 0 ? (
          myListEpisodes?.map((episode, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0">
              <VideoCard videoData={episode} />
            </div>
          ))
        ) : (
          <EmptyComp
            titleEn="your list is empty"
            titleAr="قائمتك فارغة"
            subTitleEn="add episodes to your list to watch them later."
            subTitleAr="أضف حلقات إلى قائمتك لمشاهدتها لاحقاً."
            isLink={true}
            linkLabelEn="browse all"
            linkLabelAr="تصفح الكل"
            link="browse"
          />
        )}
      </div>
    </div>
  );
};

export default MyList;
