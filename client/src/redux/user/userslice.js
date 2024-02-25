import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentuser:null,
    loading:false,
    error:false,
};

const userslice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signinstart:(state)=>{
            state.loading=true;
            state.error=false;
        },
        signinsuccess:(state,action)=>{
            state.currentuser=action.payload;
            state.loading=false;
            state.error=false;
        },
        signinfailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    }
})

export const{signinstart,signinsuccess,signinfailure}=userslice.actions;
export default userslice.reducer;
