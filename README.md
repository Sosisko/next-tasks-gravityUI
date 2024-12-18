## Немного о проекте

На странице Home для отрисовки данных используется компонент Table из библиотеки Gravity UI

Сортировка также используется из компонента Table и происходит на стороне клиента.

На странице Admin добавляются, удаляются и редактируются данные.

Используется библиотека Gravity UI.

Для перехода в детали конкретной заявки нужно нажать на номер заявки.

## REST API

## Запросы

Для базы данных использован сервис https://mokky.dev/

Создать ресурс можно с любым название, например items, users

В данном проекте используется tasks

Получить все данные: "https://xxx.mokky.dev/tasks"
xxx - это ваш идентификатор, например адрес с моим идентификатором https://02da6eb2c7e0706e.mokky.dev

Чтобы отбратиться к конкретному элементу по id: "https://xxx.mokky.dev/tasks/${id}"

Поддерживаемые методы:

- GET
- POST
- PATCH
- DELETE

## Фильтрация

Также даный сервер предоставляет возможность для фильтрации и поиска, например:

Простой поиск делает сравнение строго по значение и если запросить все товары с названием "Пицца", то вернутся строго те объекты, у которых в названии title: "Пицца"
https://XXX.mokky.dev/items?title=Пицца

И мы хотели бы найти все товары, которые содержат в названии слово "пицца".

Не важно, в начале или в конце заголовка.

Для этого указываем символ
*(звездочку) там, где может содержаться продолжение заголовка.
https://XXX.mokky.dev/items?title=*пицца
Данный запрос вернёт все товары в которых содержится слово "пицца" и не важно, в начале, в середине или в конце заголовка.

Если мы хотим отфильтровать товары более чем по одному параметру, то достаточно просто указать их в query-параметрах:
https://xxx.mokky.dev/items?category=1&price=150&rating=5
Данный запрос вернёт все товары с:

- категорией = 1
- ценой = 150
- рейтингом = 5

## Сортировка

Для того, чтобы отсортировать объекты по какому-то свойству, используйте sortBy
https://XXX.mokky.dev/items?sortBy=price

Если необходимо сделать по возрастанию (DESC), то в начале нашего параметра указываем знак минус -price
https://XXX.mokky.dev/items?sortBy=-price

<!-- ## Что хотелось добавить в проект, но не успел:

- Блокировать кнопку "Сохранить" при создании/изменении данных с формы на сервер, пока не будет получен ответ
- Реализовать поиск по таблице заявок, в том числе на стороне сервера
- Реализовать возможность скрыть заявки со статусом “завершено”
- Реализовать сортировку на стороне сервера
- Ячейку телефона предоставить как ссылку с типом tel
- Задеплоить проект на github-pages -->
