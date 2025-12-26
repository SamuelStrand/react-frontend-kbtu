import { configureStore } from "@reduxjs/toolkit";
import casesReducer from "./features/cases/casesSlice.js";

export const store = configureStore({ reducer: { cases: casesReducer } });
