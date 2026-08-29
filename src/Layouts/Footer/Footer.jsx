import { Link } from "react-router-dom"
import useLang from "../../utils/useLang"
import logoImg from "../../assets/brand/argaam-logo-footer-white.png"
const Footer = () => {
    return (
        <footer className="container-fluid custom-fs-14" style={{ backgroundColor: "#000" }}>
            {/* top footer */}
            <div className="row py-5 px-4 row-gap-4" style={{ backgroundColor: "#262220" }}>

                <div className="col-6 col-md-4">
                    <img src={logoImg} style={{ height: "24px" }} />
                    <p className="footer_secondary_color mt-2">{useLang("Argaam Originals — video programmes on the Saudi,Gulf, and international", "إنتاجات أرقام الأصلية — برامج مرئية عن السوق السعودي والخليجي والعالمي")}</p>
                </div>

                <div className="col-6 col-md-2 text-capitalize m-0 p-0">
                    <h5 className="footer_main_color custom-fs-14">{useLang("channels", "البرامج")}</h5>
                    <ul className="list-unstyled p-0 m-0 d-flex flex-column gap-2 mt-3 footer_secondary_color">
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("argaam weekend", "أرقام ويك اند")}</Link></li>
                        <li><Link to="#" className="text-decoration-none text-reset">1+1</Link></li>
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("argaam onPoint", "أرقام أون بوينت")}</Link></li>
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("with maryam", "مع مريم")}</Link></li>
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("bebasata", "ببساطه")}</Link></li>
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("inside the fund", "داخل الصندوق")}</Link></li>
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("nataej", "نتائج")}</Link></li>
                    </ul>
                </div>

                <div className="col-6 col-md-2 text-capitalize m-0 p-0">
                    <h5 className="footer_main_color custom-fs-14">{useLang("products", "المنتجات")}</h5>
                    <ul className="list-unstyled p-0 m-0 d-flex flex-column gap-2 mt-3 footer_secondary_color">
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("browse all", "تصفح الكل")}</Link></li>
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("my list", "قائمتي")}</Link></li>
                        <li><Link to="#" className="text-decoration-none text-reset">{useLang("search", "بحث")}</Link></li>
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

            {/* bottom footer */}
            <div className="d-flex flex-column justify-content-center align-items-center row-gap-3 flex-sm-row justify-content-sm-between w-full footer_secondary_color text-capitalize p-3 custom-fs-12">
                <p className="m-0">{useLang("all rights reserved, argaam investment company.", "جميع الحقوق محفوظة لشركة أرقام للاستثمار.")}</p>
                <p className="m-0">{useLang("content is informational and is not investment advice.", "المحتوى المعروض لأغراض إعلامية ولا يُعد توصية استثمارية.")}</p>
            </div>


        </footer>
    )
}
export default Footer