import { configureStore } from "@reduxjs/toolkit";
import markerSlice from "./markers/markerSlice";
import driverSlice from "./drivers/driverSlice";

export const store = configureStore({
    reducer: {
        markers: markerSlice,
        drivers: driverSlice
    }
})