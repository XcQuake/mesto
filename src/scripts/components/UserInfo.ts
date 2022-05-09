import { IUserData } from '../models/interfaces';

interface ISelectors {
  nameSelector: string,
  aboutSelector: string,
  avatarSelector: string,
}

export class UserInfo {
  private name: Element;
  private about: Element;
  private avatar: HTMLImageElement;
  private data: {
    name: string,
    about: string,
  };

  constructor({nameSelector, aboutSelector, avatarSelector}: ISelectors) {
    this.name = document.querySelector(nameSelector);
    this.about = document.querySelector(aboutSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this.data['name'] = this.name.textContent;
    this.data['about'] = this.about.textContent;

    return this.data
  }

  setUserInfo(user: IUserData): void {
    this.name.textContent = user.name;
    this.about.textContent = user.about;
  }

  setAvatar(user: IUserData): void {
    this.avatar.src = user.avatar;
  }
}
