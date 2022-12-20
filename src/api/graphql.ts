import {ApolloClient, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import {setContext} from '@apollo/client/link/context';
import {getAuthToken} from "@store/auth";

const httpLink = createUploadLink({
    uri: (import.meta.env.VITE_GRAPHQL_BASE_URL || '/'),
});

const authLink = setContext((_, {headers}) => {
    // Get the authentication token from local storage if it exists
    const token = getAuthToken();
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const graphql = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});