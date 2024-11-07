import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function LayoutTab(){

    return(

        <Tabs  screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#777',
            tabBarStyle: { backgroundColor: '#363453' },
            headerShown: false,
        }}>
            <Tabs.Screen name="dashboard" options={{title:"",
                tabBarIcon: ({color}) =><Ionicons name="home" size={28} color={color} />
                
            }}/>
            <Tabs.Screen name="atividades" options={{title:"", tabBarIcon: ({color})=> <FontAwesome size={28} name="calendar" color={color}></FontAwesome>}} />
            {/* <Tabs.Screen name="devocionais" options={{title:"", tabBarIcon: ({color})=> <FontAwesome size={28} name="book" color={color}></FontAwesome>}} /> */}
            <Tabs.Screen name="logout" options={{title:"", tabBarIcon: ({color})=> <FontAwesome size={28} name="arrow-circle-o-right" color={color}></FontAwesome>}} />

        </Tabs>
    )

}