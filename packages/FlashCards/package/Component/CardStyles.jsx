export const styles = {
  flashcard_wrapper: 'flashcard_wrapper',
  flip: 'flip',
  card: 'card',
  front: 'front',
  back: 'back',
  flipped: 'flipped',

  // Add border animation styles
  borderAnimation: `
    @keyframes borderAnimation {
      0% {
        border-color: #ff7e5f;
      }
      50% {
        border-color: #feb47b;
      }
      100% {
        border-color: #ff7e5f;
      }
    }
  `,

  cardWithBorderAnimation: `
    border: 4px solid #ff7e5f;
    animation: borderAnimation 3s infinite;
  `,
};