import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import Vue from "vue";
import VueApollo from "vue-apollo";
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://api.localhost/graphql',
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: 'wss://api.localhost/graphql',
  options: {
    reconnect: true,
  },
})

const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
    },
    wsLink,
    httpLink
)

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})


export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)
