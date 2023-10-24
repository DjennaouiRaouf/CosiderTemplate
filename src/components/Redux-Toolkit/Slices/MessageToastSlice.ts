import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface MessageToastState {
    show: boolean;
    titre:string;
    message:string;
    color:string;
    icon:string;


}


const initialState: MessageToastState = {
    show: false,
    titre:"",
    message:"",
    color:"",
    icon:"",
};

export const MessageToastSlice = createSlice({
    name: "MessageToast",
    initialState,
    reducers: {
        openMessageToast: (state, action: PayloadAction<{ titre: string;color:string;message:string;icon:string }>) => {
            state.show=true;
            state.titre=action.payload.titre;
            state.color=action.payload.color;
            state.message=action.payload.message;
            state.icon=action.payload.icon;

        },
        closeMessageToast: (state) => initialState,

    }
});

// Action creators are generated for each case reducer function
export const { openMessageToast,
    closeMessageToast } = MessageToastSlice.actions;

export default MessageToastSlice.reducer;