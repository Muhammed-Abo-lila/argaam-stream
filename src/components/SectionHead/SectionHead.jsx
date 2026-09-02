const SectionHead = ({ sectionTitle, sectionSubtitle, children }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-2 text-capitalize">
            <div>
                <h4 className="custom-fs-18 theme_text_secondary fw-bold">{sectionTitle}</h4>
                <p className="custom-fs-16 theme_text_secondary">
                    {sectionSubtitle}
                </p>
            </div>
            {children}
        </div>
    )
}

export default SectionHead
