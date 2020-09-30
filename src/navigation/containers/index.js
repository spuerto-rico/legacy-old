import React, { Component } from "react";
import { connect } from "react-redux";
import ApplicationNavigator from "../navigators";
import { navigateBack } from "../actions";
import { addNavigationHelpers } from "react-navigation";
import { BackHandler } from "react-native";
import { createReduxContainer, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';

const mapStateToProps = state => ({
  state: state.nav
});

const mapDispatchToProps = dispatch => ({ dispatch });

// class ApplicationNavigatorContainer extends Component {
//   handleBackButton = () => {
//     const { navigation, dispatch } = this.props;
//     //if its at the most backwards state
//     if (navigation.index === 0) return false;
//     dispatch(navigateBack());
//     return true;
//   };
//
//   componentWillMount() {
//     BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
//   }
//   componentWillUnmount() {
//     this.removeEventListener("hardwareBackPress", this.handleBackButton);
//   }
//
//   render() {
//     return (
//       <ApplicationNavigator
//         navigation={{
//         dispatch: this.props.dispatch,
//         state: this.props.navigation}}
//       />
//     );
//   }
// }

export const middleware = createReactNavigationReduxMiddleware(state => state.nav);
const Nav = createReduxContainer(ApplicationNavigator, "root");

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
