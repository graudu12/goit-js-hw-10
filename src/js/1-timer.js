'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const refs = {
  dateInput: document.querySelector('.datetime-input'),
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMinutes: document.querySelector('span[data-minutes]'),
  timerSeconds: document.querySelector('span[data-seconds]'),
};
refs.startBtn.disabled = true;
refs.dateInput.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();

      refs.startBtn.disabled = false;
      refs.startBtn.classList.remove('disabled');
    } else {
      iziToast.show({
        class: 'error-svg',
        position: 'topRight',
        icon: 'error-svg',
        message: 'Please choose a date in the future!',
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        close: false,
        closeOnClick: true,
      });

      refs.startBtn.disabled = true;
      refs.startBtn.classList.add('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', elem => {
  const timer = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const timeValue = convertMs(diff);
    if (diff <= 0) {
      clearInterval(timer);
      refs.startBtn.disabled = false;
      refs.startBtn.classList.remove('disabled');
      refs.dateInput.disabled = false;
      refs.dateInput.classList.remove('disabled');
    } else {
      refs.timerDays.textContent = addLeadingZero(timeValue.days);
      refs.timerHours.textContent = addLeadingZero(timeValue.hours);
      refs.timerMinutes.textContent = addLeadingZero(timeValue.minutes);
      refs.timerSeconds.textContent = addLeadingZero(timeValue.seconds);
    }
  }, 1000);
  refs.startBtn.disabled = true;
  refs.startBtn.classList.add('disabled');
  refs.dateInput.disabled = true;
  refs.dateInput.classList.add('disabled');
});

function addLeadingZero(value) {
  value = String(value);
  return value.length < 2 ? value.padStart(2, '0') : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}