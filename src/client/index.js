import { modalEvents } from './js/modal';
import { dateValidation } from './js/dateValidation';
import { createCard } from './js/createCard';
import { toDoList } from './js/toDoList';
import { rmTrip } from './js/rmTrip';
import { tripForm } from './js/tripForm';
import { generatePDF } from './js/generatePDF';

import './styles/_variables.scss';
import './styles/main.scss';
import './styles/modal.scss';
import './styles/card.scss';
import './styles/desktop.scss'

modalEvents();
dateValidation();

document.getElementById('submitForm').addEventListener('click', tripForm)

export {tripForm, toDoList, rmTrip, createCard, generatePDF};


