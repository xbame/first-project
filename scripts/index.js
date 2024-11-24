// Модальные окна
const modals = {
  profile: document.querySelector(".popup_type_edit"),
  newCard: document.querySelector(".popup_type_new-card"),
  imageView: document.querySelector(".popup_type_image")
};

// Функция для управления состоянием модального окна
const togglePopup = (popup, action) => popup.classList[action]("popup_is-opened");

// Закрытие всех модальных окон
const closeAllModals = () => Object.values(modals).forEach(modal => togglePopup(modal, "remove"));

// Прокси для манипуляций с картами
function handleCardActions(cardElement, title, url) {
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    modals.imageView.querySelector(".popup__image").src = url;
    modals.imageView.querySelector(".popup__image").alt = title;
    modals.imageView.querySelector(".popup__caption").textContent = title;
    togglePopup(modals.imageView, "add");
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_is-active"));

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => cardElement.remove());
}

// Создание карточки
function createCardElement({ name, link }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newCard = cardTemplate.cloneNode(true);

  const cardImage = newCard.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  newCard.querySelector(".card__title").textContent = name;

  handleCardActions(newCard, name, link);

  return newCard;
}

// Инициализация начальных карт
const renderInitialCards = () => {
  const cardList = document.querySelector(".places__list");
  initialCards.forEach(cardData => {
    const card = createCardElement(cardData);
    cardList.appendChild(card);
  });
};

// Обработчик редактирования профиля
const profileForm = modals.profile.querySelector(".popup__form");
const profileTitleInput = modals.profile.querySelector(".popup__input_type_name");
const profileDescriptionInput = modals.profile.querySelector(".popup__input_type_description");

function openProfileEditPopup() {
  profileTitleInput.value = document.querySelector(".profile__title").textContent;
  profileDescriptionInput.value = document.querySelector(".profile__description").textContent;
  togglePopup(modals.profile, "add");
}

function updateProfileInfo(e) {
  e.preventDefault();
  document.querySelector(".profile__title").textContent = profileTitleInput.value;
  document.querySelector(".profile__description").textContent = profileDescriptionInput.value;
  togglePopup(modals.profile, "remove");
}

// Обработчики событий
document.querySelector(".profile__edit-button").addEventListener("click", openProfileEditPopup);
modals.profile.querySelector(".popup__close").addEventListener("click", () => togglePopup(modals.profile, "remove"));
profileForm.addEventListener("submit", updateProfileInfo);

// Обработчик добавления новой карточки
const cardForm = modals.newCard.querySelector(".popup__form");
const cardNameInput = modals.newCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = modals.newCard.querySelector(".popup__input_type_url");

function openNewCardPopup() {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  togglePopup(modals.newCard, "add");
}

function submitNewCard(e) {
  e.preventDefault();
  const card = createCardElement({ name: cardNameInput.value, link: cardLinkInput.value });
  document.querySelector(".places__list").prepend(card);
  togglePopup(modals.newCard, "remove");
}

// События для добавления карточки
document.querySelector(".profile__add-button").addEventListener("click", openNewCardPopup);
modals.newCard.querySelector(".popup__close").addEventListener("click", () => togglePopup(modals.newCard, "remove"));
cardForm.addEventListener("submit", submitNewCard);

// Добавление анимации всем модальным окнам
Object.values(modals).forEach(modal => modal.classList.add("popup_is-animated"));

// Инициализация начальных карт
renderInitialCards();
