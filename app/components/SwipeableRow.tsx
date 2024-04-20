import React, { Component } from 'react';
import { Animated, StyleSheet, I18nManager, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../../assets/colors';

const AnimatedView = Animated.createAnimatedComponent(View);

type SwipeableRowProps = {
  children: React.ReactNode;
  onDelete: () => void;
  onSwipeableLeftOpen?: () => void;
};


export default class SwipeableRow extends Component<SwipeableRowProps> {
  private renderLeftActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons style={styles.actionIcon} name="share-outline" size={24} color="white" />
        </Animated.View>
      </RectButton>
    );
  };
  private renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons style={styles.actionIcon} name="trash-outline" size={24} color="white"/>
        </Animated.View>
      </RectButton>
    );
  };

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
  };
  // handles the swipe action and executes the delete or share operation
  handleSwipeAction = (direction) => {
    if (direction === 'right') {
      this.props.onDelete(); // Execute the delete operation
    } 
    if (direction === 'left'){
      this.props.onSwipeableLeftOpen(); // Execute the share operation
    }
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
        onSwipeableWillOpen={this.handleSwipeAction}
        >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    alignSelf: 'center',
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    borderRadius: 10,  // Added border radius here
  },
  actionIcon: {
    marginHorizontal: 20,
  },
  rightAction: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: colors.error,
    justifyContent: 'flex-end',
    borderRadius: 10,  // Added border radius here
    height: 50,
  },
});