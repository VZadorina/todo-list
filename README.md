# Shopping List App

## Description

This project is a simple **Shopping List web application** built with **HTML, CSS, and JavaScript**.
The app allows users to create a list of items they need to buy, mark items as purchased, filter the list, and store the data in the browser using `localStorage`.

The main goal of the project is to practice **DOM manipulation, event handling, and working with browser storage**.

---

## Features

* Add new items to the shopping list
* Mark items as purchased
* Delete individual items
* Clear the entire list
* Filter items:

  * **All**
  * **To Buy**
  * **Purchased**
* Save the list in **localStorage**
* Automatically restore the list after page reload
* Responsive layout for small screens

---

## Technologies Used

* **HTML5** – page structure
* **CSS3** – layout and styling (Flexbox)
* **JavaScript (Vanilla JS)** – application logic and DOM manipulation
* **localStorage API** – saving user data in the browser

---

## How It Works

1. The user enters an item in the input field.
2. When the **Add** button (or Enter key) is pressed, a new list item is created dynamically with JavaScript.
3. Each item contains:

   * a custom checkbox
   * item text
   * a delete button
4. The application stores all items in `localStorage` as a JSON array.
5. When the page reloads, the list is restored from `localStorage`.

---

## Project Structure

```
shopping-list-app
│
├── index.html
├── css
│   └── styles.css
├── js
│   └── script.js
└── README.md
```

---

## Future Improvements

Possible features to add in future versions:

* Editing items
* Drag & drop sorting
* Item categories
* Dark mode
* Animation for adding/removing items

---

## Author

Frontend practice project created as part of learning **JavaScript and web development**.
