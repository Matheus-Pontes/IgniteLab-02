import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4uczm860rc101uhb1pv81u2/master',
    cache: new InMemoryCache()
});