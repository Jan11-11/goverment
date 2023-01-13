import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMemberInfo } from "../../types/models";
interface IState {
    loading: boolean,
    error: string,
    members: IMemberInfo[];
}

const initialState: IState = {
    loading: false,
    error: "",
    members: <IMemberInfo[]>[]
}

export const governmentMembers = createSlice({
    name: "membersInfo",
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchFullfit: (state, action: PayloadAction<[]>) => {
            state.loading = false;
            state.members = action.payload;
        },
        fetchError: (state, action: PayloadAction<Error>) => {
            state.error = action.payload.message;
        },
        addMember1: (state, action) => {
            state.members.push(action.payload)
        },
        deleteMember1: (state, action) => {
            state.members = state.members.filter((member) => {
                return member.id !== action.payload
            })
        },
        editeMember1: (state, action) => {
            state.members = state.members.map((member) => {
                if (member.id === action.payload.id) {
                    return action.payload;
                }
                return member;
            })
        }
    }

});
export const { fetching, fetchFullfit, addMember1, deleteMember1, fetchError, editeMember1 } = governmentMembers.actions;
export default governmentMembers.reducer;