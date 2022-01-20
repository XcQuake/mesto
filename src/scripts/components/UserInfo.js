export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._data = {};
    this._data['name'] = this._name.textContent;
    this._data['about'] = this._about.textContent;

    return this._data
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._about.textContent = item.about;
  }

  setAvatar(item) {
    this._avatar.src = item.avatar;
  }
}