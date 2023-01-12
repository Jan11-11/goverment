import { useState } from "react";
import { IMemberFullInfo } from "../../types/models";
import "./homeFullInfoProduct.scss"
import { FullInfoRightPart } from "../fullInfoRightPart/FullInfoRightPart";
import { FullInfoLeftPart } from "../fullInfoLeftPart";

interface IMember {
    setKeyId: (keyId: number) => void,
    keyId: number | null | undefined
    remove: boolean,
    setRemove: (remove: boolean) => void,
    member: IMemberFullInfo,
}

export const HomeFullInfoProduct = ({ member, remove, setRemove, keyId, setKeyId }: IMember) => {
    const [active, setActive] = useState(false);
    const [deactivate, setDeactivate] = useState(false);
    return (
        <div className={active ? "memberActive member" : deactivate ? "member deactivate" : "member"}>
            <div className={"memberContent"}>
                <FullInfoLeftPart member={member} deactivate={deactivate} remove={remove} setRemove={setRemove} active={active} setActive={setActive} />
                <FullInfoRightPart member={member} deactivate={deactivate} setDeactivate={setDeactivate} setRemove={setRemove} remove={remove} keyId={keyId} setKeyId={setKeyId} active={active} setActive={setActive} />
            </div>
        </div>
    )
}