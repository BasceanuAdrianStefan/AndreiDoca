const track = document.querySelector('.cards');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

// 1. Setup Initial State
// Put the last slide at the front so Slide 1 starts in the middle
track.prepend(track.lastElementChild);
updateSelection();

let isMoving = false;

function updateSelection() {
  // The middle card is always the second <li> in the current DOM order
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => card.classList.remove('is-selected'));
  allCards[2].classList.add('is-selected'); 
}

function move(direction) {
  if (isMoving) return;
  isMoving = true;

  track.style.transition = 'transform 0.5s ease-in-out';
  
  if (direction === 'next') {
    track.style.transform = 'translateX(-66.66%)';
  } else {
    track.style.transform = 'translateX(0%)';
  }

  track.addEventListener('transitionend', () => {
    track.style.transition = 'none';
    
    if (direction === 'next') {
      track.appendChild(track.firstElementChild);
    } else {
      track.prepend(track.lastElementChild);
    }

    track.style.transform = 'translateX(-33.33%)';
    updateSelection(); // Re-apply the highlight to the new 2nd child
    isMoving = false;
  }, { once: true });
}

nextBtn.addEventListener('click', () => move('next'));
prevBtn.addEventListener('click', () => move('prev'));