import "@testing-library/jest-dom";
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    fillStyle: "",
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    clip: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
  }));
  