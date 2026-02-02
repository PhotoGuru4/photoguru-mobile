import { Pressable } from 'react-native';
import {
  useNavigation,
  useRoute,
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';

interface BackButtonProps {
  size?: number;
  fallback?: keyof ParamListBase;
  color?: string;
}

type BackRouteParams = {
  from?: keyof ParamListBase;
};

export const BackButton = ({
  size = 24,
  color = '#E06B80',
  fallback,
}: BackButtonProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<Record<string, BackRouteParams>, string>>();

  const handleBack = () => {
    const from = route.params?.from;

    if (from) {
      navigation.navigate(from);
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    if (fallback) {
      navigation.navigate(fallback);
    }
  };

  return (
    <Pressable onPress={handleBack} hitSlop={10}>
      <ChevronLeft size={size} color={color} />
    </Pressable>
  );
};
