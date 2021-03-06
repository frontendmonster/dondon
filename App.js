import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { View, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './app/screens/Home';
import ChainsScreen from './app/screens/Chains';
import SettingScreen from './app/screens/Setting';
import colors from './app/constants/colors';
import FontProvider from './FontProvider';
import Header from './app/components/Header';

const Navigation = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Chains: ChainsScreen,
    Setting: SettingScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;

        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Chains':
            iconName = 'link';
            break;
          default:
            iconName = 'credit-card';
        }
        return <Icon name={iconName} size={24} color={tintColor} />;
      },
      title: (navigation.state.routeName == 'Home' ? 'خانه' : (navigation.state.routeName !== 'Setting' ? 'زنجیره ها' : 'کیف پول')),
    }),
    tabBarOptions: {
      activeTintColor: colors.tabIconSelected,
      inactiveTintColor: colors.tabIconDefault,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: colors.tintColor,
      },
    },
    initialRouteName: 'Chains',
  },
);

export default class App extends Component {
  render() {
    const paddingTop = (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight;
    return (
      <View style={{ paddingTop, flex: 1, backgroundColor: colors.backgroundColor }}>
        <FontProvider>
          <Navigation />
        </FontProvider>
      </View>
    );
  }
}
