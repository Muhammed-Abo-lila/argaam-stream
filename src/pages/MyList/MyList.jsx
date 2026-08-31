import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
import { episodesData } from "../../data/episodesData";
import { getEpisodeLabel } from "../../utils/helpers";
const MyList = () => {
  const lang=useLang("en","ar")
  const wishlistEpisodes=episodesData?.slice(0,5)
  return (
    <div className="container-fluid px-5 mb-5 browse-all">
      {/* page heder */}
      <div className=" mb-3 text-capitalize">
        <h4 className="mb-2 theme_text_main custom-fs-24-30 fw-semibold">{useLang("my list", "قائمتي")}</h4>
        <p className="m-0 theme_text_secondary custom-fs-16">{wishlistEpisodes?.length} {getEpisodeLabel(wishlistEpisodes?.length, lang)}</p>
      </div>

      {/* videos */}
      <div className="row mx-0">
        {wishlistEpisodes?.length > 0 ? (
          wishlistEpisodes?.map((episode, idx) => (
            <div
              key={idx}
              className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0"
            >
              <VideoCard videoData={episode}/>
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
  )
};

export default MyList;
