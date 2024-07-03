import React from "react";
import { Menu, MenuItemProps} from 'react-native-paper'; 
import { View, Text} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type menuItemProps = {
    title: string,
    onPress: () => void,
    iconName : any,
    };


const MenuItem: React.FC<menuItemProps> = (props) => {
  return (
    <Menu.Item onPress={props.onPress} title={
        <View className='flex flex-row items-center'>
          <Feather name={props.iconName} size={24} color="white" />
          <Text style= {styles.menuItemText}>{props.title}</Text>
        </View>
      } />
  );
}

const styles = {
    menuItemText: {
        color: 'white',
        marginLeft: 8,
      },
};

export default MenuItem;