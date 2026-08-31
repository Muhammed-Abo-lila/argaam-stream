import useLang from "../../utils/useLang";
import ChannelCard from "../../components/common/ChannelCard/ChannelCard";
import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
const Channels = () => {
  const channelsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className="container-fluid px-5 mb-5 channels">
      <div className="mb-3 text-capitalize">
        <h4 className="mb-2 theme_text_main custom-fs-24-30 fw-semibold">{useLang("channels", "البرامج")}</h4>
        <p className="custom-fs-16 theme_text_secondary">
          {useLang(
            "argaam originals — video programmes covering saudi, gulf, and international markets.",
            "إنتاجات أرقام الأصلية — محتوى مرئي عن السوق السعودي والخليجي والعالمي.",
          )}
        </p>
      </div>

      <div className="row mx-0">
        {channelsData && channelsData?.length > 0 ? (
          channelsData.map((item, idx) => (
            <div
              key={idx}
              className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0"
            >
              <ChannelCard />
            </div>
          ))
        ) : (
          <EmptyComp
            titleEn="no channels listed"
            titleAr="لا توجد برامج مُدرجة"
            subTitleEn="there are no programmes available at the moment."
            subTitleAr="لا توجد برامج متاحة حاليًا."
          />
        )}
      </div>



    </div>
  )
};

export default Channels;
