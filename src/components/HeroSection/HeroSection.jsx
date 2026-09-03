import "./HeroSection.css";
import useLang from "../../utils/useLang";
import { Link } from "react-router-dom";
import {
  getChannelByChannelId,
  getEpisodesByChannelId,
} from "../../data/selectorFunctions";
import { formatDate, formatViews } from "../../utils/helpers";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const channelId = "onpoint";
  const channel = getChannelByChannelId(channelId);
  const episodesByChannelId = getEpisodesByChannelId(channelId);
  const sortedPublishedEpisode = [...episodesByChannelId].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  )[1];

  const [isInMyList, setIsInMyList] = useState(false);

  // store episode id in an array in local storage
  const handleAddToList = () => {
    const storedList = JSON.parse(localStorage.getItem("myList") || "[]");

    if (storedList.includes(sortedPublishedEpisode?.id)) {
      // Remove
      const updatedList = storedList.filter(
        (id) => id !== sortedPublishedEpisode?.id,
      );

      localStorage.setItem("myList", JSON.stringify(updatedList));
      setIsInMyList(false);
    } else {
      // Add
      const updatedList = [...storedList, sortedPublishedEpisode?.id];

      localStorage.setItem("myList", JSON.stringify(updatedList));
      setIsInMyList(true);
    }
  };

  // to check if user has been added this video in his list before
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList") || "[]");

    setIsInMyList(storedList.includes(sortedPublishedEpisode?.id));
  }, [sortedPublishedEpisode?.id]);

  return (
    <section className="heroSection w-100 position-relative d-flex align-items-end">
      <div className="container">
        <div className="img-wrapper">
          <img
            className="w-100 h-100 object-fit-cover"
            alt="Argaam OnPoint"
            fetchPriority="high"
            decoding="async"
            src={channel?.cover}
          />
        </div>
        <div className="heroSection-overlay"></div>
        {/* hero section info */}
        <div className="heroSection-info-wrapper">
          <div className="heroSection-info my-4">
            {/* <div className="heroSection-info-kicker d-flex align-items-center gap-2">
              <span className="badge badge--onDark custom-fs-12">
                {useLang("Featured episode", "حلقة مميزة")}
              </span>
              <Link
                className="text-decoration-none custom-fs-14"
                to={`/${useLang("en", "ar")}/channel/${channel?.id}`}
                data-discover="true"
              >
                {useLang("Argaam OnPoint", "أرقام أون بوينت")}
              </Link>
            </div> */}

            <h2 className="heroSection-info-title mb-4 fw-bold">
              {useLang(
                sortedPublishedEpisode?.title?.en,
                sortedPublishedEpisode?.title?.ar,
              )}
            </h2>

            <p className="heroSection-info-synopsis custom-fs-18 ">
              {useLang(
                sortedPublishedEpisode?.synopsis?.en,
                sortedPublishedEpisode?.synopsis?.ar,
              )}
            </p>
            {/* <div className="heroSection-info-meta footer_secondary_color d-flex flex-wrap align-items-center gap-2 mt-3 custom-fs-14">
              <span>
                {useLang("Episode", "الحلقة")}{" "}
                <span>{sortedPublishedEpisode?.number}</span>
              </span>
              <span>·</span>
              <span>
                <span>{sortedPublishedEpisode?.durationMin}</span>{" "}
                {useLang("min", "دقيقة")}
              </span>
              <span>·</span>
              <span dir="ltr">
                {formatDate(sortedPublishedEpisode?.publishedAt)}
              </span>
              <span>·</span>
              <span>
                <span>{formatViews(sortedPublishedEpisode?.views)}</span>{" "}
                {useLang("views", "مشاهدة")}
              </span>
            </div> */}
            {/* <div className="heroSection-info-actions d-flex flex-wrap align-items-center gap-2 mt-3">
              <Link
                className="btn btn--primary"
                to={`/${useLang("en", "ar")}/watch/${sortedPublishedEpisode?.id}`}
                data-discover="true"
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
                {useLang("Play", "تشغيل")}
              </Link>
              <button
                type="button"
                className="btn btn--onDark"
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
              <Link
                className="btn btn--onDark"
                to={`/${useLang("en", "ar")}/channel/${channel?.id}`}
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
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M12 11v5M12 7.6v.6"></path>
                </svg>
                {useLang("About this channel", "عن القناة")}
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
