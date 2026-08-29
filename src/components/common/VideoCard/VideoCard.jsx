import "./VideoCard.css"
import useLang from '../../../utils/useLang'
const VideoCard = () => {
  return (
    <div className="card video-card custom-fs-12 text-capitalize bg-transparent border-0 rounded-0 position-relative cursor-pointer">
      <div className="layer position-absolute top-0 bottom-0 start-0 end-0 z-1">
      </div>
      {/* video card image cover */}
      <div className="video-cover position-relative">
        <div className="video-play-icon position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex justify-content-center align-items-center">
          <div className="theme_bg_identity p-2 rounded-circle">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.6-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2Z"></path></svg>
          </div>
        </div>
        <img className="card-img-top rounded-0" src="https://i.ytimg.com/vi/7NJ3SftzEOs/maxresdefault.jpg" alt="Card image cap" />
      </div>
      {/* video card content */}
      <div className="card-body d-flex flex-column gap-2">
        <p className="card-text channel-title m-0 theme_text_secondary">{useLang("argaam weekend", "أرقام ويك اند")}</p>
        <h5 className="card-title custom-fs-16 theme_text_main m-0">{useLang("the index illusion: a number that deceives you", "وهم المؤشر.. رقم يخدعك")}</h5>
        <div className='d-flex justify-content-start align-items-center gap-1 theme_text_secondary'>
          <p className="card-text m-0">{useLang("episode", "الحلقه")} 10</p>
          <span>.</span>
          <p className="card-text m-0 bg_main">387k {useLang("views", "مشاهده")}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
