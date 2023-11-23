import 'react-native-gesture-handler';
import {AppRegistry,LogBox } from 'react-native';
import App from './src/App/App';
import {name as appName} from './app.json';
import SOSButton from './src/Screens/SOSButton/SOSButton';


LogBox.ignoreLogs([''])

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);

