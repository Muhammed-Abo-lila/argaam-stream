import "./HeroSection.css";

// img cover
import OnpointCover from "../../assets/covers/onpoint.png";
import useLang from "../../utils/useLang";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="heroSection">
      <div className="container-fluid">
        <div className="img-wrapper">
          <img
            alt="Argaam OnPoint"
            fetchPriority="high"
            decoding="async"
            src={OnpointCover}
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
              <a href="/channel/onpoint" data-discover="true">
                {useLang("Argaam OnPoint", "أرقام أون بوينت")}
              </a>
            </div>
            <h1 className="heroSection-info-title">
              {useLang(
                "Why Global Startups Are Choosing Saudi Arabia | Sultan Moraished",
                "لماذا تختار الشركات الناشئة العالمية السعودية | سلطان مريشد",
              )}
            </h1>
            <p className="heroSection-info-synopsis">
              {useLang(
                "Sultan Moraished, Chief Technology Officer at Red Sea Global, tells Somi Arian how one of Saudi Arabia's most ambitious giga projects turns vision into reality through technology and long-term thinking. He covers",
                "يتحدث سلطان مريشد، الرئيس التنفيذي للتقنية في البحر الأحمر الدولي، إلى سومي أريان عن كيفية تحويل أحد أكثر المشاريع الكبرى طموحًا في السعودية من رؤية إلى واقع عبر التقنية والتخطيط طويل الأمد. ويتناول التقنية غير المرئية التي تشغّل الوجهة السياحية، وتبنّي الذكاء الاصطناعي، وتطوير المواهب المحلية، والفرص التي يفتحها ذلك أمام الشركات الناشئة.",
              )}
              ...
            </p>
            <div className="heroSection-info-meta">
              <span>
                {useLang("Episode", "الحلقة")}{" "}
                <span className="ag-num">11</span>
              </span>
              <span className="dot">·</span>
              <span>
                <span className="ag-num">50</span> {useLang("min", "دقيقة")}
              </span>
              <span className="dot">·</span>
              <span className="ag-num" dir="ltr">
                09.Aug.2026
              </span>
              <span className="dot">·</span>
              <span>
                <span className="ag-num">128K</span>{" "}
                {useLang("views", "مشاهدة")}
              </span>
            </div>
            <div className="heroSection-info-actions">
              <Link
                className="btn btn--primary"
                to={`/${useLang("en", "ar")}/watch/onpoint-e11`}
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
              <Link
                className="btn btn--onDark"
                href="/channel/onpoint"
                data-discover="true"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
