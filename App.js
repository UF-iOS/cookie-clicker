import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, StatusBar } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicks: 0 }
    this.cookieScale = new Animated.Value(1);
    this.plusOpacity = new Animated.Value(0);
  }

  _handleCookieClick = () => {
    this.setState({ clicks: this.state.clicks + 1 })
    Animated.sequence([
      Animated.timing(this.plusOpacity, { 
        toValue: 1, 
        duration: 100,
      }),
      Animated.timing(this.plusOpacity, { 
        toValue: 0, 
        duration: 300,
      })
    ]).start();
  }

  _handleCookiePressIn = () => {
    Animated.timing(this.cookieScale, { 
      toValue: 0.8, 
      duration: 100,
    }).start();
  }

  _handleCookiePressOut = () => {
    Animated.timing(this.cookieScale, { 
      toValue: 1, 
      duration: 100,
    }).start();
  }

  render() {
    const cookieSize = this.cookieScale.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 150]
    })
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Animated.View
          style={{ opacity: this.plusOpacity }}>
          <Text style={styles.plus}>+1</Text>
        </Animated.View>
        <Text style={styles.text}>{this.state.clicks}</Text>
        <Animated.View
          style={{
            height: cookieSize,
            width: cookieSize
          }}>
          <TouchableOpacity
            activeOpacity={0.90}
            onPressIn={this._handleCookiePressIn}
            onPressOut={this._handleCookiePressOut}
            onPress={this._handleCookieClick}>
            <Image 
              style={styles.cookie}
              source={require('./assets/cookie.png')}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50, 
    fontWeight: '600', 
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    top: 100
  },
  plus: {
    fontSize: 35, 
    fontWeight: '600', 
    textAlign: 'center',
    color: '#0059b3',
    marginBottom: 15
  },
  cookie: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff'
  },
});
