/* eslint-disable */

import React from "react";
import { AxiosInstance } from "axios";

import notificationLogoImg from "app/assets/icons/incicle-favicon.png";
import notificationSound from "app/assets/audios/incicle-notification.mp3";

import { incicleModules } from "app/components/InHeader/data/modules";
import { INotificationProps } from "app/interfaces/Notification";
import { FaviconOptionType } from "app/hooks/useHTMLHead";
import { addToast } from "app/components/Toast";
import { NotificationDTO } from "app/components/Notifications/DTO/NotificationDTO";
import { updateSawNotifications } from "app/services/notifier/notifications";
import { links } from "app/config/links";
import { NotificationEvent } from "app/providers/NotificationEvent";

type NotificationOptionsType = {
  api: AxiosInstance;
  dropdownOpened: boolean;
  notificationViewCount: number;

  setBadgeAsInvisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDropdownOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifications: React.Dispatch<React.SetStateAction<INotificationProps[]>>;
  setNotificationViewCount: React.Dispatch<React.SetStateAction<number>>;

  defineFavicon(icon: FaviconOptionType): void;
  definePageTitle(content: string | ((title: string) => string)): void;
};

export default class NotificationUseCase {
  // presets ----------------------------------------- // --------------------------------------------------------- //

  private api: NotificationOptionsType["api"] = {} as any;
  private dropdownOpened: boolean = false;
  private notificationViewCount: number = 0;

  private defineFavicon: NotificationOptionsType["defineFavicon"] = () => {};
  private definePageTitle: NotificationOptionsType["definePageTitle"] = () => {};

  private setBadgeAsInvisible: NotificationOptionsType["setBadgeAsInvisible"] = () => {};
  private setDropdownOpened: NotificationOptionsType["setDropdownOpened"] = () => {};
  private setNotifications: NotificationOptionsType["setNotifications"] = () => {};
  private setNotificationViewCount: NotificationOptionsType["setNotificationViewCount"] = () => {};

  // local  ------------------------------------------ // --------------------------------------------------------- //

  private replacer = (title: string) => title.replace(/\+/, "").replace(/\([\d]+\)\s/g, "");

  private checkIfNotAbleToNotify = () => links.production && window.location.origin !== links.web.social;

  private preventScopeLoss() {
    this.executeBrowserTab = this.executeBrowserTab.bind(this);
    this.executeToastNotification = this.executeToastNotification.bind(this);
    this.initializeEvents = this.initializeEvents.bind(this);
    this.executeBrowserNotification = this.executeBrowserNotification.bind(this);
    this.handleOpenDropdown = this.handleOpenDropdown.bind(this);
    this.handleCloseDropdown = this.handleCloseDropdown.bind(this);
    this.requestPermission = this.requestPermission.bind(this);
    this.appendNew = this.appendNew.bind(this);
    this.update = this.update.bind(this);
    this.notify = this.notify.bind(this);
  }

  // constructor ----------------------------------- // ----------------------------------------------------------- //

  constructor({
    api,
    dropdownOpened,
    notificationViewCount,
    defineFavicon,
    definePageTitle,
    setBadgeAsInvisible,
    setDropdownOpened,
    setNotificationViewCount,
    setNotifications,
  }: NotificationOptionsType) {
    this.api = api;
    this.dropdownOpened = dropdownOpened;
    this.notificationViewCount = notificationViewCount;

    this.defineFavicon = defineFavicon;
    this.definePageTitle = definePageTitle;
    this.setBadgeAsInvisible = setBadgeAsInvisible;
    this.setDropdownOpened = setDropdownOpened;
    this.setNotificationViewCount = setNotificationViewCount;
    this.setNotifications = setNotifications;

    this.preventScopeLoss();
  }

  // update notification -------------------------- // ------------------------------------------------------------ //

  update(notificationList: INotificationProps[], viewCount?: number) {
    if (!this.dropdownOpened) {
      this.setNotificationViewCount(viewCount || 0);
    }

    this.setNotifications(old => old.concat(notificationList));
  }

  appendNew(notification: INotificationProps) {
    this.setNotificationViewCount(old => old + 1);
    this.setNotifications(old => [notification, ...old]);
  }

  // browser permission --------------------------- // ------------------------------------------------------------ //

  async requestPermission() {
    // social network only
    if (this.checkIfNotAbleToNotify()) return;

    try {
      // @ts-ignore
      const { default: Push } = await import("push.js");

      if (!Push.Permission.has()) {
        Push.Permission.request();
      }
    } catch {}
  }

  // notifiers ------------------------------------ // ------------------------------------------------------------ //

  notify(notification: INotificationProps) {
    // handle new notification when dropdown is open
    if (this.dropdownOpened) {
      updateSawNotifications(this.api);
    } else {
      this.executeBrowserTab(this.notificationViewCount + 1);
    }

    if (document.hidden) {
      this.executeBrowserNotification(notification);
    }

    if (!document.hidden && !this.dropdownOpened) {
      this.executeToastNotification(notification);
    }

    this.appendNew(notification);
  }

  executeBrowserTab(count?: number) {
    const viewCount = count || this.notificationViewCount;

    if (viewCount <= 0) {
      this.defineFavicon("incicle-logo");
      this.definePageTitle(this.replacer);

      this.setBadgeAsInvisible(true);

      return;
    }

    this.defineFavicon("new-notification-icon");
    this.definePageTitle(title => `(${viewCount > 99 ? "+99" : viewCount}) ${this.replacer(title)}`);
    this.setBadgeAsInvisible(false);
  }

  executeToastNotification(notification: INotificationProps) {
    const notificationDTO = new NotificationDTO(notification);
    const { NotificationImageBox, NotificationComponent } = notificationDTO.toToast() || {};

    if (document.hidden) return;

    if (NotificationImageBox && NotificationComponent) {
      addToast(NotificationComponent, {
        appearance: "info",
        icon: NotificationImageBox,
        closeOnClick: true,
      });
    }
  }

  async executeBrowserNotification(notification: INotificationProps) {
    // social network only
    if (this.checkIfNotAbleToNotify()) return;

    try {
      // @ts-ignore
      const { default: Push } = await import("push.js");

      if (!Push.Permission.has()) return;

      const notificationDTO = new NotificationDTO(notification);
      const notificationMessage = notificationDTO.toBrowserAPI();
      const { title } = incicleModules.find(item => item.slug === notification.module) || {};

      Push.create(`${title || ""}`, {
        icon: notificationLogoImg,
        body: notificationMessage || "",
        timeout: 4000,
        onClick() {
          window.focus();

          // @ts-ignore
          this?.close();

          NotificationEvent.emit("open_dropdown");
        },
      });

      new Audio(notificationSound).play();
    } catch {}
  }

  // dropdown ------------------------------------- // ------------------------------------------------------------ //

  handleOpenDropdown() {
    this.setBadgeAsInvisible(true);
    this.setDropdownOpened(true);
    this.setNotificationViewCount(0);

    this.defineFavicon("incicle-logo");
    this.definePageTitle(this.replacer);

    updateSawNotifications(this.api);
  }

  handleCloseDropdown() {
    this.setDropdownOpened(false);
    this.setNotifications(old => old.map(item => ({ ...item, saw: true })));
  }

  // apply events --------------------------------- // ------------------------------------------------------------ //

  initializeEvents() {
    NotificationEvent.on("open_dropdown", this.handleOpenDropdown);
    NotificationEvent.on("close_dropdown", this.handleCloseDropdown);
  }
}
