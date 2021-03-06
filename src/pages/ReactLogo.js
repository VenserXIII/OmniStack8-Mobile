import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import reactLogo from '../assets/reactLogo.png';

export default class webviewWithLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {spinAnim: new Animated.Value(0)};
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }

  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.Image
        style={{height: 50, width: 50, transform: [{rotate: spin}]}}
        source={reactLogo}
      />
    );
  }
}
