import { configureStore } from "@reduxjs/toolkit";
import MessageToastReducer from "../Slices/MessageToastSlice";
import SessionIDSReducer from "../Slices/SessionIDSlice";

const store = configureStore({
    reducer: {
        messageToast: MessageToastReducer,
        sessionid:SessionIDSReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;