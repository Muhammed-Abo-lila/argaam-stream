import { useParams } from "react-router-dom";
import VideoCard from "../../components/common/VideoCard/VideoCard";
import EmptyComp from "../../components/ui/EmptyComp/EmptyComp";
import SortComp from "../../components/ui/SortComp/SortComp";
import useLang from "../../utils/useLang";
import { useState } from "react";

const channel = () => {
    const { slug } = useParams();
    console.log("slug===>", slug);

    const [activeSort, setActiveSort] = useState("newest")
    const sortList = [
        {
            key: "newest",
            label: useLang("newest", "الأحدث"),
        },
        {
            key: "oldest",
            label: useLang("oldest", "الأقدم"),
        },
        {
            key: "mostWatched",
            label: useLang("most watched", "الأكثر مشاهدة"),
        },
    ];
    const episodesData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div className="container-fluid px-5 mb-5">
            {/*section header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                {/* playlists filter */}
                <h4 className="custom-fs-16 text-capitalize theme_text_secondary">{useLang("all episodes", "كل الحلقات")}</h4>
                {/* videos sort */}
                <SortComp sortList={sortList} activeSort={activeSort} setActiveSort={setActiveSort} />
            </div>
            {/* section videos */}
            <div className="row mx-0">
                {episodesData?.length > 0 ? (
                    episodesData.map((item, idx) => (
                        <div
                            key={idx}
                            className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0"
                        >
                            <VideoCard />
                        </div>
                    ))
                ) : (
                    <EmptyComp
                        titleEn="no episodes listed"
                        titleAr="لا توجد حلقات مُدرجة"
                        subTitleEn="this show has launched, but no episodes are published on argaam’s youTube channel yet, so there is nothing to play here."
                        subTitleAr="انطلق هذا البرنامج، لكن لا توجد له حلقات منشورة على قناة أرقام في يوتيوب حتى الآن، فلا يمكن تشغيله هنا."
                        btnLabelEn="all"
                        btnLabelAr="الكل"
                        btnFnc={() => setActivePlayList("all")}
                    />
                )}
            </div>
        </div>
    )
}

export default channel
