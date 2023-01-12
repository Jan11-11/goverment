import "./fullInfoLeftPart.scss";
import {IMemberFullInfo} from "../../types/models"
interface IActive{
    deactivate:boolean,
    remove:boolean,
    setRemove:(remove:boolean)=>void,
    member:IMemberFullInfo,
    active:boolean,
    setActive:(active:boolean)=>void
}
export const FullInfoLeftPart=({member,active,setActive,deactivate}:IActive)=>{
    return(
        <div id={"memberLeftPart"} className={"memberLeftPart"}>
            <div className={"memberLeftPartImage"}>
                <img className={"group"}  id={"group"} onClick={(event)=>{
                    event.preventDefault();
                    setActive(!active)

                }
                } src={"../../../government/Group.png"}/>
                <img  className={deactivate?"img imgPassive":"img"} src={member.img} width={"234px"} height={"140px"}/></div>
            <div className={"memberLeftPartDescription"}>
               <div className={"memberLeftPartDescriptionChild"}> <p id={deactivate?"memberAllParagraph":""} className={"memberLeftPartDescriptionChildParagraph"}>{member.title_key}<span id={"memberLeftPartDescriptionChildSpan"}>{member.title}</span></p></div>
                <div className={"memberLeftPartDescriptionChild"}><p id={deactivate?"memberAllParagraph":""} className={"memberLeftPartDescriptionChildParagraph"}>{member.fullName_key}<span id={"memberLeftPartDescriptionChildSpan"}>{member.fullName}</span></p></div>
            </div>
        </div>
    )
}