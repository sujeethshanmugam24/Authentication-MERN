 import {configureStore} from '@reduxjs/toolkit';
import userreducer from './user/userslice';

 export const store =configureStore({
    reducer:{user:userreducer},
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    })
 })