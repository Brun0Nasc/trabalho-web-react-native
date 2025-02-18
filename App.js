import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Atletas from './api/CardAtleta';
import DetalharAtleta from './api/DetalhamentoAtleta'
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: DetalharAtleta,
    Detalhamento: Atletas,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <View style={{flex:1}}>
      <Navigation />
      <StatusBar style="auto" />
    </View>
  );
}
