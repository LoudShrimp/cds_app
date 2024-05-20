import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminView from "./pages/AdminView";
import NewForm from "./pages/NewForm";
import LoanList from "./pages/LoanList";

const router = createBrowserRouter([
  {
    path: "/",
    //element: LayoutPage
    //errorElement: ErrorPage
    children: [
      { index: true, element: <HomePage /> },
      { path: "user/newform", element: <NewForm /> },
      {
        path: "user/existingforms",
        element: <LoanList userType="user" />,
      },
      { path: "admin/view", element: <AdminView /> },
    ],
  },
]);

export default router;
