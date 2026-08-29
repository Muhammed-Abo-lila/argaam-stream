import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
const Home = () => {
  return (
    <div className="container mt-5 custom-fs-24-30">
      {useLang("home", "الرئيسيه")}
      <VideoCard />
    </div>
  );
};

export default Home;
