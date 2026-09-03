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


  const getQuality = (episodeId) => imageQualities[episodeId] || "maxresdefault";

  const handleQualityFallback = (episodeId, currentQuality, naturalWidth, fallback = "sddefault") => {
    if (currentQuality === "maxresdefault" && naturalWidth <= 120) {
      setImageQualities((prev) => ({ ...prev, [episodeId]: fallback }));
    }
  };

  const mainQuality = getQuality(episodeDetails?.id);


  const storedEpisodes = JSON.parse(
    localStorage.getItem("videoProgress") || "{}"
  );

  const episodeProgress = storedEpisodes[episodeDetails.id];

  const startSeconds = episodeProgress && episodeProgress.fraction < 1 ? episodeProgress.currentTime : 0;

  if (!episodeDetails) {
    return <NotFound />;
  }
  return (
    <section className="watch-page">

      {/* video payer section */}
      <div className="video-cover-wrapper w-100 overflow-hidden d-flex justify-content-center align-items-center bg-black">
        <div className="video-cover-container w-100 position-relative overflow-hidden ">
          {isPlaying ? (
            <Player
              episodeId={episodeDetails.id}
              videoId={episodeDetails.youtubeId}
              title={lang === "en" ? episodeDetails.title.en : episodeDetails.title.ar}
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
                    e.currentTarget.naturalWidth
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
                  className="svg-box theme_bg_identity rounded-pill p-2 cursor-pointer"
                  width={70}
                  height={70}
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



      <div className="vh-100">
        lorem
        lorem
        lorem
        lorem
        lorem
        lorem
      </div>
    </section>
  );
};
export default Watch;





// <div className="container-fluid">
//   <div className="watch-wrap mb-5">
//     <div className="row w-100 mx-auto">
//       <div className="col-12 col-md-7 col-lg-9 py-5 border theme_border_color border-top-0">
//         <div className="video-meta mb-3">
//           <span
//             style={{
//               width: "3px",
//               height: "15px",
//               backgroundColor: channelDetails.key,
//             }}
//           ></span>
//           <span className="meta-date">{episodeDetails.publishedAt}</span>
//           <span className="meta-dot">·</span>
//           <span className="meta-num">
//             {useLang("Season", "الموسم")} {episodeDetails.season}
//           </span>
//           <span className="meta-dot">·</span>
//           <span className="meta-num">
//             {useLang("Episode ", "الحلقة")} {episodeDetails.number}
//           </span>
//         </div>
//         <h2 className="video-title mb-3">
//           {useLang(episodeDetails.title.en, episodeDetails.title.ar)}
//         </h2>
//         <div className="video-meta mb-3">
//           <span className="meta-date">{episodeDetails.publishedAt}</span>
//           <span className="meta-dot">·</span>
//           <span className="meta-num">
//             {episodeDetails.durationMin} {useLang("min", "دقيقة")}
//           </span>
//           <span className="meta-dot">·</span>
//           <span className="meta-num">
//             {episodeDetails.views} {useLang("views", "مشاهدة")}
//           </span>
//         </div>
//         <div className="video-actions">
//           {!isPlaying && (
//             <button
//               type="button"
//               className="btn video-play"
//               onClick={() => setIsPlaying(true)}
//             >
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.6-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2Z"></path>
//               </svg>
//               {lang === "en" ? "Play" : "تشغيل"}
//             </button>
//           )}
//           <button
//             type="button"
//             className="btn video-onDark"
//             onClick={handleAddToList}
//           >
//             {isInMyList ? (
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 aria-hidden="true"
//               >
//                 <path d="m5 12 4 4L19 6" />
//               </svg>
//             ) : (
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 aria-hidden="true"
//               >
//                 <path d="M12 5v14M5 12h14" />
//               </svg>
//             )}

//             {isInMyList
//               ? useLang("In my list", "في قائمتي")
//               : useLang("Add to my list", "أضف إلي قائمتي")}
//           </button>
//           <button
//             type="button"
//             className="btn video-onDark"
//             onClick={handleShare}
//           >
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               aria-hidden="true"
//             >
//               <circle cx="6" cy="12" r="2.4"></circle>
//               <circle cx="17.5" cy="6" r="2.4"></circle>
//               <circle cx="17.5" cy="18" r="2.4"></circle>
//               <path d="m8.2 10.9 7.1-3.7M8.2 13.1l7.1 3.7"></path>
//             </svg>

//             {isLinkCopied
//               ? useLang("Link copied", "تم نسخ الرابط")
//               : useLang("Share", "مشاركة")}
//           </button>
//         </div>
//         {/* about episode */}
//         <div className="vidoe-about">
//           <h3>{useLang("About this episode", "عن الحلقة")}</h3>
//           <p className="mb-4">
//             {useLang(
//               episodeDetails.synopsis.en,
//               episodeDetails.synopsis.ar,
//             )}
//           </p>
//           <div className="d-flex align-items-center gap-4 mb-4">
//             <span className="fw-regular theme_text_secondary custom-fs-16">
//               {useLang("Hosted by", "يقدّمه")}
//             </span>
//             {
//               <span className="fw-regular theme_text_secondary custom-fs-14">
//                 {useLang(
//                   channelDetails?.host?.en || "-",
//                   channelDetails?.host?.ar || "-",
//                 )}
//               </span>
//             }
//           </div>
//           <div className="d-flex align-items-center gap-5">
//             <span className="fw-regular theme_text_secondary custom-fs-16">
//               {useLang("Topics", "المواضيع")}
//             </span>
//             <div className="topics flex-wrap">
//               {episodeDetails.topics.map((topic, idx) => (
//                 <span key={idx}>{useLang(topic.en, topic.ar)}</span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* side episodes */}
//       <div className="col-12 col-md-5 col-lg-3 p-0 border theme_border_color  border-top-0">
//         <aside className="watch-videos">
//           <h2>
//             {useLang(
//               "More from Argaam Weekend",
//               "المزيد من أرقام ويك إند",
//             )}
//           </h2>
//           <div className="aside-videos">
//             {episodesByChannelId.map((episode) => {
//               const quality = getQuality(episode.id);
//               return (
//                 <Link
//                   key={episode.id}
//                   className={`video-card d-flex align-items-flexStart gap-3 p-3 text-decoration-none mb-2 ${episode.id === episodeDetails.id ? "active" : "null"}`}
//                   aria-current="true"
//                   to={`/${useLang("en", "ar")}/watch/${episode.id}`}
//                   data-discover="true"
//                 >
//                   <div className="row__art">
//                     <img
//                       className="thumb"
//                       alt=""
//                       loading="lazy"
//                       decoding="async"
//                       src={`https://i.ytimg.com/vi/${episode.youtubeId}/${quality}.jpg`}
//                       onLoad={(e) => {
//                         handleQualityFallback(episode.id, quality, e.currentTarget.naturalWidth);
//                       }}
//                       onError={() => {
//                         if (quality === "maxresdefault") {
//                           setImageQualities((prev) => ({ ...prev, [episode.id]: "sddefault" }));
//                         }
//                       }}
//                     />
//                   </div>
//                   <div className="row__body">
//                     <h3 className="row__title">
//                       {useLang(episode.title.en, episode.title.ar)}
//                     </h3>
//                     <div className="row__meta">
//                       {useLang("episode", "الحلقة")}{" "}
//                       <span className="ag-num">{episode.number}</span>
//                       <span className="dot"> · </span>
//                       <span className="ag-num">
//                         {episode.durationMin}
//                       </span>{" "}
//                       {useLang("min", "دقيقة")}
//                     </div>
//                   </div>
//                 </Link>
//               )
//             })}
//           </div>
//         </aside>
//       </div>
//     </div>
//   </div>
// </div>


