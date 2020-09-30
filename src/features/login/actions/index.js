import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, API_FAILURE } from './types'
import { postCall, getCall, OAUTH } from '../../../api';
import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const getUser = async () => {
  let userReq = await getCall('api/user', {});
  userReq = await userReq.json();
  return userReq;
}

export const tokenRequest = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      let response = await postCall('oauth/token', { ...OAUTH, username, password });
      let result = await response.json();
      console.log('response', response, result)
      if (response.status == 200) {
        const payload = {
          refreshToken: result.refresh_token,
          expiration: result.expires_in,
          accessToken: result.access_token
        }

        // get the user profile
        await AsyncStorage.setItem('accessToken', payload.accessToken)
        let user = await getUser();
        console.log('response user', user)

        await AsyncStorage.setItem('profileInfo', JSON.stringify(user.data));
        if (user.data) {
          try {
            dispatch({ type: LOGIN_SUCCESS, user: user, payload: payload });

            dispatch(NavigationActions.navigate({ routeName: 'drawer' }));
          } catch (e) {
            // saving error
          }
        }
      } else {
        dispatch({ type: LOGIN_FAILED, message: result.message });
      }
    } catch(error) {
      console.log('Login API Error', error);
      alert('Network Connection Failed');
    }
  }
}
