import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  return (
    <View style={tw.style('bg-blue-100')}>
      <Text style={tw.style('text-md', invalid && 'text-red-500')}>Hello</Text>
    </View>
  );
}
