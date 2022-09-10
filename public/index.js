const showFlpButton = document.getElementById('show-flp-about');
const showLdButton = document.getElementById('show-ld-about');
const hideFlpButton = document.getElementById('hide-flp-about');
const hideLdButton = document.getElementById('hide-ld-about');
const flpAbout = document.getElementById('flp-about');
const ldAbout = document.getElementById('ld-about');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const join = document.getElementById('join-wrapper');
const countdownWrapper = document.getElementById('countdown');

const show = {
  'ld-about': false,
  'flp-about': false,
};

function showAbout(el) {
  if (!show[el.id]) {
    el.classList.add(`${el.id}-visible`);
    show[el.id] = true;
  }
}

function hideAbout(el) {
  if (show[el.id]) {
    el.classList.remove(`${el.id}-visible`);
    show[el.id] = false;
  }
}

showLdButton.addEventListener('click', () => {
  showAbout(ldAbout);
});

showFlpButton.addEventListener('click', () => {
  showAbout(flpAbout);
});

hideLdButton.addEventListener('click', () => {
  hideAbout(ldAbout);
});

hideFlpButton.addEventListener('click', () => {
  hideAbout(flpAbout);
});

function countdown() {
  const end = new Date(Date.UTC(2022, 8, 24, 22));

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  function pad(val) {
    if (val < 10) {
      return `0${val}`;
    } else {
      return val;
    }
  }

  function displayCountdown() {
    const now = new Date();
    const remaining = end - now;
    if (remaining < 0) {
      clearInterval(timer);
      countdownWrapper.classList.remove('show');
      countdownWrapper.classList.add('hide');
      join.classList.remove('hide');
      join.classList.add('show');
      return;
    }

    const _days = Math.floor(remaining / day);
    const _hours = Math.floor((remaining % day) / hour);
    const _minutes = Math.floor((remaining % hour) / minute);
    const _seconds = Math.floor((remaining % minute) / second);

    days.innerHTML = pad(_days);
    hours.innerHTML = pad(_hours);
    minutes.innerHTML = pad(_minutes);
    seconds.innerHTML = pad(_seconds);
  }
  displayCountdown();
  const timer = setInterval(displayCountdown, 1000);
}

countdown();
