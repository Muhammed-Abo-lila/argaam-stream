import { useSearchParams } from "react-router-dom";
import useLang from "../../utils/useLang";
import { useMemo } from "react";
import { episodesData } from "../../data/episodesData";
import { channels } from "../../data/channelsData";
import ChannelCard from "../../components/ChannelCard/ChannelCard";
import VideoCard from "../../components/VideoCard/VideoCard";
import PagesHeader from "../../components/PagesHeader/PagesHeader";
import EmptyComp from "../../components/EmptyComp/EmptyComp";

const Search = () => {
  const lang = useLang("en", "ar");
  const [searchParams] = useSearchParams();
  // get search value
  const searchTerm = searchParams.get("q") || "";
  // search results data using useMemo to prevent filtering in every render
  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return {
        channels: [],
        episodes: [],
      };
    }

    const filteredChannels = channels.filter((channel) => {
      return (
        channel.name.ar.toLowerCase().includes(query) ||
        channel.name.en.toLowerCase().includes(query)
      );
    });

    const filteredEpisodes = episodesData.filter((episode) => {
      return (
        episode.title.ar.toLowerCase().includes(query) ||
        episode.title.en.toLowerCase().includes(query)
      );
    });

    return {
      channels: filteredChannels,
      episodes: filteredEpisodes,
    };
  }, [searchTerm]);

  return (
    <div className="container theme_text_main py-5">
      <PagesHeader pageTitle={useLang("search results", "نتائج البحث")} />
      {searchResults.channels.length > 0 ||
        searchResults.episodes.length > 0 ? (
        <p className="custom-fs-16 fw-bold theme_text_secondary mb-4">
          "{searchTerm}" .{" "}
          {searchResults.channels.length + searchResults.episodes.length}
        </p>
      ) : null}
      {/* channels */}
      {searchResults.channels.length > 0 && (
        <>
          <p className="custom-fs-16 fw-bold theme_text_secondary mb-3">
            {lang === "en" ? "Channels" : "البرامج"}
          </p>
          <div className="row w-100 m-auto mb-5">
            {searchResults.channels.map((channel, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0">
                <ChannelCard channel={channel} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* episodes */}
      {searchResults.episodes.length > 0 && (
        <>
          <p className="custom-fs-16 fw-bold theme_text_secondary">
            {lang === "en" ? "All episodes" : "كل الحلقات"}
          </p>
          <div className="row w-100 m-auto mb-5">
            {searchResults.episodes.map((episode, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0">
                <VideoCard videoData={episode} />
              </div>
            ))}
          </div>
        </>
      )}

      {searchResults.channels.length === 0 &&
        searchResults.episodes.length === 0 && (
          <>
            <EmptyComp
              titleEn="no matching results"
              titleAr="لا توجد نتائج مطابقة"
              subTitleEn="try a channel name or a topic such as “earnings” or “rates”."
              subTitleAr="جرّب اسم قناة أو موضوعاً مثل «أرباح» أو «الفائدة»."
            />
          </>
        )}
    </div>
  );
};

export default Search;
