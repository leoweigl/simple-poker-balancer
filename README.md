# Simple Poker Balancer

A lightweight decision tool for fast, unbiased poker decisions.

Simple Poker Balancer is a browser-based decision tool designed to remove hesitation
and bias from repetitive poker decisions.

It does not teach strategy.
It executes predefined decision logic.

---

## Features

- Percentage-based decision logic
- Optional bag-random (distribution-safe randomness)
- Toggle between pure random and deterministic mode
- No accounts, no tracking
- Lightweight and fast

---

## How it works

Each action is assigned a probability.
The tool returns a decision based on that probability:

- **Pure random**
  'Math.random()' decides the outcome.

- **Bag random**
  A shuffled bag with a fixed number of true/false entries ensures long-term distribution accuracy

---

## Tech

- HTML / CSS / Vanilla JavaScript
- No frameworks
- Hosted on GitHub Pages

---

## Live Demo

https://decide.weigl.dev

---

No guessing. No learning curve. Just click, decide, and move on.
