import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
import HomeSliderComp from "../../components/ui/HomeSliderComp/HomeSliderComp";
import ChannelCard from "../../components/common/ChannelCard/ChannelCard";
import { channels } from "../../data/channelsData";
import { getEpisodesSortedByViews, getLatestEpisodes } from "../../data/selectorFunctions";
const Home = () => {
  const episodesSortedByViews = getEpisodesSortedByViews();
  const latestEpisodes = getLatestEpisodes();
  console.log("latestEpisodes===>", latestEpisodes);

  return (
    <div className="container-fluid px-5 pb-5 mb-5">

      <div className="d-flex flex-column gap-5">

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
        {/* 
        <HomeSliderComp
          sectionTitle={useLang("argaam weekend", "أرقام ويك إند")}
          linkLabel={useLang("all episodes", "كل الحلقات")}
          link={`/${useLang("en", "ar")}/channel/weekend`}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        >
          <VideoCard />
        </HomeSliderComp>

        <HomeSliderComp
          sectionTitle="1+1"
          linkLabel={useLang("all episodes", "كل الحلقات")}
          link={`/${useLang("en", "ar")}/channel/1-plus-1`}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        >
          <VideoCard />
        </HomeSliderComp>

        <HomeSliderComp
          sectionTitle={useLang("argaam onPoint", "أرقام اون بوينت")}
          linkLabel={useLang("all episodes", "كل الحلقات")}
          link={`/${useLang("en", "ar")}/channel/onpoint`}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        >
          <VideoCard />
        </HomeSliderComp>

        <HomeSliderComp
          sectionTitle={useLang("with maryam", "مع مريم")}
          linkLabel={useLang("all episodes", "كل الحلقات")}
          link={`/${useLang("en", "ar")}/channel/maryam`}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        >
          <VideoCard />
        </HomeSliderComp>

        <HomeSliderComp
          sectionTitle={useLang("bebasata", "ببساطة")}
          linkLabel={useLang("all episodes", "كل الحلقات")}
          link={`/${useLang("en", "ar")}/channel/bebasata`}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        >
          <VideoCard />
        </HomeSliderComp>

        <HomeSliderComp
          sectionTitle={useLang("inside the fund", "في الصندوق")}
          linkLabel={useLang("all episodes", "كل الحلقات")}
          link={`/${useLang("en", "ar")}/channel/inside-the-fund`}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        >
          <VideoCard />
        </HomeSliderComp>

        <HomeSliderComp
          sectionTitle={useLang("nataej", "نتائج")}
          linkLabel={useLang("all episodes", "كل الحلقات")}
          link={`/${useLang("en", "ar")}/channel/nataej`}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        >
          <VideoCard />
        </HomeSliderComp> */}

      </div>

    </div>
  );
};

export default Home;
