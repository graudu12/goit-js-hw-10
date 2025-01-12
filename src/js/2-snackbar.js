'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = form.delay.value;
  const state = form.state.value;

  makePromise({ value: delay, delay: delay, state: state })
    .then(value =>
      iziToast.show({
        class: 'access-svg',
        position: 'topRight',
        icon: 'access-svg',
        message: `Fulfilled promise in ${delay} ms!`,
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#59A10D',
        close: false,
        closeOnClick: true,
      })
    )
    .catch(error =>
      iziToast.show({
        class: 'error-svg',
        position: 'topRight',
        icon: 'error-svg',
        message: `Rejected promise in ${delay} ms!`,
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        close: false,
        closeOnClick: true,
      })
    );
  form.reset();
});

const makePromise = ({ value, delay, state }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};