import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENDPOINT =`${import.meta.env.VITE_API_ENDPOINT}/auth`
const initialState={
    user:{
        id:"",
        name:"",
        email:"",
        picture:"",
        status:"",
        access_token:"",

    },
    status:"",
    error:""
} 

export const registerUser=createAsyncThunk("auth/register",async(values,{rejectWithValue})=>{
    try {
       
        const {data}=await axios.post(`${AUTH_ENDPOINT}/register`,{...values})
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})

export const loginUser=createAsyncThunk("auth/login",async(values,{rejectWithValue})=>{
    try {
       
        const {data}=await axios.post(`${AUTH_ENDPOINT}/login`,{...values})
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {
                id:"",
                name:"",
                email:"",
                picture:"",
                status:"",
                access_token:"",
            };
            state.status = "";
            state.error = "";
        },
        changeStatus:(state,action)=>{
            state.status=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state,action)=>{
            state.status="loading"
            state.error=""
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.user=action.payload.user_data
            state.error=""
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.payload
        })
        .addCase(loginUser.pending,(state,action)=>{
            state.status="loading"
            state.error=""
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.status="succeeded"
           
            state.user=action.payload.user_data
            state.error=""
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.payload
        })
    }
});


export const {logout,changeStatus} =userSlice.actions;
export default userSlice.reducer;