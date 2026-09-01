import "./VideoCard.css"
import useLang from '../../../utils/useLang'
import { Link } from "react-router-dom";
import { getChannelByChannelId } from "../../../data/selectorFunctions";
import { useState } from "react";
const VideoCard = ({ videoData }) => {
  const [imageQuality, setImageQuality] = useState("maxresdefault");
  // get channel data depend on channelId to set color and channel name
  const channel = getChannelByChannelId(videoData?.channelId);
  const lang = useLang("en", "ar")
  return (
    <Link to={`/${useLang("en", "ar")}/watch/${videoData?.id}`} className="text-decoration-none h-100 d-block" data-color={channel?.key}>
      <div className="card video-channel-card video-card custom-fs-12 text-capitalize rounded-0 cursor-pointer h-100">
        {/* video card image cover */}
        <div className="video-cover position-relative" style={{ aspectRatio: "16 / 9" }}>
          <div className="video-play-icon position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex justify-content-center align-items-center">
            <div className="theme_bg_identity p-2 rounded-circle">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.6-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2Z"></path></svg>
            </div>
          </div>

          <img
            className="card-img-top rounded-0"
            src={`https://i.ytimg.com/vi/${videoData?.youtubeId}/${imageQuality}.jpg`}
            alt={videoData.title[lang]}
            loading="lazy"
            onLoad={(e) => {
              if (
                imageQuality === "maxresdefault" &&
                e.currentTarget.naturalWidth <= 120
              ) {
                setImageQuality("mqdefault");
              }
            }}
            onError={() => {
              if (imageQuality === "maxresdefault") {
                setImageQuality("mqdefault");
              }
            }}
          />
        </div>
        {/* video card content */}
        <div className="card-body d-flex flex-column gap-2">
          <p className="card-text channel-title theme_text_secondary">{useLang(channel?.name?.en, channel?.name?.ar)}</p>
          <h5 className="card-title custom-fs-16 theme_text_main m-0">{useLang(videoData?.title?.en, videoData?.title?.ar)}</h5>
          <div className='d-flex justify-content-start align-items-center gap-1 theme_text_secondary'>
            <p className="card-text m-0">{useLang("episode", "الحلقه")} {videoData?.number}</p>
            <span>.</span>
            <p className="card-text m-0 bg_main">{Math.round(videoData?.views / 1000)}k {useLang("views", "مشاهده")}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
