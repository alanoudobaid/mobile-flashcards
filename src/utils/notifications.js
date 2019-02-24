import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFCATION_KEY = 'UdaciCards:notifications';

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFCATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
  return {
    title: 'Flashcard Review!',
    body: "👋 You haven't reviewed your flashcards today, just thought you should know!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFCATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let notificationTime = new Date();
              notificationTime.setDate(notificationTime.getDate() + 1)
              notificationTime.setHours(20)
              notificationTime.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: notificationTime,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFCATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
