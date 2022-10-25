import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const styles = {
	body: {
		margin: 0,
		fontFamily:
			"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
		webkitFontSmoothing: "antialiased",
		mozOsxFontSmoothing: "grayscale",
		backgroundImage: "linear-gradient(var(--navy) 0%, var(--purple) 100%)",
		minHeight: "100vh",
	},

	code: {
		fontFamily:
			"source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace",
	},
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<App style="{ background: red}" />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
