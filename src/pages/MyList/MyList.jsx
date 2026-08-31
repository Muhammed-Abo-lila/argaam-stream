import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
const MyList = () => {
  const episodesData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className="container-fluid px-5 mb-5 browse-all">
      {/* page heder */}
      <div className=" mb-3 text-capitalize">
        <h4 className="mb-2 theme_text_main custom-fs-24-30 fw-semibold">{useLang("my list", "قائمتي")}</h4>
        <p className="m-0 theme_text_secondary custom-fs-16">48 {useLang("episodes", "حلقه")}</p>
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
