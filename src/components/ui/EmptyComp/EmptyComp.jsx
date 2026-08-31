import { Link } from "react-router-dom"
import useLang from "../../../utils/useLang"
const EmptyComp = ({ titleEn, titleAr, subTitleEn, subTitleAr, btnLabelEn, btnLabelAr, btnFnc, isLink, linkLabelEn, linkLabelAr, link }) => {
    return (
        <div className="py-5 my-4 d-flex flex-column justify-content-center align-items-center gap-3 text-capitalize border" style={{ height: "300px" }}>
            <h6 className="custom-fs-18 theme_text_main">{useLang(titleEn, titleAr)}</h6>
            <p className="custom-fs-14 theme_text_secondary m-0">{useLang(subTitleEn, subTitleAr)}</p>
            {isLink ?
                <Link className="py-2 px-4 rounded-pill theme_bg_identity theme_text_main custom-fs-14 fw-bold cursor-pointer text-decoration-none" to={`/${useLang("en", "ar")}/${link}`}>
                    <p className="m-0">{useLang(linkLabelEn, linkLabelAr)}</p>
                </Link>
                :
                <>
                    {btnLabelEn && btnLabelAr && btnFnc &&
                        <div className="py-2 px-4 rounded-pill theme_bg_identity theme_text_main custom-fs-14 fw-bold cursor-pointer" onClick={btnFnc}>
                            <p className="m-0">{useLang(btnLabelEn, btnLabelAr)}</p>
                        </div>
                    }
                </>
            }
        </div>
    )
}
export default EmptyComp