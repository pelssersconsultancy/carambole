const digitCodes = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9'];

export const isEnterPressed = (event) => event.code === 'Enter';
export const isShiftSPressed = (event) => event.code === 'KeyS' && event.shiftKey === true;
export const isShiftNPressed = (event) => event.code === 'KeyN' && event.shiftKey === true;
export const isNumberPressed = (event) => digitCodes.includes(event.code);
export const isBackspacePressed = (event) => event.code === 'Backspace';
export const isPageDownPressed = (event) => event.code === 'PageDown';
export const isPageUpPressed = (event) => event.code === 'PageUp';
