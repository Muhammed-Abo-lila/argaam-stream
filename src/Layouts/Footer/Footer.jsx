import { Link } from "react-router-dom"
import useLang from "../../utils/useLang"
import logoImg from "../../assets/brand/argaam-logo-footer-white.png"
import { channels } from "../../data/channelsData"
const Footer = () => {
    return (
        <footer className=" custom-fs-14">
            <div className="top-footer" style={{ backgroundColor: "#262220" }}>
                <div className="container-fluid">
                    <div className="row py-5 px-5 row-gap-4" >

                        <div className="col-6 col-md-4">
                            <img src={logoImg} style={{ height: "24px" }} />
                            <p className="footer_secondary_color mt-2">{useLang("Argaam Originals — video programmes on the Saudi,Gulf, and international", "إنتاجات أرقام الأصلية — برامج مرئية عن السوق السعودي والخليجي والعالمي")}</p>
                        </div>

                        <div className="col-6 col-md-2 text-capitalize m-0 p-0">
                            <h5 className="footer_main_color custom-fs-14">{useLang("channels", "البرامج")}</h5>
                            <ul className="list-unstyled p-0 m-0 d-flex flex-column gap-2 mt-3 footer_secondary_color">
                                {channels?.map((channel, idx) =>
                                    <li key={idx}><Link to={`/${useLang("en", "ar")}/channel/${channel?.id}`} className="text-decoration-none text-reset">{useLang(channel?.name?.en, channel?.name?.ar)}</Link></li>
                                )}
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 text-capitalize m-0 p-0">
                            <h5 className="footer_main_color custom-fs-14">{useLang("products", "المنتجات")}</h5>
                            <ul className="list-unstyled p-0 m-0 d-flex flex-column gap-2 mt-3 footer_secondary_color">
                                <li><Link to={`/${useLang("en", "ar")}/browse`} className="text-decoration-none text-reset">{useLang("browse all", "تصفح الكل")}</Link></li>
                                <li><Link to={`/${useLang("en", "ar")}/my-list`} className="text-decoration-none text-reset">{useLang("my list", "قائمتي")}</Link></li>
                                <li><Link to={`/${useLang("en", "ar")}/search`} className="text-decoration-none text-reset">{useLang("search", "بحث")}</Link></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 text-capitalize m-0 p-0">
                            <h5 className="footer_main_color custom-fs-14">{useLang("legal", "قانوني")}</h5>
                            <ul className="list-unstyled p-0 m-0 d-flex flex-column gap-2 mt-3 footer_secondary_color">
                                <li><Link to="#" className="text-decoration-none text-reset">{useLang("about argaam", "عن أرقام")}</Link></li>
                                <li><Link to="#" className="text-decoration-none text-reset">{useLang("contact", "تواصل معنا")}</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bottom-footer" style={{ backgroundColor: "#000" }}>
                <div className="container-fluid">
                    <div className="d-flex flex-column justify-content-center align-items-center row-gap-3 flex-sm-row justify-content-sm-between w-full footer_secondary_color text-capitalize p-3 custom-fs-12">
                        <p className="m-0">{useLang("all rights reserved, argaam investment company.", "جميع الحقوق محفوظة لشركة أرقام للاستثمار.")}</p>
                        <p className="m-0">{useLang("content is informational and is not investment advice.", "المحتوى المعروض لأغراض إعلامية ولا يُعد توصية استثمارية.")}</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer