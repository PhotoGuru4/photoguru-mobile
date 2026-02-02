import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Svg
        width={72}
        height={72}
        viewBox="0 0 64 64"
        fill="none"
      >
        <Path
          d="
            M14 22
            H22
            L25 18
            H39
            L42 22
            H50
            C53 22 55 24 55 27
            V43
            C55 46 53 48 50 48
            H14
            C11 48 9 46 9 43
            V27
            C9 24 11 22 14 22
            Z
          "
          stroke="#E06B80"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Circle
          cx={32}
          cy={35}
          r={9}
          stroke="#E06B80"
          strokeWidth={2}
        />

        <Circle
          cx={32}
          cy={35}
          r={4}
          stroke="#E06B80"
          strokeWidth={2}
        />

        <Circle
          cx={45}
          cy={27}
          r={1.8}
          fill="#E06B80"
        />
      </Svg>

      <ActivityIndicator
        size="small"
        color="#E06B80"
        className="mt-4"
      />
    </View>
  );
};

export default Loading;
