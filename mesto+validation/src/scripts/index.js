// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from "./cards";

const popups = document.querySelectorAll('.popup'); //Добавление анимации попапам
for (let i = 0; i < popups.length; i++){
    popups[i].classList.add('popup_is-animated');
}

/////////////////////////////////////////работа с попапами
const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupClose = profilePopup.querySelector('.popup__close');
profilePopupClose.addEventListener('click', function(){
    profilePopup.classList.remove('popup_is-opened');
});

const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupClose = cardPopup.querySelector('.popup__close');
cardPopupClose.addEventListener('click', function(){
    cardPopup.classList.remove('popup_is-opened');
});

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
imagePopupClose.addEventListener('click', function(){
    imagePopup.classList.remove('popup_is-opened');
});

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}


const profileEditButton = document.querySelector('.profile__edit-button'); //профиль
profileEditButton.addEventListener('click', function(){
    profilePopup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    profilePopup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
    profilePopup.classList.add('popup_is-opened');
});
profilePopup.querySelector('.popup__button').addEventListener('click', function(evt){
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = profilePopup.querySelector('.popup__input_type_name').value;
    document.querySelector('.profile__description').textContent = profilePopup.querySelector('.popup__input_type_description').value;
    profilePopup.classList.remove('popup_is-opened');
});

const profileAddButton = document.querySelector('.profile__add-button'); //добавление карточки
profileAddButton.addEventListener('click', function(){
    cardPopup.classList.add('popup_is-opened');
});
cardPopup.querySelector('.popup__button').addEventListener('click', function(evt){
    evt.preventDefault();
    addCardToPage(createCard(cardPopup.querySelector('.popup__input_type_url').value, cardPopup.querySelector('.popup__input_type_card-name').value))
    cardPopup.classList.remove('popup_is-opened');
    cardPopup.querySelector('.popup__input_type_url').value = '';
    cardPopup.querySelector('.popup__input_type_card-name').value = '';
});


//////////////////////////////////работа с карточками (Добавление произвольной)
const cardTemplate = document.querySelector("#template").content;

function createCard(link, name){
    const curCard = cardTemplate.querySelector('.places__item').cloneNode(true); //скопировали карточку
    curCard.querySelector('.card__image').src = link;
    curCard.querySelector('.card__description').querySelector('.card__title').textContent = name; //выбрали описание, добавили описание


    return curCard;
}

function createCardDefault(){
    const cardsArray = [];
    for (let i = 0; i < initialCards.length; i++){
        cardsArray.push(createCard(initialCards[i].link, initialCards[i].name));
    }
    for (let i = 0; i < initialCards.length; i++){
        const deleteCardButton = cardsArray[i].querySelector('.card__delete-button');
        deleteCardButton.addEventListener('click', function(evt){
            cardsArray[i].style = ('display: none');
        });

        const likeCardButton = cardsArray[i].querySelector('.card__like-button');
        likeCardButton.addEventListener('click', function(){
            likeCardButton.classList.toggle('card__like-button_is-active');
        });

        const imageOpenCard = cardsArray[i].querySelector('.card__image');
        imageOpenCard.addEventListener('click', function(){
            imagePopup.classList.add('popup_is-opened');
            imagePopup.querySelector('.popup__image').src =imageOpenCard.src;
            imagePopup.querySelector('.popup__caption').textContent = cardsArray[i].querySelector('.card__title').textContent;
            imagePopup.querySelector('.popup__image').alt = String("Фотография " + cardsArray[i].querySelector('.card__title').textContent);
        });
    }

    return cardsArray;
}
function addCardToPage(card){
    const deleteCardButton = card.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function(){
        card.style = ('display: none');
    });

    const likeCardButton = card.querySelector('.card__like-button');
    likeCardButton.addEventListener('click', function(){
        likeCardButton.classList.toggle('card__like-button_is-active');
    });

    const imageOpenOnClick = card.querySelector('.card__image');
    const imageOpenCard = card.querySelector('.card__image');
    imageOpenCard.addEventListener('click', function(){
        imagePopup.classList.add('popup_is-opened');
        imagePopup.querySelector('.popup__image').src = imageOpenCard.src;
        imagePopup.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
        imagePopup.querySelector('.popup__image').alt = String("Фотография " + card.querySelector('.card__title').textContent);
    });

    placesList.querySelector('.places__item').insertAdjacentElement('beforebegin',card);
}

const cardsArray = createCardDefault();
const placesList = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
for (let i = 0; i< cardsArray.length; i++){
    placesList.append(cardsArray[i]);
}
/////////////////////////////Валидация формы добавления карточки
const newCardPopupTitleInput = document.querySelector(".popup__input_type_card-name");
const newCardPopupUrlInput = document.querySelector(".popup__input_type_url");
const cardAddButton = document.querySelector(".popup_type_new-card").querySelector(".popup__button");
const cardNameInputInvalid = document.querySelector('.title__input_invalid');
const cardUrlInputInvalid = document.querySelector('.url__input_invalid');
newCardPopupTitleInput.addEventListener('input', function(evt){ //Валидация названия
    if (!evt.target.validity.valid){
        evt.target.classList.add("popup__input-invalid"); //изменение цвета границы
        cardAddButton.classList.add("popup__close-invalid"); //изменение прозрачности кнопки
        cardAddButton.disabled = true;
    }
    else{
        evt.target.classList.remove("popup__input-invalid");
        if (newCardPopupUrlInput.validity.valid){
            cardAddButton.classList.remove("popup__close-invalid");
            cardAddButton.disabled = false;
        }
    }

    if (evt.target.validity.tooShort){ //Слишком коротко
        cardNameInputInvalid.textContent = "Минимальное количество символов: 2. Длина текста сейчас: " + evt.target.value.length;
    }
    else if(evt.target.validity.valid){
        cardNameInputInvalid.textContent = "";
    }

    if (evt.target.value.length === 0){ //Пустое
        cardNameInputInvalid.textContent = "Вы пропустили это поле";
    }
});

newCardPopupUrlInput.addEventListener("input", function(evt){ //Валидация ссылки
    if (!evt.target.validity.valid){
        evt.target.classList.add("popup__input-invalid");
        cardAddButton.classList.add("popup__close-invalid");
        cardAddButton.disabled = true;
    }
    else{
        evt.target.classList.remove("popup__input-invalid");
        if (newCardPopupTitleInput.validity.valid){
            cardAddButton.classList.remove("popup__close-invalid");
            cardAddButton.disabled = false;
        }
    }

    if (!evt.target.validity.valid){
        cardUrlInputInvalid.textContent = "Введите ссылку";
    }
    else if(evt.target.validity.valid){
        cardUrlInputInvalid.textContent = "";
    }

    if (evt.target.value.length === 0){ //Пустое
        cardUrlInputInvalid.textContent = "Вы пропустили это поле";
    }
});
/////////////////////////////Валидация формы изменения профиля
const profilePopupTitleInput = document.querySelector(".popup__input_type_name");
const profilePopupDescriptionInput = document.querySelector(".popup__input_type_description");
const profileSaveButton = document.querySelector(".popup_type_edit").querySelector(".popup__button");
const profileTitleInputInvalid = document.querySelector('.name__input_invalid');
const profileDescriptionInputInvalid = document.querySelector('.description__input_invalid');

profilePopupTitleInput.addEventListener("input", function(evt){
    if (!evt.target.validity.valid){
        evt.target.classList.add("popup__input-invalid"); //изменение цвета границы
        profileSaveButton.classList.add("popup__close-invalid"); //изменение прозрачности кнопки
        profileSaveButton.disabled = true;
    }
    else{
        evt.target.classList.remove("popup__input-invalid");
        if (profilePopupDescriptionInput.validity.valid){
            profileSaveButton.classList.remove("popup__close-invalid");
            profileSaveButton.disabled = false;
        }
    }
    if (evt.target.validity.tooShort){ //Слишком коротко
        profileTitleInputInvalid.textContent = "Минимальное количество символов: 2. Длина текста сейчас: " + evt.target.value.length;
    }
    else if(evt.target.validity.valid){
        profileTitleInputInvalid.textContent = "";
    }

    if (evt.target.value.length === 0){ //Пустое
        profileTitleInputInvalid.textContent = "Вы пропустили это поле";
    }
});

profilePopupDescriptionInput.addEventListener("input", function(evt){
    if (!evt.target.validity.valid){
        evt.target.classList.add("popup__input-invalid"); //изменение цвета границы
        profileSaveButton.classList.add("popup__close-invalid"); //изменение прозрачности кнопки
        profileSaveButton.disabled = true;
    }
    else{
        evt.target.classList.remove("popup__input-invalid");
        if (profilePopupTitleInput.validity.valid){
            profileSaveButton.classList.remove("popup__close-invalid");
            profileSaveButton.disabled = false;
        }
    }
    if (evt.target.validity.tooShort){ //Слишком коротко
        profileDescriptionInputInvalid.textContent = "Минимальное количество символов: 2. Длина текста сейчас: " + evt.target.value.length;
    }
    else if(evt.target.validity.valid){
        profileDescriptionInputInvalid.textContent = "";
    }

    if (evt.target.value.length === 0){ //Пустое
        profileDescriptionInputInvalid.textContent = "Вы пропустили это поле";
    }

});
////////////////////////////////////////Закрытие на ESC
const popupsList = document.querySelectorAll(".popup");

for (let i = 0; i < popupsList.length; i++){
    popupsList[i].addEventListener("keydown", function(evt){
        if (evt.key === "Escape"){
            popupsList[i].classList.remove("popup_is-opened");
        }
    });
    popupsList[i].addEventListener("click", function(evt){
        evt.target.classList.remove("popup_is-opened");
    });
}
document.addEventListener('keydown', function(evt){
    if (evt.key === "Escape"){
        for (let i = 0; i < popupsList.length; i++){
            popupsList[i].classList.remove("popup_is-opened");
        }
    }
});