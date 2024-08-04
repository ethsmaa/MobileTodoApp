import { Slot, Stack, Tabs } from "expo-router"
import { Text, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
        <Tabs
            screenOptions={{
                headerShown: false
            }}
        >
                        <Tabs.Screen name="user" />

            <Tabs.Screen name="todo-page" />
            <Tabs.Screen name="index" />
        </Tabs>
    </SafeAreaView>
    </GestureHandlerRootView>
    )

}