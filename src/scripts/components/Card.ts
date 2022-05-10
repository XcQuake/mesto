import { ICardData, IUserData } from "../models/Interfaces";

interface Handlers {
  handleCardClick: (image: HTMLImageElement) => void;
  handleDeleteCard: (data: object) => void;
  handlePutLike: () => void;
  handleDeleteLike: () => void;
}

export default class Card {
  private title: string;
  private link: string;
  private owner: IUserData;
  private likes: IUserData[];
  private cardId: string;
  private userId: string;

  private handleCardClick: (image: HTMLImageElement) => void;
  private handleDeleteCard: (data: object) => void;
  private handlePutLike: () => void;
  private handleDeleteLike: () => void;

  private element: HTMLElement;
  private likeButton: HTMLButtonElement;
  private deleteButton: HTMLButtonElement;
  private cardImage: HTMLImageElement;
  private cardTitle: HTMLElement;
  private likeCounter: HTMLElement;

  constructor(
    {item, userId}: {item: ICardData, userId: string},
    {handleCardClick, handleDeleteCard, handlePutLike, handleDeleteLike}: Handlers,
    private templateSelector: string
  ){
    this.title = item.name;
    this.link = item.link;
    this.owner = item.owner;
    this.likes = item.likes;
    this.cardId = item._id;
    this.userId = userId;

    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this.handlePutLike = handlePutLike;
    this.handleDeleteLike = handleDeleteLike;

    this.element = this.getTemplate();
    this.likeButton = this.element.querySelector('.card__like-button');
    this.deleteButton = this.element.querySelector('.card__delete-button');
    this.cardImage = this.element.querySelector('.card__image');
    this.cardTitle = this.element.querySelector('.card__title');
    this.likeCounter = this.element.querySelector('.card__like-counter');
  }

  private getTemplate(): HTMLElement {
    const cardElement = (document
      .querySelector(this.templateSelector) as HTMLTemplateElement)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return <HTMLElement>cardElement
  }

  private deleteCard(): void {
    const data = {
      card: this.element,
      cardId: this.cardId
    }
    this.handleDeleteCard(data);
  }

  private setEventListeners(): void {
    this.likeButton.addEventListener('click', () => {
      if(!this.likeButton.classList.contains('card__like-button_active')){
        this.handlePutLike()
      } else {
        this.handleDeleteLike()
      }
    });

    this.deleteButton.addEventListener('click', () => {
      this.deleteCard();
    });

    this.cardImage.addEventListener('click', () => {
      this.handleCardClick(this.cardImage);
    });
  }

  get id (): string {
    return this.cardId;
  }

  setLikesInfo(card: ICardData): void {
    this.likeButton.classList.toggle('card__like-button_active');
    this.likeCounter.textContent = card.likes.length.toString();
  }

  generateCard(): HTMLElement {
    this.setEventListeners();

    this.likes.forEach(el => {
      if (el._id == this.userId) {
        this.likeButton.classList.add('card__like-button_active');
      };
    });

    if (this.owner._id == this.userId){
      this.deleteButton.classList.remove('card__delete-button_hidden');
    };

    this.likeCounter.textContent = this.likes.length.toString();
    this.cardImage.src = this.link;
    this.cardImage.alt = this.title;
    this.cardTitle.textContent = this.title;

    return this.element;
  }
}
