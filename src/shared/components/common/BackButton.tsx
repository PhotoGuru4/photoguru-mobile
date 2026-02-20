import { Pressable } from 'react-native';
import {
  useNavigation,
  useRoute,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';

interface BackButtonProps {
  size?: number;
  color?: string;
  fallback?: keyof ParamListBase;
}

type RouteParams = {
  from?: keyof ParamListBase;
};

export const BackButton = ({
  size = 24,
  color = '#E06B80',
  fallback,
}: BackButtonProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();

  const handleBack = () => {
    const params = route.params as RouteParams | undefined;
    const from = params?.from;

    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    const parent = navigation.getParent();
    if (parent?.canGoBack()) {
      parent.goBack();
      return;
    }

    if (from) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: from }],
        }),
      );
      return;
    }

    if (fallback) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: fallback }],
        }),
      );
      return;
    }

    console.warn('No back action available');
  };

  return (
    <Pressable onPress={handleBack} hitSlop={10}>
      <ChevronLeft size={size} color={color} />
    </Pressable>
  );
};
