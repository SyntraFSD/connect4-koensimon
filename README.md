# Frontend praktijk:
# Ex1 - Connect4

## 1 Prerequisites
- Install nodejs + npm (https://nodejs.org/en/download/)
  - Run npm install to install:  
      - Babel (https://babeljs.io/)
      - ESLint (https://eslint.org/)
- Install postman (https://www.getpostman.com/downloads/)
- Import the Airbnb code style:
    - Go to Settings/Code Style
    - Click Import Scheme/Intelij IDEA code style XML
    - Select `PhpStorm-Airbnb-Javascript-codeStyle.xml`
- Setup ESLint:
    - Go to Settings/Languages & Frameworks/Javascript/Code Quality Tools
    - Select and Enable ESLint
- Setup Babel:
    - Go to Settings/Tools/File Watchers
    - Add a new one with the Babel Template
    - Insert this in the arguments field:  
    `$FilePathRelativeToProjectRoot$ --out-dir public/js --source-maps`
    - Insert this in the Output path to refresh field:
    `public/js/$FileNameWithoutExtension$.js:public/js/$FileNameWithoutExtension$.js.map`
- Install SASS (see: https://sass-cheatsheet.brunoscopelliti.com/):
    - run `npm install -g sass` in the terminal
    - Go to Settings/Tools/File Watchers
    - Add a new one with the SCSS Template
    - Insert this in the
    - Insert this in the arguments field:  
    `$FileName$:../../public/css/$FileNameWithoutExtension$.css --style compressed`
    - Insert this in the Output path to refresh field:
    `../../public/css/$FileNameWithoutExtension$.css:../../public/css/$FileNameWithoutExtension$.css.map`
    
## 2 Conventions
- Javascript:  
    We will use the Airbnb JavaScript Style Guide  
    See https://github.com/airbnb/javascript
- In our css file we will use the SUIT naming convention:  
    See https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md
    
## 3 File Structure
```
 - src
 | - js
 | | <source javascript files>
 | - sass
 | | <sass files>
 - public
 | <html files>
 | - js
 | | <compiled js files>
 | - css
 | | <compiled css files>
``` 
    
## 4 Exercise
You will make a online multiplayer connect four game.
### 4.1 Pages
#### 4.1.1 Home screen
Make an attractive landing page:
 - Slider showcasing your sites assets
 - Header/Footer
 
#### 4.1.2 Login/Register Page
 - Dynamic form (switchable between login/register)
 - Header/Footer

#### 4.1.3 Stats Page
- Showcase game statistics
    - Highest ranking players
    - ... (we'll see what data we can show here)
    - Header/Footer
    
#### 4.1.4 Lobby
- Place where players create new games or choose ongoing games

#### 4.1.5 Game page
- Place where you play connect 4

## 5 Sources
(I will continue to add sources)
### 5.1 JS
- General JavaScript:
    - Eloquent Javascript (http://eloquentjavascript.net/)
    - You don't know JS (https://github.com/getify/You-Dont-Know-JS)
        - Definitely check 'Up & Going' (https://github.com/getify/You-Dont-Know-JS/tree/master/up%20%26%20going)
- Scopes/ Closures:
    - CSS-Tricks (https://css-tricks.com/javascript-scope-closures/)
- Callbacks!!:
    - Flavio Copes (https://flaviocopes.com/javascript-callbacks/)
- AJAX:
    - MDN (https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
    - Test API (https://jsonplaceholder.typicode.com/) 
- Call Stack:
    - Free Code Camp (https://medium.freecodecamp.org/understanding-the-javascript-call-stack-861e41ae61d4)
- Exercises:
    - Exercism (https://exercism.io/)
    - Nodeschool (https://nodeschool.io/)
    - Codingame (https://www.codingame.com)
### 5.2 CSS
- Flex Box:
    - CSS-Tricks (https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- CSS Grid:
    - CSS-Tricks (https://css-tricks.com/snippets/css/complete-guide-grid/)
    
