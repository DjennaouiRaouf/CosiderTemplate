import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


export interface SessionIDState {
    session: any;



}


const initialState: SessionIDState = {
    session: null,

};

export const SessionIDSlice = createSlice({
    name: "SessionID",
    initialState,
    reducers: {
        setSessionID: (state,action: PayloadAction<any>) => {
            state.session=action.payload;

        },
        clearSessionID: (state) => initialState,

    }
});

// Action creators are generated for each case reducer function
export const { setSessionID,
    clearSessionID } = SessionIDSlice.actions;

export default SessionIDSlice.reducer;