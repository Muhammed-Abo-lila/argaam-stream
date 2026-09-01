import { Link, useParams } from "react-router-dom";
import { getEpisodesByChannelId } from "../../data/selectorFunctions";

import "./Watch.css";
import { episodesData } from "../../data/episodesData";
import useLang from "../../utils/useLang";
import { useState } from "react";

const Watch = () => {
  const [imageQuality, setImageQuality] = useState("maxresdefault");

  const { id } = useParams();

  const episodeDetails = episodesData?.find((episode) => episode.id === id);

  const episodesByChannelId = getEpisodesByChannelId(episodeDetails.channelId);

  console.log(episodesByChannelId);

  return (
    <div className="watch-details">
      <div className="player">
        <div className="player__frame">
          <button type="button" className="player__poster">
            <img
              className="thumb"
              alt="episode cover"
              loading="lazy"
              decoding="async"
              src={`https://i.ytimg.com/vi/${episodeDetails?.youtubeId}/${imageQuality}.jpg`}
              onLoad={(e) => {
                if (
                  imageQuality === "maxresdefault" &&
                  e.currentTarget.naturalWidth < 120
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
            <span className="player__posterScrim" />
            <span className="player__posterBtn">
              <svg
                width={32}
                height={32}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.6-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2Z" />
              </svg>
            </span>
            <span className="sr-only">Play</span>
          </button>
        </div>
      </div>
      <div className="container-fluid">
        <div className="watch-wrap mb-5">
          <div className="row w-100 mx-auto">
            <div className="col-12 col-md-7 col-lg-9 p-0"></div>
            <div className="col-12 col-md-5 col-lg-3 p-0">
              <aside className="watch-videos">
                <h2>
                  {useLang(
                    "More from Argaam Weekend",
                    "المزيد من أرقام ويك إند",
                  )}
                </h2>
                {episodesByChannelId.map((episode) => (
                  <Link
                    key={episode.id}
                    className={`d-flex align-items-flexStart gap-3 p-3 text-decoration-none`}
                    aria-current="true"
                    to={`/${useLang("en", "ar")}/watch/${episode.id}`}
                    data-discover="true"
                  >
                    <div className="row__art">
                      <img
                        className="thumb"
                        alt
                        loading="lazy"
                        decoding="async"
                        src={`https://i.ytimg.com/vi/${episode.youtubeId}/${imageQuality}.jpg`}
                        onLoad={(e) => {
                          if (
                            imageQuality === "maxresdefault" &&
                            e.currentTarget.naturalWidth < 120
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
                    <div className="row__body">
                      <h3 className="row__title">
                        {useLang(episode.title.en, episode.title.ar)}
                      </h3>
                      <div className="row__meta">
                        {useLang("episode", "الحلقة")}{" "}
                        <span className="ag-num">{episode.number}</span>
                        <span className="dot"> · </span>
                        <span className="ag-num">
                          {episode.durationMin}
                        </span>{" "}
                        {useLang("min", "دقيقة")}
                      </div>
                    </div>
                  </Link>
                ))}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Watch;
