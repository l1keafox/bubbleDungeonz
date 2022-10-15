import "./Settings.css";
import { useState, useEffect } from "react";
import { GET_ME } from "./../../utils/queries";
import { UPDATE_SETTINGS } from "./../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

function Settings({  show }) {
	const showHideClassName = show ? "modal mainModal d-block show" : "modal mainModal d-block ";

	const [updateSettings] = useMutation(UPDATE_SETTINGS);

	const { data, loading } = useQuery(GET_ME);
	let [settings, setSettings] = useState({
		background: "Fuscia",
		chatTextColor: "Red",
		chatWindow: "Orange",
		header: "Tangerine",
		linkTextColor: "Lime",
		screenTextColor: "Purple",
	});

	useEffect(() => {
		if (loading) {
			return;
		} else {
			let dataSettings = data?.me?.settings;

			if (dataSettings?.background !== null) {
				setSettings(dataSettings);
			}
		}
	}, [data]);

	const colorKeys = [
		"Fuscia",
		"Red",
		"Orange",
		"Tangerine",
		"Carrot",
		"Yellow",
		"Lime",
		"Green",
		"Dark Green",
		"Sea Foam Green",
		"Turquoise",
		"Teal",
		"Aegean Blue",
		"Sky Blue",
		"Navy",
		"Purple",
		"White",
		"Black",
	];


	const changeSettings = (e) => {
		let value = e.target.value;
		let setting = e.target.name;

		switch (setting) {
			case "screenTextColor":
				setSettings((settings) => ({ ...settings, screenTextColor: value }));
				break;
			case "linkTextColor":
				setSettings((settings) => ({ ...settings, linkTextColor: value }));
				break;
			case "chatTextColor":
				setSettings((settings) => ({ ...settings, chatTextColor: value }));
				break;
			case "background":
				setSettings((settings) => ({ ...settings, background: value }));
				break;
			case "chatWindow":
				setSettings((settings) => ({ ...settings, chatWindow: value }));
				break;
			case "header":
				setSettings((settings) => ({ ...settings, header: value }));
				break;
			default:
				console.log("Something went very wrong");
				break;
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		// Since mutation function is async, wrap in a `try...catch` to catch any network errors from throwing due to a failed request.
		try {
			let background = settings.background;

			let chatTextColor = settings.chatTextColor;
			let chatWindow = settings.chatWindow;
			let header = settings.header;
			let linkTextColor = settings.linkTextColor;
			let screenTextColor = settings.screenTextColor;
			// console.log("background", background);

			// Execute mutation and pass in defined parameter data as variables
			// const { data } = 
			await updateSettings({
				variables: {
					screenTextColor: screenTextColor,
					linkTextColor: linkTextColor,
					chatTextColor: chatTextColor,
					background: background,
					chatWindow: chatWindow,
					header: header,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={showHideClassName} id="mainModal">
			<h1>Settings</h1>
			<div className="modal-main">
				<div className="settingsOptions">
					<h3>Change Screen Text Color</h3>
					<select
						name="screenTextColor"
						className="form-select"
						aria-label="screen-text-color"
						value={settings?.screenTextColor}
						onChange={changeSettings}
					>
						<option>Screen Text Color</option>
						{colorKeys.map((opt) => (
							<option key={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div className="settingsOptions">
					<h3>Link Text Color</h3>
					<select
						name="linkTextColor"
						className="form-select"
						aria-label="link-text-color"
						value={settings?.linkTextColor}
						onChange={changeSettings}
					>
						<option>Link Text Color</option>
						{colorKeys.map((opt) => (
							<option key={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div className="settingsOptions">
					<h3>Change Chat Text Color</h3>
					<select
						name="chatTextColor"
						className="form-select"
						aria-label="chat-text-color"
						value={settings?.chatTextColor}
						onChange={changeSettings}
					>
						<option>Chat Text Color</option>
						{colorKeys.map((opt) => (
							<option key={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div className="settingsOptions">
					<h3>Change Background Color</h3>
					<select
						name="background"
						className="form-select"
						aria-label="background-color"
						value={settings?.background}
						onChange={changeSettings}
					>
						<option>Background Color</option>
						{colorKeys.map((opt) => (
							<option key={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div className="settingsOptions">
					<h3>Change Chat Window Color</h3>
					<select
						name="chatWindow"
						className="form-select"
						aria-label="chat-window-color"
						value={settings?.chatWindow}
						onChange={changeSettings}
					>
						<option>Chat Window Color</option>
						{colorKeys.map((opt) => (
							<option key={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div className="settingsOptions">
					<h3>Change Header Color</h3>
					<select
						name="header"
						className="form-select"
						aria-label="header-color"
						value={settings?.header}
						onChange={changeSettings}
					>
						<option>Header Color</option>
						{colorKeys.map((opt) => (
							<option key={opt}>{opt}</option>
						))}
					</select>
				</div>
				<button
					type="button"
					onClick={handleFormSubmit}
					className="save-button"
					data-bs-toggle="modal"
					data-bs-target="#launchModal"
				>
					Save Changes
				</button>
			</div>
		</div>
	);
}
export default Settings;
