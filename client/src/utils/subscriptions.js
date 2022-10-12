import { gql } from '@apollo/client';

export const SUBSCRIBE_TO_CHANNEL = gql`
    subscription Subscription($channelId: ID!) {
        messageAdded(channelId: $channelId) {
        _id
        }
    } 
`;