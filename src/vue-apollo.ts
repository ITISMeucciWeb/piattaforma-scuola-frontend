import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {WebSocketLink} from 'apollo-link-ws'
import Vue from "vue";
import VueApollo from "vue-apollo";
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import {createUploadLink} from "apollo-upload-client";
import {buildAxiosFetch} from "@lifeomic/axios-fetch/src";
import {HTTP} from "@/http-common";

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
            createUploadLink({uri: import.meta.env.VUE_API_URL + '/graphql', credentials: "include", fetch: buildAxiosFetch(HTTP)})
        ),
        cache: new InMemoryCache(),
    })
}

export const apolloProvider = new VueApollo({
    defaultClient: genApolloClient()
})

Vue.use(VueApollo)
