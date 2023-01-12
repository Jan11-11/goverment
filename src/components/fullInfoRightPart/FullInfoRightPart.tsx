import "./fullInfoRightPart.scss";
import { IMemberFullInfo } from "../../types/models";
import { useNavigate } from "react-router-dom";
interface IActive {
    deactivate: boolean,
    setDeactivate: (deactivate: boolean) => void,
    keyId?: number | null | undefined,
    setKeyId: (keyId: number) => void,
    member: IMemberFullInfo,
    remove: boolean,
    setRemove: (active: boolean) => void,
    active: boolean,
    setActive: (active: boolean) => void
}

export const FullInfoRightPart = ({ member, remove, setRemove, active, setActive, deactivate, setDeactivate, setKeyId }: IActive) => {
    const navigate = useNavigate();

    return (
        <div id={active ? "" : "memberRightPartHiden"} className={"memberRightPart"}>
            <div className={"active1"} id={"active1"}>
                <img className={deactivate ? "groupPassive iconDisabled" : "groupPassive"} src={"../../../government/Grouppassive.png"} onClick={(event) => {
                    event.preventDefault();
                    setActive(!active);
                }} />
                <p style={deactivate ? { color: "#9C9C9C" } : { color: "black" }}>{member.active_str}</p>
                <div className={"active_logos"} onClick={(event) => {
                    event.preventDefault();
                    setDeactivate(!deactivate);
                }}> <img className={"switch_img"} src={deactivate ? "../../../government/deactivate.png" : "../../../government/Switch.png"} /></div>
            </div>
            <div className={"editTrash"}>
                <div className={deactivate ? "edite_logo iconDisabled" : "edite_logo"} onClick={(e) => {
                    e.preventDefault();
                    navigate(`/edite`, { state: { id: member.id } })
                }
                }><img className={"edite_img"} src={deactivate ? "../../../government/editePassive.png" : "../../../government/edite.svg"} /><p id={deactivate ? "memberAllParagraph" : ""}>{member.edite_str}</p></div>
                <div onClick={(e) => {
                    e.preventDefault();
                    setRemove(!remove);
                    setActive((!active))
                    setKeyId(member.id);
                    navigate("/homeFullInfo");
                }
                } className={deactivate ? "trash_logo iconDisabled" : "trash_logo"}><img className={"trash_img"} src={deactivate ? "../../../government/trashPassive.png" : "../../../government/trash.svg"} /><p id={deactivate ? "memberAllParagraph" : ""}>{member.trash_str}</p></div>
            </div>
        </div>
    )
}