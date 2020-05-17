import * as React from 'react';
import { ViewStyle } from 'react-native';
import { CreateNavigatorConfig, NavigationParams, NavigationRoute, NavigationRouteConfigMap, NavigationScreenProp, NavigationSwitchRouterConfig, SupportedThemes, NavigationScreenConfig } from 'react-navigation';
export declare type NavigationAnimatedSwitchConfig = NavigationSwitchRouterConfig & {
    transition?: React.ReactNode;
    transitionViewStyle?: ViewStyle;
};
export declare type NavigationAnimatedSwitchOptions = {};
export declare type NavigationAnimatedSwitchProp<State = NavigationRoute, Params = NavigationParams> = NavigationScreenProp<State, Params> & {
    jumpTo: (routeName: string, key?: string) => void;
};
export declare type NavigationAnimatedSwitchScreenProps<Params = NavigationParams, ScreenProps = unknown> = {
    theme: SupportedThemes;
    navigation: NavigationAnimatedSwitchProp<NavigationRoute, Params>;
    screenProps: ScreenProps;
};
export declare type NavigationAnimatedSwitchScreenComponent<Params = NavigationParams, ScreenProps = unknown> = React.ComponentType<NavigationAnimatedSwitchScreenProps<Params, ScreenProps>> & {
    navigationOptions?: NavigationScreenConfig<NavigationAnimatedSwitchOptions, NavigationAnimatedSwitchProp<NavigationRoute, Params>, ScreenProps>;
};
export default function createAnimatedSwitchNavigator(routeConfigMap: NavigationRouteConfigMap<{}, NavigationAnimatedSwitchProp>, switchConfig?: CreateNavigatorConfig<NavigationAnimatedSwitchConfig, NavigationSwitchRouterConfig, NavigationAnimatedSwitchOptions, NavigationAnimatedSwitchProp<NavigationRoute, any>>): any;
