import { IUserData } from '../models/Interfaces';

interface ISelectors {
  nameSelector: string,
  aboutSelector: string,
  avatarSelector: string,
}

export class UserInfo {
  private name: Element;
  private about: Element;
  private avatar: HTMLImageElement;

  constructor({nameSelector, aboutSelector, avatarSelector}: ISelectors) {
    this.name = document.querySelector(nameSelector);
    this.about = document.querySelector(aboutSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserInfo(): {name: string, about: string;} {
    return {
      name: this.name.textContent,
      about: this.about.textContent,
    }
  }

  setUserInfo(user: IUserData): void {
    this.name.textContent = user.name;
    this.about.textContent = user.about;
  }

  setAvatar(user: IUserData): void {
    this.avatar.src = user.avatar;
  }
}
