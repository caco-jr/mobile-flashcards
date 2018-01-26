import { NavigationActions } from 'react-navigation'
import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'mobileFlashCards:notification'

export const clearNotifications = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = () => {
    return {
        title: 'Dont Forget to Study!',
        body: "🤔👋 Hey, don't forget to take a quiz today!",
        ios: {
            sound: true
        },
    }
}

export const setLocalNotification = () => {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(18)
                            tomorrow.setMinutes(0)
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}

export const objectToArray = (obj) => {
    return obj && Object.entries(obj).map((arr) => arr[1])
}

// reset the stack to the Deck Details view, with a back to Home, helps when
//  the user gets too deep down the rabbit hole with adding cards etc...
export const resetToDeck = (deck) => (
    NavigationActions.reset({
        index: 1,
        actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({ routeName: 'DeckItemDetails', params: { deck } }),
        ],
    })
)

// Reset the stack to Home
export const resetToHome =
    NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
        ],
    })