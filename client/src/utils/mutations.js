import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation Mutation($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;
export const AUTH_USER_SESSION = gql`
	mutation authUserSession($sessionId: ID!) {
		authUserSession(sessionId: $sessionId) {
			_id
		}
	}
`;
export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const POST_MESSAGE_TO_CHANNEL = gql`
	mutation Mutation($channelId: ID!, $messageText: String!) {
		addMessageToChannel(channelId: $channelId, messageText: $messageText) {
			_id
		}
	}
`;

export const CREATE_CHANNEL = gql`
	mutation Mutation($channelName: String!) {
		createChannel(channelName: $channelName) {
			_id
			channelName
		}
	}
`;
export const JOIN_CHANNEL = gql`
	mutation JoinChannel($channelId: String) {
		joinChannel(channelId: $channelId) {
			_id
			channelName
		}
	}
`;
export const LEAVE_CHANNEL = gql`
	mutation Mutation($channelId: String) {
		leaveChannel(channelId: $channelId) {
			_id
			channelName
		}
	}
`;
export const UPDATE_SETTINGS = gql`
	mutation Mutation(
		$screenTextColor: String!
		$linkTextColor: String!
		$chatTextColor: String!
		$background: String!
		$chatWindow: String!
		$header: String!
	) {
		updateSettings(
			screenTextColor: $screenTextColor
			linkTextColor: $linkTextColor
			chatTextColor: $chatTextColor
			background: $background
			chatWindow: $chatWindow
			header: $header
		) {
			settings {
				screenTextColor
				linkTextColor
				chatTextColor
				background
				chatWindow
				header
			}
		}
	}
`;
