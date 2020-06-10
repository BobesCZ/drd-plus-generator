# DrD Plus Generator

![GitHub](https://img.shields.io/github/license/BobesCZ/drd-plus-generator)

Character generator for Czech role-playing game *Dračí Doupě* (similar to Dungeons & Dragons).
You can use it online at [gen.dracidoupestudenka.cz](http://gen.dracidoupestudenka.cz).

## Built With

* [Webpack](https://webpack.js.org/) + [Babel](https://babeljs.io/)
* [React](https://reactjs.org/) + [Redux](https://redux.js.org/introduction/getting-started) + [Immutable](https://immutable-js.github.io/immutable-js/)
* [Bootstrap](https://getbootstrap.com/)

## Features

* Clear interface with 7 simple steps (Player's Handbook only)
* Real-time character sheet with backtracking values
* Predefined "quick choices"
* Optional "errata" for some rules
* Export to PDF

## About

### Why online generator?

I am not a fan of digitalization of tabletop games, I would like everyone to spend as much time as possible playing offline. But if you want to create a new character for this RPG game, you usually spend about 15-45 minutes with browsing through the guide book, writing various numbers, and searching for rules to count these numbers correctly.

This generator simplifies the process of creating a new character - it will guide you step by step with simple choices, taking care of numbers and rules, so you can focus on your character's vision.

### What are "quick choices"?

The author of this project and his friends have spent a lot of time playing this game. We have created hundreds of characters, so we are well familiar with the process. If you are playing with a warrior, you probably want him to be as strong as possible, right? We got this. Clicking on the "Quick choice" button will make the choice according to the best of author's beliefs in a given situation.

You can click on this button at every step in the process and create your character within  30 seconds!

## Installing

This project is not open-source (see [License](#License). However, you can clone this repository and run it on your local machine for review and testing purposes.

Install packages

```
npm install
```

Run local server (localhost:8080 will open up in your default browser)

```
npm run start
```

## License

Standard copyright, NOT OPEN-SOURCE. Author of this repository retain all rights to source code and no one may reproduce, distribute, or create derivative works.

## Acknowledgments

* [Simple webpack boilerplate](https://github.com/pinglinh/simple_webpack_boilerplate/)

