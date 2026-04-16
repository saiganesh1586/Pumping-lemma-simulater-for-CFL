# Pumping Lemma Simulator (CFL)

This project is an interactive web-based simulator built to understand the **Pumping Lemma for Context-Free Languages (CFL)** in a visual and intuitive way.

Instead of just reading theory, this tool allows users to actually see how a string is decomposed into **u, v, x, y, z** and how pumping affects the structure of the language.

---

## What this project does

* Lets you select different formal languages
* Allows you to input any valid string
* Visually decomposes the string into **u, v, x, y, z**
* Simulates pumping for:

  * i = 0
  * i = 1
  * i = 2
* Checks whether the new strings still belong to the language

This helps in understanding why certain languages **fail under pumping**, which is the key idea behind proving that a language is **not context-free**.

---

## Why this project

The Pumping Lemma is often confusing when studied theoretically.
This simulator was built to make the concept:

* More visual
* More interactive
* Easier to experiment with

Users can even try different decompositions and observe how the result changes.

---

## Technologies Used

* HTML
* CSS
* JavaScript

No external frameworks were used — everything is built using basic web technologies for simplicity and clarity.

---

##  Project Structure

* `index.html` → Main UI
* `style.css` → Styling and layout
* `script.js` → Logic and simulation

---

##  How to run

1. Download or clone the repository
2. Open `index.html` in any browser

That’s it — no installation required.

---

##  Live Demo

(Replace with your deployed link)

---

##  Demo Video

(Replace with your video link)

---

##  Key Learning

This project demonstrates that:

* Pumping Lemma is mainly used to **show that a language is NOT context-free**
* Decomposition (uvxyz) plays a crucial role
* Incorrect pumping can break language rules

---

## Future Improvements

* Better animations for pumping steps
* Support for more complex languages
* Step-by-step guided explanations

---

##  Author

Developed as part of Theory of Computation coursework.

---

##  Note

This is a conceptual simulator designed for learning purposes.
It uses rule-based validation instead of full CFG parsing.

---
