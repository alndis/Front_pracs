// Функции валидации форм

function showInputError(formElement, inputElement, errorMessage, inputClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    
    inputElement.classList.add(inputClass);
    errorElement.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, inputClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';

    inputElement.classList.remove(inputClass);
    errorElement.classList.remove(errorClass);
};

// Функция для проверки валидности конкретного поля ввода
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    }
};

// Функция для проверки, есть ли хотя бы одно невалидное поле
function hasInvalidInput(inputList) {
    // Используем метод `some` для проверки валидности всех полей
    return inputList.some((element) => (!element.validity.valid));
};

// Функция для управления состоянием кнопки отправки формы
function toggleButtonState(inputList, buttonElement, buttonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(buttonClass); 
    } else {
        buttonElement.classList.remove(buttonClass); 
    }
};

// Функция для добавления обработчиков событий на элементы формы
function setEventListeners(formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputClass));
    const buttonElement = formElement.querySelector(validationSettings.buttonClass);

    toggleButtonState(inputList, buttonElement, validationSettings.buttonInactiveClass);

    // Добавляем обработчики событий для каждого поля ввода
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationSettings.inputErrorClass, validationSettings.errorClass);
            toggleButtonState(inputList, buttonElement, validationSettings.buttonInactiveClass);
        });
    });
};

// Функция для включения валидации для всех форм на странице
function enableValidation(validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formClass));

    formList.forEach((formElement) => {
        setEventListeners(formElement, validationSettings);
    });
};

export { enableValidation };
