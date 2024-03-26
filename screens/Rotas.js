import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import Login from './Login';
import Cadastro from './Cadastro';

const Stack = createStackNavigator();

export default function Rotas(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}