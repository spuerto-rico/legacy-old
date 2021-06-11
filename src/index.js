// @flow
import React, { Component } from "react";
import { Root } from "native-base";
import { Provider } from "react-redux";
import Layout from "./components/layout";
import ApplicationNavigator from "./navigation/containers";
import myStore from "./myStore";

console.disableYellowBox = true;

export default class MyApp extends Component {
  render() {
    return (
      <Provider store={myStore}>
        <Root>
          <Layout>
            <ApplicationNavigator />
          </Layout>
        </Root>
      </Provider>
    );
  }
}
