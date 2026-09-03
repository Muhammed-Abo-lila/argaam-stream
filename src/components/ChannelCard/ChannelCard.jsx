import { Link } from "react-router-dom";
import useLang from "../../utils/useLang";
import { getEpisodesByChannelId } from "../../data/selectorFunctions";
import { getEpisodeLabel, sliceText } from "../../utils/helpers";
import "./ChannelCard.css";
const ChannelCard = ({ channel }) => {
  // get episodes depend on channelId
  const episodesByChannelId = getEpisodesByChannelId(channel?.id);
  const lang = useLang("en", "ar");
  return (
    <Link
      to={`/${useLang("en", "ar")}/channel/${channel?.id}`}
      className="text-decoration-none h-100 d-block"
      data-color={channel?.key}
    >
      <div className="card video-channel-card custom-fs-12 rounded-0 cursor-pointer h-100">
        <div style={{ aspectRatio: "16 / 9" }}>
          <img
            className="card-img-top rounded-0"
            src={channel?.cover}
            alt={channel.name[lang]}
            loading="lazy"
          />
        </div>
        <div className="card-body channel-card-body theme_text_secondary d-flex flex-column gap-2">
          <h5 className="card-title custom-fs-16 theme_text_main m-0 text-capitalize">
            {useLang(channel?.name?.en, channel?.name?.ar)}
          </h5>
          <div className="card-categories custom-fs-12">
            {useLang(channel?.kicker?.en, channel?.kicker?.ar)} ·
            <span>{episodesByChannelId?.length}</span>{" "}
            {getEpisodeLabel(episodesByChannelId?.length, lang)}
          </div>
          <div className="card-text custom-fs-14">
            <div className="layer position-absolute top-0 bottom-0 start-0 end-0 z-1" />
            {useLang(
              sliceText(channel?.description?.en, 135),
              sliceText(channel?.description?.ar, 140),
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ChannelCard;
