import { gql } from '@apollo/client';

export const QUERY_PROFIELS = gql`
    query allUsers {
        users{
            _id
            username
            email
        }
    }
`;