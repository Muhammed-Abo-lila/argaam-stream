const SortComp = ({ sortList, activeSort, setActiveSort }) => {
    return (
        <ul className="list-unstyled custom-fs-14 d-flex justify-content-center align-items-center text-capitalize theme_bg_secondary p-1 rounded-pill overflow-hidden">
            {sortList?.map((sortItem, idx) =>
                <li
                    key={idx}
                    className={`px-3 py-2 rounded-pill cursor-pointer ${activeSort === sortItem?.key ? "theme_bg_main theme_text_main" : "bg-transparent theme_text_secondary"}`}
                    onClick={() => setActiveSort(sortItem?.key)}
                >
                    {sortItem?.label}
                </li>
            )}
        </ul>
    )
}

export default SortComp
