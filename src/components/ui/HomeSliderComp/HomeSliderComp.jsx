import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules';
import useLang from "../../../utils/useLang";
const HomeSliderComp = ({ sectionTitle, linkLabel, link, data, renderItem }) => {
    return (
        <div>
            {/*section header */}
            <div className="d-flex justify-content-between align-items-center mb-2 text-capitalize">
                <h4 className="custom-fs-18 theme_text_secondary fw-bold">{sectionTitle}</h4>
                <Link to={link} className="custom-fs-14 fw-bolder text-decoration-none theme_text_identity d-flex gap-1">
                    {linkLabel}
                    <i className={`bi ${useLang("bi-chevron-right", "bi-chevron-left")}`} />
                </Link>
            </div>
            {/* section swiper videos */}
            <Swiper
                key={useLang("ltr", "rtl")}
                slidesPerView={4}
                slidesPerGroup={4}
                speed={1000}
                loop={false}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                    },
                    576: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3
                    },
                    1200: {
                        slidesPerView: 4,
                        slidesPerGroup: 4
                    },
                }}
            >
                {data?.map((item, idx) =>
                    <SwiperSlide key={idx}>{renderItem(item)}</SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}

export default HomeSliderComp
