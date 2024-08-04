import { router } from "expo-router"
import { Button, Text, View } from "react-native"

export default () => {
    return <View>
        <Text>Sela asdadasm</Text>
        <Button
            title="go"
            onPress={() => router.push('/user')}
        />
 
    </View>
}