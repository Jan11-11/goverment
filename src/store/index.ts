import { configureStore } from "@reduxjs/toolkit";
import governmentMembers from "./slices/GovernmentMembers";
import governmentMembersFullInfo from "./slices/GovernmetMembersFullInfo";
import uniqueProduct from "./slices/UniqueProduct";

export const store=configureStore({
    reducer:{
        membersInfo:governmentMembers,
        membersFullInfo:governmentMembersFullInfo,
        uniqueProduct:uniqueProduct,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

