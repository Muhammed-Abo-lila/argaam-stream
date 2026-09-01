import "./HeroSection.css";
import useLang from "../../../utils/useLang";
import { Link } from "react-router-dom";
import { getChannelByChannelId, getEpisodesByChannelId } from "../../../data/selectorFunctions";
import { formatDate, formatViews } from "../../../utils/helpers";

const HeroSection = () => {
  const channelId = "onpoint";
  const channel = getChannelByChannelId(channelId);
  const episodesByChannelId = getEpisodesByChannelId(channelId);
  const sortedPublishedEpisode = [...episodesByChannelId].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[1];

  return (
    <section className="heroSection">
      <div className="container-fluid">
        <div className="img-wrapper">
          <img
            alt="Argaam OnPoint"
            fetchPriority="high"
            decoding="async"
            src={channel?.cover}
          />
        </div>
        <div className="heroSection-overlay"></div>
        {/* hero section info */}
        <div className="heroSection-info-wrapper">
          <div className="heroSection-info">
            <div className="heroSection-info-kicker">
              <span className="badge badge--onDark">
                {useLang("Featured episode", "حلقة مميزة")}
              </span>
              <Link to={`/${useLang("en", "ar")}/channel/${channel?.id}`} data-discover="true">
                {useLang("Argaam OnPoint", "أرقام أون بوينت")}
              </Link>
            </div>

            <h2 className="heroSection-info-title">
              {useLang(sortedPublishedEpisode?.title?.en, sortedPublishedEpisode?.title?.ar)}
            </h2>

            <p className="heroSection-info-synopsis">
              {useLang(sortedPublishedEpisode?.synopsis?.en, sortedPublishedEpisode?.synopsis?.ar)}
            </p>
            <div className="heroSection-info-meta">
              <span>
                {useLang("Episode", "الحلقة")}{" "}
                <span className="ag-num">{sortedPublishedEpisode?.number}</span>
              </span>
              <span className="dot">·</span>
              <span>
                <span className="ag-num">{sortedPublishedEpisode?.durationMin}</span> {useLang("min", "دقيقة")}
              </span>
              <span className="dot">·</span>
              <span className="ag-num" dir="ltr">
                {formatDate(sortedPublishedEpisode?.publishedAt)}
              </span>
              <span className="dot">·</span>
              <span>
                <span className="ag-num">{formatViews(sortedPublishedEpisode?.views)}</span>{" "}
                {useLang("views", "مشاهدة")}
              </span>
            </div>
            <div className="heroSection-info-actions">
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
              <button type="button" className="btn btn--onDark">
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
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                {useLang("Add to my list", "أضف إلي قائمتي")}
              </button>
              <Link className="btn btn--onDark" to={`/${useLang("en", "ar")}/channel/${channel?.id}`}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
