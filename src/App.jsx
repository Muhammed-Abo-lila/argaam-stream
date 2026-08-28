import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import useLang from "./utils/useLang";
import Layout from "./Layout";

const Home = lazy(() => import("./pages/Home/Home"));
const Channels = lazy(() => import("./pages/Channels/Channels"));
const BrowseAll = lazy(() => import("./pages/BrowseAll/BrowseAll"));
const MyList = lazy(() => import("./pages/MyList/MyList"));
const Search = lazy(() => import("./pages/Search/Search"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  const lang = useLang("en", "ar");
  const LangRedirectWrapper = () => {
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    if (pathParts[1] !== lang) {
      pathParts[1] = lang;
      return <Navigate to={pathParts.join("/")} replace />;
    }
    return <NotFound />;
  };

  const router = createBrowserRouter([
    {
      path: lang,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "channels",
          element: <Channels />,
        },
        {
          path: "browse",
          element: <BrowseAll />,
        },
        {
          path: "myList",
          element: <MyList />,
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
    {
      path: "*",
      element: <LangRedirectWrapper />,
    },
  ]);

  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
