const track = document.querySelector('.cards');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

// Initialization
track.prepend(track.lastElementChild);
updateSelection();

let isMoving = false;

function updateSelection() {
  const allCards = track.querySelectorAll('.card');
  allCards.forEach(c => c.classList.remove('is-selected'));
  // Index 1 is the middle card
  if (allCards[2]) allCards[2].classList.add('is-selected');
}

function move(direction) {
  if (isMoving) return;
  isMoving = true;

  // Re-enable transition for the slide
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.webkitTransition = '-webkit-transform 0.5s ease-in-out';
  
  if (direction === 'next') {
    track.style.transform = 'translate3d(-66.66%, 0, 0)';
    track.style.webkitTransform = 'translate3d(-66.66%, 0, 0)';
  } else {
    track.style.transform = 'translate3d(0%, 0, 0)';
    track.style.webkitTransform = 'translate3d(0%, 0, 0)';
  }

  // Use a cleaner listener for Safari compatibility
  const finishMove = () => {
    track.style.transition = 'none';
    track.style.webkitTransition = 'none';
    
    if (direction === 'next') {
      track.appendChild(track.firstElementChild);
    } else {
      track.prepend(track.lastElementChild);
    }

    // Reset position to middle
    track.style.transform = 'translate3d(-33.33%, 0, 0)';
    track.style.webkitTransform = 'translate3d(-33.33%, 0, 0)';
    
    updateSelection();
    isMoving = false;
    
    track.removeEventListener('transitionend', finishMove);
    track.removeEventListener('webkitTransitionEnd', finishMove);
  };

  track.addEventListener('transitionend', finishMove);
  track.addEventListener('webkitTransitionEnd', finishMove); // For older Safari
}

nextBtn.addEventListener('click', () => move('next'));
prevBtn.addEventListener('click', () => move('prev'));