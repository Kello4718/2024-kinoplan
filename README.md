# Проект: Книгоплан для Киноплан

## Конечная цель
Реализованное приложение согласно предоставленному ТЗ

## Общие требования к проекту

### Приложение должно состоять из двух страниц:
1. Главная
2. Корзина

### Приложение должно работать со следующим функционалом:
1. Cобрать себе на любом сайте, который позволяет мокать (использовать заранее подготовленные структуры данных) данные (например https://my-json-server.typicode.com/) о книгах - достаточно 20 штук.
2. Карточка книги должна содержать базовую информацию - фото, автор, год издания, жанр. Так же должна быть возможность добавления / удаления книги из корзины для покупки, и счетчик добавленных экземпляров (например можно добавить в корзину более одного экземпляра книги)
3. Должна быть возможность добавить книги в корзину для дальнейшей оплаты (корзина должна быть доступна глобально - при клике на значок корзины открывается popover с информацией о купленных книгах, оттуда можно сразу убрать экземпляры / добавить экземпляры, так же должна быть кнопка перейти в корзину - на отдельный роут /cart, на котором виден список книг, количество, и кнопка оплаты. По нажатию на кнопку оплаты выводится диалоговое окно, в котором написано что оплата совершена успешно.
4. Данные о выбранных книгах в корзине нужно запоминать между сессиями.
5. Добавить иконку сайта (во вкладку и на сайт, где на макете указано Icon)
6. С роута /cart должна быть возможность вернуться обратно на список книг.
7. Список книг должен быть доступен в двух видах - табличный и строчный.
8. Необходимо реализовать фильтрацию по (жанру, году издания, автору).
9. Необходимо реализовать сортировку по (жанру, году издания, автору).
10. В рамках реализации можно использовать Popover из https://ant.design/components/popover/. Реализации кнопок, селектов и т д должны быть самописными.
11. Для стилизации можно использовать любой подходящий css-фреймворк, либо же писать CSS самому (допускается CSS Flexbox или же CSS Grid).
12. Для первого этапа необходимо реализовать базовый функционал на JS, next.js и react. Использование стейт-менеджеров остается на усмотрение исполнителя, но не рекомендуется. Так же необходимо настроить eslint.

## Используемые технологии
-   **UI Frameworks** (Antd)
-   **Styling** (modules)
-   **SSR** (next js)
-   **Typification** (Typescript)

## Запуск проекта

1. Конечно же сначала нам нужно установить все зависимости `npm i` в помощь
2. Ну и все, что нам остается это просто запустить проект `npm run dev`
