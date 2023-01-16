import { createAsyncThunk } from "@reduxjs/toolkit";
import { addMember, deleteMember, editeMember,activeMember } from "../slices/GovernmetMembersFullInfo";
import { addMember1, deleteMember1, editeMember1 } from "../slices/GovernmentMembers";
import {store} from "../index";

interface IDelete {
    id: number | null | undefined
}

type MyEdite = Record<string | number, string | string>;

interface IMember {
    [key: string]: string | number
}
export const addProduct = createAsyncThunk(
    "add",
    async (item: IMember, { dispatch }) => {
        const fullMember = {
            "img": item.img,
            "title_key": "Պաշտոն։",
            "title": item.title,
            "fullName": item.fullName,
            "fullName_key": "Անուն ազգանուն։",
            "active_str": "Ապաակտիվացնել",
            "active_logos": "https://img.icons8.com/external-flat-papa-vector/2x/external-Toggle-Button-interface-flat-papa-vector.png",
            "edite_logo": "https://cdn-icons-png.flaticon.com/128/61/61456.png",
            "edite_str": "Խմբագրել",
            "trash_logo": "https://cdn-icons-png.flaticon.com/128/3641/3641637.png",
            "trash_str": "Ջնջել"
        }
        const member = {
            fullName: item.fullName,
            title: item.title
        }
        const respons1 = await fetch("http://localhost:3000/membersInfo", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(member)
        });
        const data1 = await respons1.json();
        const response = await fetch("http://localhost:3000/membersFullInfo", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(fullMember)
        })
        const data = await response.json();
        dispatch(addMember(data));
        dispatch(addMember1(data1));
    }
);

export const deleteProduct = createAsyncThunk(
    "delete/Product",
    async (id: IDelete, { dispatch }) => {
        const response1 = await fetch(`http://localhost:3000/membersInfo/${id}`, { method: "DELETE" });
        const response = await fetch(`http://localhost:3000/membersFullInfo/${id}`, { method: "DELETE" });
        if(response.ok && response1.ok){
            dispatch(deleteMember(id));
        dispatch(deleteMember1(id));
        }
        
    }
)

export const editeAProduct = createAsyncThunk(
    "edite/Product",
    async (item: MyEdite, { rejectWithValue, dispatch }) => {

        const fullMember = {
            "img": item.img,
            "title_key": "Պաշտոն։",
            "title": item.title,
            "fullName": item.fullName,
            "fullName_key": "Անուն ազգանուն։",
            "active_str": "Ապաակտիվացնել",
            "active_logos": "https://img.icons8.com/external-flat-papa-vector/2x/external-Toggle-Button-interface-flat-papa-vector.png",
            "edite_logo": "https://cdn-icons-png.flaticon.com/128/61/61456.png",
            "edite_str": "Խմբագրել",
            "trash_logo": "https://cdn-icons-png.flaticon.com/128/3641/3641637.png",
            "trash_str": "Ջնջել"
        }
        const member = {
            fullName: item.fullName,
            title: item.title
        }
        try {
            const response = await fetch(`http://localhost:3000/membersInfo/${item.id}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(member) });
            const response1 = await fetch(`http://localhost:3000/membersFullInfo/${item.id}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(fullMember) });
            const data = await response.json();
            const data1 = await response1.json();
            dispatch(editeMember(data1));
            dispatch(editeMember1(data));

            if (!response.ok) {
                throw new Error("Can't edite this item")
            }
        }
        catch (error: any) {
            rejectWithValue(error.message)
        }
    }
);
export  const activeProduct=createAsyncThunk(
    "active/product",
    async (id:number,{dispatch,getState})=>{
        const state=store.getState();
        const item=state. membersFullInfo.  membersFullInfo.find((child:any)=>{
            return id==child.id;
        })
        if (item){
            const response=await fetch(`http://localhost:3000/membersFullInfo/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({active:!item.active}) });
            if (response.ok){
                dispatch(activeMember(id));
            }
        }

    }
)

