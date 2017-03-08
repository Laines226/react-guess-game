// Set up your application entry point here...

import React from 'react';
import { render } from 'react-dom';
require('./favicon.ico'); // Tell webpack to load favicon.ico
//import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import GuessGame from './components/GuessGame';


render(
    <GuessGame noLives={5} minRange={0} maxRange={400} /> , document.getElementById('app')
);