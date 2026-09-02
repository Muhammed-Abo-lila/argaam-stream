import useLang from "../../utils/useLang";
import ChannelCard from "../../components/ChannelCard/ChannelCard";
import EmptyComp from "../../components/EmptyComp/EmptyComp";
import { channels } from "../../data/channelsData";
import SectionHead from "../../components/SectionHead/SectionHead";
import PagesHeader from "../../components/PagesHeader/PagesHeader";
const Channels = () => {
  return (
    <div className="container-fluid my-5 channels">
      <PagesHeader
        pageTitle={useLang("channels", "البرامج")}
        pageSubtitle={useLang(
          "argaam originals — video programmes covering saudi, gulf, and international markets.",
          "إنتاجات أرقام الأصلية — محتوى مرئي عن السوق السعودي والخليجي والعالمي.",
        )} />
      <div className="row mx-0">
        {channels && channels?.length > 0 ? (
          channels.map((channel, idx) => (
            <div
              key={idx}
              className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0"
            >
              <ChannelCard channel={channel} />
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