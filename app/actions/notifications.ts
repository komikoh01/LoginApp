"use server";

const Notifications = {
  notification1: "Notificacion de Luffy",
  notification2: "Notificacion de Zoro",
  notification3: "Notificacion de Brook",
  notification4: "Notificacion de Franky",
  notification5: "Notificacion de Sanji",
  notification6: "Notificacion de Nami",
  notification7: "Notificacion de Chopper",
  notification8: "Notificacion de Robin",
};

export async function getNotifications() {
  const notifications: string[] = [];

  for (let i in Notifications) {
      notifications.push(i);
  }

  return notifications;
}
