import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Layout from "./Layout";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

const Home = lazy(() => import("./pages/Home/Home"));
const Channels = lazy(() => import("./pages/Channels/Channels"));
const BrowseAll = lazy(() => import("./pages/BrowseAll/BrowseAll"));
const MyList = lazy(() => import("./pages/MyList/MyList"));
const Search = lazy(() => import("./pages/Search/Search"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {

  const supportedLanguages = i18n.options.supportedLngs;
  const LanguageLayout = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    if (!supportedLanguages.includes(lang)) {
      return <Navigate to={`/${i18n.language}`} replace />;
    }
    return <Layout />;
  };


  const router = createBrowserRouter([
    {
      path: ":lang",
      element: <LanguageLayout />,
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
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
