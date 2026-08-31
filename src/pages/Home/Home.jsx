import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
import HomeSliderComp from "../../components/ui/HomeSliderComp/HomeSliderComp";
import ChannelCard from "../../components/common/ChannelCard/ChannelCard";
import { channels } from "../../data/channelsData";
import { getEpisodesByChannelId, getEpisodesSortedByViews, getLatestEpisodes } from "../../data/selectorFunctions";
import HeroSection from "../../layouts/HeroSection/HeroSection";
const Home = () => {
  const episodesSortedByViews = getEpisodesSortedByViews();
  const latestEpisodes = getLatestEpisodes();
  return (
    <>
      <HeroSection />
      <div className="container-fluid pb-5 mb-5">
        <div className="d-flex flex-column gap-5">
          <HomeSliderComp
            sectionTitle={useLang("argaam originals", "إنتاجات أرقام الأصلية")}
            linkLabel={useLang("browse all", "تصفح الكل")}
            link={`/${useLang("en", "ar")}/channels`}
            data={channels}
            renderItem={(channel) => <ChannelCard channel={channel} />}
          />

          <HomeSliderComp
            sectionTitle={useLang("most watched", "الأكثر مشاهدة")}
            linkLabel={useLang("more", "المزيد")}
            link={`/${useLang("en", "ar")}/browse`}
            data={episodesSortedByViews?.slice(0, 12)}
            renderItem={(video) => <VideoCard videoData={video} />}
          />

        <HomeSliderComp
          sectionTitle={useLang("argaam originals", "إنتاجات أرقام الأصلية")}
          linkLabel={useLang("browse all", "تصفح الكل")}
          link={`/${useLang("en", "ar")}/channels`}
          data={channels}
          renderItem={(channel) => (
            <ChannelCard channel={channel} />
          )}
        />

        <HomeSliderComp
          sectionTitle={useLang("most watched", "الأكثر مشاهدة")}
          linkLabel={useLang("more", "المزيد")}
          link={`/${useLang("en", "ar")}/browse`}
          data={episodesSortedByViews?.slice(0, 12)}
          renderItem={(video) => (
            <VideoCard videoData={video} />
          )}
        />

        <HomeSliderComp
          sectionTitle={useLang("latest episodes", "أحدث الحلقات")}
          linkLabel={useLang("more", "المزيد")}
          link={`/${useLang("en", "ar")}/browse`}
          data={latestEpisodes?.slice(0, 12)}
          renderItem={(video) => (
            <VideoCard videoData={video} />
          )}
        />

        {channels?.map((channel, idx) => {
          const episodesByChannel = getEpisodesByChannelId(channel?.id);
          if (episodesByChannel?.length <= 0) return null;
          return (
            <HomeSliderComp
              key={channel?.channelId || idx}
              sectionTitle={useLang(
                channel?.name?.en,
                channel?.name?.ar
              )}
              linkLabel={useLang("all episodes", "كل الحلقات")}
              link={`/${useLang("en", "ar")}/channel/${channel?.id}`}
              data={episodesByChannel?.slice(0, 12)}
              renderItem={(video) => (
                <VideoCard videoData={video} />
              )}
            />
          );
        })}

      </div>
      </div>
    </>
  );
};

export default Home;
