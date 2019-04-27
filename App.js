//import all screen
import HomeScreen from './screens/HomeScreen';
import AddNewContactScreen from './screens/AddNewContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';
import EditContactScreen from './screens/EditContactScreen';

import {createAppContainer,createStackNavigator} from 'react-navigation';


const MainNavigator = createStackNavigator(
  {
    Home : {screen: HomeScreen},
    Add : {screen: AddNewContactScreen},
    VieW : {screen: ViewContactScreen},
    Edit : {screen: EditContactScreen},
  },
  {
    defaultNavigationOptions:{
      headerTintColor: '#fff',
      headerStyle:{
        backgroundColor : '#673ab7',
      },
      headerTitleStyle:{
        color: '#fff'
      }
    }
  }
)

const App = createAppContainer(MainNavigator);

export default App;