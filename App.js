import React from "react";
import { StatusBar, View } from "react-native";
import { createStore } from "redux";

import { Provider } from "react-redux";
import { Constants, SplashScreen, Font, AppLoading } from "expo";
import { Root } from "native-base";
import Navigation from "./src/screens";

import reducer from "./src/reducers";
import { setLocalNotification, setInitialDecks, navColor } from "./src/utils";

const store = createStore(reducer);

const FlashcardsStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  componentDidMount() {
    SplashScreen.hide();

    setLocalNotification();
    setInitialDecks();
  }
  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <View style={{ height: Constants.statusBarHeight }}>
              <FlashcardsStatusBar
                backgroundColor={navColor}
                barStyle="light-content"
              />
            </View>
            <Navigation />
          </View>
        </Provider>
      </Root>
    );
  }
}
