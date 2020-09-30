import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Drawer from "./drawer";
import * as screenNames from "../screen_names";
import Login from "../../features/login/components";

const appNavigator = createStackNavigator({
  [screenNames.DRAWER]: {
    screen: Drawer
  },
  [screenNames.LOGIN]: {
    screen: Login
  }
},
{
  defaultNavigationOptions: {
    header: null
  },
  initialRouteName: 'Login',
}
);

export default createAppContainer(appNavigator);
