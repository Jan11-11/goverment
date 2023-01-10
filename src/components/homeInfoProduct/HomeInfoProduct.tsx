import  React from "react";

import {IMemberInfo} from "../../types/models";
import "./homeInfoProduct.scss";
import {useNavigate} from "react-router-dom";


interface IMember{
    member:IMemberInfo
}

export const HomeInfoProduct=({member}:IMember)=>{
    const navigate=useNavigate()
    return(
        <div className={"member"}  onClick={(event)=>{
            event.preventDefault();
            navigate("/detail",{state:{id:member.id}})
        }
        }>
            <div id={"memberTitle"} className={"title"}> <p id={"memberTitleP"} className={"memberTitleP"}>{member.title}</p></div>
            <div id={"memberName"} className={"memberName"}><h5 className={"memberNameH5"}>{member.fullName}</h5></div>
        </div>
    )
}