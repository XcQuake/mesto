export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this._data = {};
    this._data['name'] = this._name.textContent;
    this._data['description'] = this._description.textContent;

    return this._data
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._description.textContent = item.description;
  }
}