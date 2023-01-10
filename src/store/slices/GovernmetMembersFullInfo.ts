import {createAsyncThunk, createSlice, PayloadAction,Dispatch} from "@reduxjs/toolkit";
import {IMemberFullInfo} from "../../types/models";

interface IFullInfo{
    loading:boolean,
    error:string,
    membersFullInfo:IMemberFullInfo;
}


const initialState={
    loading:false,
    error:"",
    membersFullInfo:<IMemberFullInfo[]>[]
}



export const governmentMembersFullInfo=createSlice({
    name:"membersFullInfo",
    initialState,
    reducers:{
        successLoading:(state)=>{
            state.loading=true;
        },
        successFullfit:(state,action:PayloadAction<[]>)=>{
            state.loading=false;
            state.membersFullInfo=action.payload;
        },
        successError:(state,action:PayloadAction<Error>)=>{
            state.error=action.payload.message;
        },
        addMember:(state,action)=>{
            state.membersFullInfo.push(action.payload);
        },
        deleteMember:(state,action)=>{
            state.membersFullInfo=state.membersFullInfo.filter((item)=>{
                return item.id!==action.payload;
            })
        },
        editeMember:(state, action)=>{
            console.log(action.payload)
            state.membersFullInfo=state.membersFullInfo.map((member)=>{
                if (member.id==action.payload.id){
                    return  action.payload;
                }
                return member;
            })
        }
    }

});
export const {successError,successFullfit,addMember,deleteMember,successLoading,editeMember}=governmentMembersFullInfo.actions;
export default governmentMembersFullInfo.reducer;