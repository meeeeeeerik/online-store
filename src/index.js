import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./app.js";
import { AuthProvider } from "./components/authContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
