# jquery-safe-button

**Language:** [Русский](#русская-версия) | [English](#english-version)

---

# Русская версия

## О проекте

**jquery-safe-button** — это небольшой jQuery-плагин для создания “безопасных” кнопок с подтверждением действия через удержание.

Идея простая: действие не выполняется сразу по клику. Пользователь должен зажать кнопку и удерживать её определённое время. Только после завершения удержания срабатывает подтверждённое событие.

Такой подход полезен для действий, которые не должны выполняться случайно: покупка, удаление, очистка данных, подтверждение операции, запуск важного процесса и другие действия, где обычный клик может быть слишком рискованным.

## Демо

Посмотреть пример работы можно на CodePen:

https://codepen.io/kalinindanil17Y/pen/ogzxRVz

## Основная идея

Плагин позволяет сделать кнопку, которая реагирует на три состояния:

* короткий клик — показывает подсказку;
* прерванное удержание — отменяет действие;
* полное удержание — подтверждает действие.

При этом визуальная часть не ограничена стандартным стилем. Анимация может быть любой: заполнение кнопки, смена картинки, прогресс-эффект, CSS-анимация или собственная графика.

## Возможности

* подтверждение действия через удержание кнопки;
* настройка времени удержания;
* обработка короткого клика;
* обработка отмены удержания;
* обработка успешного подтверждения;
* поддержка кастомных сообщений;
* возможность отключить лишние события для отдельных кнопок;
* поддержка любых CSS-анимаций;
* удобное использование в интерфейсах, где важно избежать случайного нажатия.

## Где может пригодиться

Плагин хорошо подходит для интерфейсов, где есть действия с последствиями:

* удаление данных;
* покупка внутриигрового предмета;
* очистка лога;
* подтверждение операции;
* отправка формы;
* запуск процесса;
* выполнение административного действия;
* игровые интерфейсы;
* панели управления;
* mini-apps.

## Подключение

Минифицированная версия:

https://cdn.jsdelivr.net/gh/kalininDanil17Y/jquery-safe-button@v1.0.0/safe-button.min.js

Обычная версия:

https://cdn.jsdelivr.net/gh/kalininDanil17Y/jquery-safe-button@v1.0.0/safe-button.js

Также исходный код доступен в самом репозитории.

## Как это работает

Кнопка начинает отслеживать удержание после нажатия. Пока пользователь держит кнопку, плагин считает прогресс удержания. Этот прогресс можно использовать в CSS для отображения анимации.

Если пользователь отпускает кнопку раньше времени, действие отменяется. Если удержание длится достаточно долго, вызывается подтверждённое действие.

Таким образом, случайный короткий клик не приводит к выполнению важной операции.

## Кастомизация

Плагин не навязывает конкретный внешний вид кнопки. Можно использовать:

* обычные CSS-стили;
* изображения;
* sprite-графику;
* progress-fill анимации;
* hover и active эффекты;
* любые собственные визуальные состояния.

Главная задача плагина — логика безопасного удержания. Внешний вид полностью остаётся на стороне разработчика.

## Версии файлов

В проекте доступны две версии файла:

* `safe-button.js` — обычная версия, удобная для чтения и разработки;
* `safe-button.min.js` — минифицированная версия для подключения на сайте.

## Автор

Created by **Danil Kalinin**

GitHub: https://github.com/kalininDanil17Y

---

# English Version

## About

**jquery-safe-button** is a small jQuery plugin for creating “safe” buttons that require holding before an action is confirmed.

The idea is simple: the action is not executed immediately after a click. The user has to press and hold the button for a specified amount of time. Only after the hold animation is completed, the confirmation event is triggered.

This is useful for actions that should not happen accidentally, such as purchases, deletion, clearing data, confirming operations, starting important processes, and other actions where a regular click may be too risky.

## Demo

You can see a live example on CodePen:

https://codepen.io/kalinindanil17Y/pen/ogzxRVz

## Main Idea

The plugin allows a button to handle three main states:

* short click — shows a hint;
* interrupted hold — cancels the action;
* completed hold — confirms the action.

The visual part is fully customizable. The animation can be anything: button filling, image transition, progress effect, CSS animation, or custom graphics.

## Features

* action confirmation by holding a button;
* configurable hold duration;
* short click handling;
* hold cancellation handling;
* successful confirmation handling;
* custom messages support;
* option to disable extra events for specific buttons;
* support for any CSS animations;
* convenient for interfaces where accidental clicks should be avoided.

## Use Cases

The plugin is suitable for interfaces with actions that have consequences:

* deleting data;
* buying an in-game item;
* clearing a log;
* confirming an operation;
* submitting a form;
* starting a process;
* performing an admin action;
* game interfaces;
* control panels;
* mini-apps.

## CDN

Minified version:

https://cdn.jsdelivr.net/gh/kalininDanil17Y/jquery-safe-button@v1.0.0/safe-button.min.js

Readable version:

https://cdn.jsdelivr.net/gh/kalininDanil17Y/jquery-safe-button@v1.0.0/safe-button.js

The source code is also available in the repository.

## How It Works

The button starts tracking the hold state after being pressed. While the user keeps holding the button, the plugin calculates the hold progress. This progress can be used in CSS to display an animation.

If the user releases the button too early, the action is cancelled. If the button is held long enough, the confirmed action is triggered.

This way, a short accidental click does not execute an important operation.

## Customization

The plugin does not force any specific button design. You can use:

* regular CSS styles;
* images;
* sprite graphics;
* progress-fill animations;
* hover and active effects;
* any custom visual states.

The plugin is responsible for the safe hold logic. The visual design is fully controlled by the developer.

## File Versions

The project provides two file versions:

* `safe-button.js` — readable version, useful for development;
* `safe-button.min.js` — minified version for production usage.

## Author

Created by **Danil Kalinin**

GitHub: https://github.com/kalininDanil17Y
