import "./fullInfoActionConfirm.scss";
import { deleteProduct } from "../../store/actions/governmentAddRemoveMembers";
import { useAppDispatch } from "../../hooks";

interface IRemove {
    keyId: number | null | undefined,
    setKeyId: (id: number) => void,
    remove: boolean,
    setRemove: (remove: boolean) => void
}

export const FullInfoActionConfirm = ({ remove, setRemove, keyId, setKeyId }: IRemove) => {
    const dispatch = useAppDispatch();
    return (
        <div data-exeption id={remove ? "mainConfirm" : ""} className={remove ? "mainConfirm" : "mainConfirmHidden"}>
            <h3 id={"confirmTitle"}>Հաստատե՞լ տվյալի ջնջումը</h3>
            <div id={"mainConfirmButtons"} className={"mainConfirmButtons"}>
                <button id={"buttonDisCharge"} onClick={(event) => {
                    event.preventDefault();
                    setRemove(!remove);
                }} className={"buttonDisCharge"}>Չեղարկել</button>
                <button id={"buttonDelete"} className={"buttonDelete"} onClick={(event) => {
                    event.preventDefault();
                    // @ts-ignore
                    dispatch(deleteProduct(keyId));
                    setKeyId(0);
                    setRemove(!remove);
                }}>Ջնջել</button>
            </div>
        </div>
    )
}