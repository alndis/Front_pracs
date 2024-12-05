// Работа с попапами

// Функция для закрытия попапа при клике на оверлей
function closeByOverlay(event) {
    // Закрываем попап, если событие инициировано на оверлее (целевой элемент)
    closeModal(event.target);
}

// Функция для добавления обработчика событий на попап
// При уходе курсора мыши с контента попапа (mouseleave) добавляется слушатель для оверлея
function addOverlayListener() {
    const popup = document.querySelector('.popup_is-opened');
    popup.addEventListener('click', closeByOverlay);
}

// Функция для удаления обработчика событий с попапа
// При наведении курсора на контент попапа (mouseenter) убирается слушатель для оверлея
function removeOverlayListener() {
    const popup = document.querySelector('.popup_is-opened');
    popup.removeEventListener('click', closeByOverlay);
}

// Функция для закрытия попапа при нажатии клавиши Escape
function closeByEscape(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

// Функция для открытия попапа
function openModal(popup) {
    popup.classList.add('popup_is-opened');

    const popupContent = popup.querySelector('.popup__content');

    // Добавляем обработчик для закрытия попапа по нажатию клавиши Escape
    document.addEventListener('keydown', closeByEscape);

    // Добавляем обработчик клика по оверлею
    popup.addEventListener('click', closeByOverlay);

    // Добавляем обработчик ухода курсора с контента попапа
    popupContent.addEventListener('mouseleave', addOverlayListener);

    // Добавляем обработчик наведения курсора на контент попапа
    popupContent.addEventListener('mouseenter', removeOverlayListener);
}

// Функция для закрытия попапа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

    const popupContent = popup.querySelector('.popup__content');

    // Удаляем обработчик клика по оверлею
    popup.removeEventListener('click', closeByOverlay);

    // Удаляем обработчик ухода курсора с контента попапа
    popupContent.removeEventListener('mouseleave', addOverlayListener);

    // Удаляем обработчик наведения курсора на контент попапа
    popupContent.removeEventListener('mouseenter', removeOverlayListener);

    // Удаляем обработчик для закрытия попапа по нажатию клавиши Escape
    document.removeEventListener('keydown', closeByEscape);
}

export { openModal, closeModal };
