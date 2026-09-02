import React from 'react'

const PagesHeader = ({pageTitle,pageSubtitle}) => {
  return (
    <div className="mb-3 text-capitalize">
            <h4 className="mb-2 theme_text_main custom-fs-24 fw-semibold">{ pageTitle}</h4>
            <p className="custom-fs-14 theme_text_secondary">
                {pageSubtitle}
            </p>
          </div>
  )
}

export default PagesHeader
