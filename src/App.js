import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import QuotesPage from "./components/QuotesPage";
import QuoteCreate from "./components/QuoteCreate";

const router = createBrowserRouter([
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
