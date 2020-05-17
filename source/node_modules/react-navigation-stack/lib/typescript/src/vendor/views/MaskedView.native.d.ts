import * as React from 'react';
import RNCMaskedView from '@react-native-community/masked-view';
declare type Props = React.ComponentProps<typeof RNCMaskedView> & {
    children: React.ReactElement;
};
export default function MaskedView({ children, ...rest }: Props): JSX.Element;
export {};
