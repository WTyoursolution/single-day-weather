import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.css";


const div = document.getElementById("root"); // Ensure the div exists before rendering
ReactDOM.createRoot(div).render(<App />); 