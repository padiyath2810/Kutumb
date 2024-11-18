import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import QuotesPage from "./components/QuotesPage";
import QuoteCreate from "./components/QuoteCreate";
import Navbar from "./components/Navbar";
import Error from "./components/Error";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/quotes",
          element: <QuotesPage />,
        },
        {
          path: "/CreateQuotes",
          element: <QuoteCreate />,
        },
      ],
      errorElement: <Error />,
    },
  ],
  {
    basename: "/Kutumb",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
