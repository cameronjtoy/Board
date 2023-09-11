// store.js
import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./Table/tableSlice";

export const store = configureStore({
    reducer: {
    table: tableReducer,
    },
});
