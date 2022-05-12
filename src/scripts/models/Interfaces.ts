export interface ApiConfig {
  baseUrl: string,
  headers: {
    authorization: string,
    'Content-Type': string,
  }
};

export interface ValidateConfig {
  form: string;
  inputSelector: string;
  buttonSelector: string;
  buttonInactiveClass: string;
  activeErrorClass: string;
  inputErrorClass: string;
}

export interface IUserData {
  about: string,
  avatar: string,
  cohort: string,
  name: string,
  _id: string,
};

export interface ICardData {
  createdAt: Date,
  likes: IUserData[],
  link: string,
  name: string,
  owner: IUserData,
  _id: string
};
