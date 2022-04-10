import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {WebSocketLink} from 'apollo-link-ws'
import Vue from "vue";
import VueApollo from "vue-apollo";
import {ApolloLink, split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import {createUploadLink} from "apollo-upload-client";
import exp from "constants";

// Create the subscription websocket link
//TODO: Implement authentication
const wsLink = new WebSocketLink({
    uri: import.meta.env.VUE_API_WS_URL + '/graphql',
    options: {
        reconnect: true,
    },
})

function genApolloClient(){
    return new ApolloClient({
        link: split(
            // split based on operation type
            ({query}) => {
                const definition = getMainDefinition(query)
                return definition.kind === 'OperationDefinition' &&
                    definition.operation === 'subscription'
            },
            wsLink,
            // @ts-ignore
            createUploadLink({uri: import.meta.env.VUE_API_URL + '/graphql', headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }})
        ),
        cache: new InMemoryCache(),
    })
}

// TODO: find a way to generate a client only when logged in
export const apolloProvider = new VueApollo({
    defaultClient: genApolloClient()
})

export function genClient(){
    apolloProvider.defaultClient.stop();
    apolloProvider.defaultClient = genApolloClient();
}

export function stopClient(){
    apolloProvider.defaultClient.stop();
}

Vue.use(VueApollo)
