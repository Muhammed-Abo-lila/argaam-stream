import { Link, Navigate, useParams } from "react-router-dom";
import {
  getChannelByChannelId,
  getEpisodesByChannelId,
} from "../../data/selectorFunctions";

import { episodesData } from "../../data/episodesData";
import useLang from "../../utils/useLang";
import { useEffect, useState } from "react";
import NotFound from "../NotFound/NotFound";
import Player from "../../components/Player/Player";

import "./Watch.css";
const Watch = () => {
  const [imageQualities, setImageQualities] = useState({});

  const lang = useLang("en", "ar");
  const { id } = useParams();

  const episodeDetails = episodesData?.find((episode) => episode?.id === id);

  const episodesByChannelId = getEpisodesByChannelId(episodeDetails?.channelId);

  const channelDetails = getChannelByChannelId(episodeDetails?.channelId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  // store episode id in an array in local storage
  const handleAddToList = () => {
    const storedList = JSON.parse(localStorage.getItem("myList") || "[]");
    if (storedList?.includes(episodeDetails?.id)) {
      // Remove
      const updatedList = storedList?.filter((id) => id !== episodeDetails?.id);
      localStorage.setItem("myList", JSON.stringify(updatedList));
      setIsInMyList(false);
    } else {
      // Add
      const updatedList = [...storedList, episodeDetails?.id];
      localStorage.setItem("myList", JSON.stringify(updatedList));
      setIsInMyList(true);
    }
  };

  // copy url handler
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setIsLinkCopied(true);

      setTimeout(() => {
        setIsLinkCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // to check if user has been added this video in his list before
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList") || "[]");
    setIsInMyList(storedList?.includes(episodeDetails?.id));
  }, [episodeDetails?.id]);

  const getQuality = (episodeId) =>
    imageQualities[episodeId] || "maxresdefault";

  const handleQualityFallback = (
    episodeId,
    currentQuality,
    naturalWidth,
    fallback = "sddefault",
  ) => {
    if (currentQuality === "maxresdefault" && naturalWidth <= 120) {
      setImageQualities((prev) => ({ ...prev, [episodeId]: fallback }));
    }
  };

  const mainQuality = getQuality(episodeDetails?.id);

  const storedEpisodes = JSON.parse(
    localStorage.getItem("videoProgress") || "{}",
  );

  const episodeProgress = storedEpisodes[episodeDetails.id];

  const startSeconds =
    episodeProgress && episodeProgress.fraction < 1
      ? episodeProgress.currentTime
      : 0;

  if (!episodeDetails) {
    return <NotFound />;
  }
  return (
    <section className="watch-page">
      {/* video payer section */}
      <div className="video-cover-wrapper w-100 overflow-hidden d-flex justify-content-center align-items-center bg-black text-center position-relative">
        <div className="video-cover-container w-100 position-relative overflow-hidden ">
          {isPlaying ? (
            <Player
              episodeId={episodeDetails.id}
              videoId={episodeDetails.youtubeId}
              title={
                lang === "en"
                  ? episodeDetails.title.en
                  : episodeDetails.title.ar
              }
              lang={lang}
              startSeconds={startSeconds}
            />
          ) : (
            <div className="cover-container position-relative w-100 h-100">
              <img
                src={`https://i.ytimg.com/vi/${episodeDetails?.youtubeId}/${mainQuality}.jpg`}
                alt="episode cover"
                className="w-100 h-100 object-fit-cover d-block"
                loading="lazy"
                decoding="async"
                onLoad={(e) => {
                  handleQualityFallback(
                    episodeDetails.id,
                    mainQuality,
                    e.currentTarget.naturalWidth,
                  );
                }}
                onError={() => {
                  if (mainQuality === "maxresdefault") {
                    setImageQualities((prev) => ({
                      ...prev,
                      [episodeDetails.id]: "sddefault",
                    }));
                  }
                }}
              />
              <div
                className="play-button-wrapper position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "rgba(0,0,0,.3)" }}
              >
                <svg
                  className="theme_bg_identity rounded-pill p-2 cursor-pointer"
                  width={75}
                  height={75}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  onClick={() => setIsPlaying(true)}
                >
                  <path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.6-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <div className="watch-wrap mb-5">
          <div className="row w-100 mx-auto">
            <div className="col-12 col-md-7 col-lg-9 py-5 border theme_border_color border-top-0">
              <div className="video-meta mb-3 d-flex align-items-center gap-2">
                <span
                  style={{
                    width: "3px",
                    height: "15px",
                    backgroundColor: channelDetails.key,
                  }}
                ></span>
                <span className=" custom-fs-14 theme_text_secondary">
                  {episodeDetails.publishedAt}
                </span>
                <span className=" custom-fs-14 theme_text_secondary">·</span>
                <span className=" custom-fs-14 theme_text_secondary">
                  {useLang("Season", "الموسم")} {episodeDetails.season}
                </span>
                <span className=" custom-fs-14 theme_text_secondary">·</span>
                <span className=" custom-fs-14 theme_text_secondary">
                  {useLang("Episode ", "الحلقة")} {episodeDetails.number}
                </span>
              </div>
              <h2 className="video-title mb-3 custom-fs-24 fw-bold theme_text_main">
                {useLang(episodeDetails.title.en, episodeDetails.title.ar)}
              </h2>
              <div className="video-meta mb-3 d-flex align-items-center gap-2">
                <span className=" custom-fs-14 theme_text_secondary">
                  {episodeDetails.publishedAt}
                </span>
                <span className=" custom-fs-14 theme_text_secondary">·</span>
                <span className=" custom-fs-14 theme_text_secondary">
                  {episodeDetails.durationMin} {useLang("min", "دقيقة")}
                </span>
                <span className=" custom-fs-14 theme_text_secondary">·</span>
                <span className=" custom-fs-14 theme_text_secondary">
                  {episodeDetails.views} {useLang("views", "مشاهدة")}
                </span>
              </div>
              <div className="video-actions d-flex flex-wrap align-items-center gap-3 mb-4">
                {!isPlaying && (
                  <button
                    type="button"
                    className="btn video-play theme_bg_identity theme_text_main rounded-pill d-flex align-items-center gap-1 px-3 custom-fs-14 fw-bold"
                    onClick={() => setIsPlaying(true)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.6-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2Z"></path>
                    </svg>
                    {lang === "en" ? "Play" : "تشغيل"}
                  </button>
                )}
                <button
                  type="button"
                  className="btn video-onDark custom-fs-14 fw-bold d-flex align-items-center gap-1 rounded-pill px-3 py-2"
                  onClick={handleAddToList}
                >
                  {isInMyList ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  )}

                  {isInMyList
                    ? useLang("In my list", "في قائمتي")
                    : useLang("Add to my list", "أضف إلي قائمتي")}
                </button>
                <button
                  type="button"
                  className="btn video-onDark custom-fs-14 fw-bold d-flex align-items-center gap-1 rounded-pill px-4 py-2"
                  onClick={handleShare}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="6" cy="12" r="2.4"></circle>
                    <circle cx="17.5" cy="6" r="2.4"></circle>
                    <circle cx="17.5" cy="18" r="2.4"></circle>
                    <path d="m8.2 10.9 7.1-3.7M8.2 13.1l7.1 3.7"></path>
                  </svg>

                  {isLinkCopied
                    ? useLang("Link copied", "تم نسخ الرابط")
                    : useLang("Share", "مشاركة")}
                </button>
              </div>
              {/* about episode */}
              <div className="vidoe-about pt-4">
                <h3 className="theme_text_secondary custom-fs-18 fw-bold mb-3 text-capitalize">
                  {useLang("About this episode", "عن الحلقة")}
                </h3>
                <p className="custom-fs-16 fw-regular theme_text_secondary lh-2 mb-4">
                  {useLang(
                    episodeDetails.synopsis.en,
                    episodeDetails.synopsis.ar,
                  )}
                </p>
                <div className="d-flex align-items-center gap-4 mb-4">
                  <span className="fw-regular theme_text_secondary custom-fs-16">
                    {useLang("Hosted by", "يقدّمه")}
                  </span>
                  {
                    <span className="fw-regular theme_text_secondary custom-fs-14">
                      {useLang(
                        channelDetails?.host?.en || "-",
                        channelDetails?.host?.ar || "-",
                      )}
                    </span>
                  }
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="fw-regular theme_text_secondary custom-fs-16">
                    {useLang("Topics", "المواضيع")}
                  </span>
                  <div className="topics d-flex align-items-center gap-3 flex-wrap">
                    {episodeDetails.topics.map((topic, idx) => (
                      <span
                        className="theme_bg_secondary theme_text_secondary custom-fs-14 px-3 py-1 rounded-pill"
                        key={idx}
                      >
                        {useLang(topic.en, topic.ar)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* side episodes */}
            <div className="col-12 col-md-5 col-lg-3 p-0 border theme_border_color  border-top-0">
              <aside className="watch-videos">
                <h2 className="p-3 custom-fs-16 fw-bold theme_text_secondary text-capitalize mb-2">
                  {useLang(
                    "More from Argaam Weekend",
                    "المزيد من أرقام ويك إند",
                  )}
                </h2>
                <div className="aside-videos">
                  {episodesByChannelId.map((episode) => {
                    const quality = getQuality(episode.id);
                    return (
                      <Link
                        key={episode.id}
                        className={`video-card d-flex align-items-flexStart gap-2 px-2 py-2 text-decoration-none mb-2 ${episode.id === episodeDetails.id ? "active" : ""}`}
                        aria-current="true"
                        to={`/${useLang("en", "ar")}/watch/${episode.id}`}
                        data-discover="true"
                      >
                        <div className="row__art">
                          <img
                            className="img-fluid h-100"
                            alt=""
                            loading="lazy"
                            decoding="async"
                            src={`https://i.ytimg.com/vi/${episode.youtubeId}/${quality}.jpg`}
                            onLoad={(e) => {
                              handleQualityFallback(
                                episode.id,
                                quality,
                                e.currentTarget.naturalWidth,
                              );
                            }}
                            onError={() => {
                              if (quality === "maxresdefault") {
                                setImageQualities((prev) => ({
                                  ...prev,
                                  [episode.id]: "sddefault",
                                }));
                              }
                            }}
                          />
                        </div>
                        <div className="row__body">
                          <h3 className="custom-fs-12 fw-bold theme_text_secondary mb-2 text-capitalize">
                            {useLang(episode.title.en, episode.title.ar)}
                          </h3>
                          <div className="d-flex align-items-center gap-2 custom-fs-12 theme_text_secondary">
                            <span className="theme_text_secondary custom-fs-14">
                              {episode.number} {useLang("episode", "الحلقة")}
                            </span>
                            <span className="theme_text_secondary custom-fs-14">
                              ·
                            </span>
                            <span className="theme_text_secondary custom-fs-14">
                              {episode.durationMin} {useLang("min", "دقيقة")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Watch;
