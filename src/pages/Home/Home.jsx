import VideoCard from "../../components/common/VideoCard/VideoCard";
import useLang from "../../utils/useLang";
const Home = () => {
  return (
    <div className="container-fluid px-5">
      <div className="row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) =>
          <div key={idx} className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0">
            <VideoCard />
          </div>
        )}

      </div>

    </div>
  );
};

export default Home;
