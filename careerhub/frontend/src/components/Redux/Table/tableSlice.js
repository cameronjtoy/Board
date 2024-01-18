import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
    name: 'table',
    initialState: {
        data: [],
        editedRows: {}
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setEditedRows: (state, action) => {
            state.editedRows = action.payload;
        },
        updateData: (state, action) => {
            const { rowIndex, columnId, value } = action.payload;
            state.data[rowIndex][columnId] = value;
        },
        addRow: (state, action) => {
            state.data.push(action.payload);
        }
    }
});

export const { setData, setEditedRows, updateData , addRow} = tableSlice.actions;
export default tableSlice.reducer;
