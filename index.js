/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import SearchScreen from './Screens/SearchScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SearchScreen);
