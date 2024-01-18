// Action type
export const ADD_ROW = 'ADD_ROW';

// Action creator for adding a row
export const addRow = (newRowData) => {
  return {
    type: ADD_ROW,
    payload: newRowData,
  };
};
