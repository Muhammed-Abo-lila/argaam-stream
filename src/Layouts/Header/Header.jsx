import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import useLang from "../../utils/useLang";
import { useTranslation } from "react-i18next";

import { channels } from "../../data/channelsData";
import { episodesData } from "../../data/episodesData";

// logos
import dark_logo from "../../assets/brand/argaam-logo-dark.png";
import light_logo from "../../assets/brand/argaam-logo-light.png";

import "./Header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    if (value !== "" || value !== undefined) {
      setSearchTerm(value);
    }
  };

  const { theme, toggleTheme } = useTheme();

  const lang = useLang("en", "ar");

  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    const pathParts = location.pathname.split("/");
    pathParts[1] = language;
    i18n.changeLanguage(language);
    navigate(pathParts.join("/"));
  };

  const menuItems = [
    {
      name: lang === "en" ? "Home" : "الرئيسية",
      path: "",
    },
    {
      name: lang === "en" ? "Channels" : "البرامج",
      path: "channels",
    },
    {
      name: lang === "en" ? "Browse all" : "تصفح الكل",
      path: "browse",
    },
    {
      name: lang === "en" ? "My list" : "قائمتي",
      path: "my-list",
    },
  ];

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
    <header className="navbar py-3">
      <div className="container-fluid">
        <div className="row w-100 m-auto row-gap-3">
          {/* logo */}
          <div className="col-sm-12 col-md-6 col-lg-2">
            <Link className="logo" to={`/${lang}/home`}>
              <img
                src={theme === "dark" ? dark_logo : light_logo}
                 alt={useLang("argaam company logo","شعار شركه أرقام")}
                loading="lazy"
              />
              <span>{useLang("originals", "فيديو")}</span>
            </Link>
          </div>
          {/* menu items */}
          <div className="col-sm-12 col-md-6 col-lg-6 p-0 order-3 order-sm-0">
            <ul className="nav-links h-100">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <NavLink to={item.path} end>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* search + icons */}
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="right-nav">
              <div className="search">
                <span className="search-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="6.5"></circle>
                    <path d="m16 16 4.5 4.5"></path>
                  </svg>
                </span>
                <input
                  className="search-input"
                  placeholder={useLang(
                    "Search episodes and channels",
                    "ابحث عن حلقة أو قناه",
                  )}
                  aria-label={useLang(
                    "Search episodes and channels",
                    "ابحث عن حلقة أو قناه",
                  )}
                  type="search"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {/* search dropdown */}
                {searchTerm.trim() && (
                  <div className="search-dropdown">
                    {searchResults.channels.length === 0 &&
                      searchResults.episodes.length === 0 && (
                        <div className="not-found-data">
                          <p className="">
                            {lang === "en"
                              ? "No Results Found"
                              : "لا توجد نتائج"}
                          </p>
                        </div>
                      )}

                    {searchResults.channels.length > 0 &&
                      searchResults.channels.slice(0, 3).map((channel) => (
                        <Link
                          to={`/${lang}/channel/${channel.id}`}
                          onClick={() => setSearchTerm("")}
                          className="result-card"
                          key={channel.id}
                        >
                          <img src={channel.cover} alt={channel.name[lang]} />
                          <div className="d-flex flex-column justify-content-between">
                            <h3>{channel.name[lang].slice(0, 25)}</h3>
                            <p>{channel.description[lang].slice(0, 25)}</p>
                          </div>
                        </Link>
                      ))}

                    {searchResults.episodes.length > 0 &&
                      searchResults.episodes.slice(0, 3).map((episode) => (
                        <Link
                          to={`/${lang}/watch/${episode.id}`}
                          onClick={() => setSearchTerm("")}
                          className="result-card"
                          key={episode.id}
                        >
                          <img
                            src={`https://i.ytimg.com/vi/${episode?.youtubeId}/maxresdefault.jpg`}
                            alt={episode.title[lang]}
                          />
                          <div className="d-flex flex-column justify-content-between">
                            <h3>{episode.title[lang].slice(0, 25)}</h3>
                            <p>{episode.synopsis[lang].slice(0, 25)}</p>
                          </div>
                        </Link>
                      ))}

                    {(searchResults.channels.length > 0 ||
                      searchResults.episodes.length > 0) && (
                      <div className="search-dropdown-actions">
                        <Link
                          to={`/${lang}/search?q=${encodeURIComponent(searchTerm.trim())}`}
                          onClick={() => setSearchTerm("")}
                        >
                          {lang === "en" ? "View all" : "عرض الكل"}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* icons */}
              <div
                className="icon"
                onClick={() => changeLanguage(lang==="en"?"ar":"en")}
              >
                <span>{useLang("ع", "EN")}</span>
              </div>
              <div
                className="icon border-0"
                onClick={() => toggleTheme(!theme)}
              >
                {theme === "dark" ? (
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
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5"></path>
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
                    <path d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.7 6.7 0 0 0 9.4 9.4Z"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
