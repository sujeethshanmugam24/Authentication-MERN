 import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userreducer from './user/userslice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const rootreducer=combineReducers({user:userreducer});

const persistconfig={
    key:'root',
    version:1,
    storage,
}
const persistedreducer=persistReducer(persistconfig,rootreducer);
 export const store =configureStore({
    reducer:persistedreducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    })
 })

 export const persistor=persistStore(store);