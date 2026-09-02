import EmptyComp from "../../components/EmptyComp/EmptyComp";
import VideoCard from "../../components/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
import { episodesData } from "../../data/episodesData";
import { getEpisodeLabel } from "../../utils/helpers";
import SectionHead from "../../components/SectionHead/SectionHead";
import PagesHeader from "../../components/PagesHeader/PagesHeader";
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
      {/* page header */}
      <PagesHeader
        pageTitle={useLang("my list", "قائمتي")}
        pageSubtitle={`${myListEpisodes?.length} ${getEpisodeLabel(myListEpisodes?.length, lang)}`}
      />
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
