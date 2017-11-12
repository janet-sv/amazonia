export const loadState = (name) => {
  try {
    const serializedState = localStorage.getItem(name);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (name, state) => {
  try {
    let stateJSON = state;

    if (typeof state === 'object') {
      stateJSON = JSON.stringify(state);
    }

    const serializedState = stateJSON;
    localStorage.setItem(name, serializedState);
  } catch (err) {
    console.log('Error saving localStorage');
  }
};

export const deleteState = (name) => {
  try {
    localStorage.removeItem(name);
  } catch (err) {
    console.log('Error deleting value in localStorage');
  }
};