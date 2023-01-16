import { Dispatch } from "@reduxjs/toolkit";
import { successError, successFullfit, successLoading } from "../slices/GovernmetMembersFullInfo";
import axios from "axios";
interface ICreateMember {
    [key: string]: string
}

export const fetchGovernmentMemberFullInfo = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(successLoading());
            const response = await axios.get("http://localhost:3000/membersFullInfo");
            dispatch(successFullfit(response.data));
        } catch (error) {
            dispatch(successError(error as Error))
        }
    }
}