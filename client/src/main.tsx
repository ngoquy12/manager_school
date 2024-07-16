import ReactDOM from "react-dom/client";
import "./index.scss";
import router from "./routes/index.tsx";
import { RouterProvider } from "react-router-dom";
import "./i18n.ts";
import { Provider } from "react-redux";
import store from "./redux/store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
