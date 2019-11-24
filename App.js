import React from 'react'
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './Screens/SearchScreen'
import ResultsScreen from './Screens/ResultsScreen'

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const AppNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen,
  },
  Results: {
    screen: ResultsScreen
  }
}, {
  initialRouteName: 'Search',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#00adb5'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 30,
    },
  },
}
);

const AppContainer = createAppContainer(AppNavigator)