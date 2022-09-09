const flpButton = document.getElementById('flp-button');
const ldButton = document.getElementById('ld-button');
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

function toggleShow(el) {
  if (show[el.id]) {
    console.log(el.id);
    el.classList.add(`${el.id}-visible`);
    show[el.id] = false;
  } else {
    el.classList.remove(`${el.id}-visible`);
    show[el.id] = true;
  }
}

ldButton.addEventListener('click', () => {
  toggleShow(ldAbout);
});

flpButton.addEventListener('click', () => {
  toggleShow(flpAbout);
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
