import { fetchGovernmentMemberFullInfo } from "../../store/actions/governmentMembersFullInfoAction";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useEffect, useState } from "react";
import { IMemberFullInfo } from "../../types/models";
import { HomeFullInfoProduct } from "../../components/homeFullInfoProduct/HomeFullInfoProduct";
import { FullInfoActionConfirm } from "../../components/fullInfoActionConfirm"
import { Header } from "../../components/header";
import { useNavigate } from "react-router-dom";
import "./homeFullInfo.scss";
import { Loading } from "../../components/loading";

export const HomeFullInfo = () => {
    const [keyId, setKeyId] = useState<number | undefined | null>()
    const [remove, setRemove] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error, membersFullInfo } = useAppSelector((state) => state.membersFullInfo);
    useEffect(() => {
        dispatch(fetchGovernmentMemberFullInfo())
    }, [dispatch, keyId]);
    return (
        <div className={"all"}>
            <div className={remove ? "overlay" : "overlayPassive"}></div>
            <Header />
            <div className={"main"}>
                <FullInfoActionConfirm remove={remove} setRemove={setRemove} keyId={keyId} setKeyId={setKeyId} />
                <div className={"mainTitle"}>
                    <h1>ՀՀ Կառավարության անդամներ </h1>
                    <div className={"addMember"}>
                        <button onClick={(e) => {
                            e.preventDefault();
                            navigate("/createProduct")
                        }
                        } className={"mainButton"}> <img src={"../../../government/plus.png"} />Ավելացնել
                        </button>
                    </div>
                    <div className={"memberFullInfo"}>
                        {membersFullInfo.length > 0 ? membersFullInfo.map((member: IMemberFullInfo) => {
                            return (
                                <HomeFullInfoProduct key={member.id} member={member} keyId={keyId} setKeyId={setKeyId} remove={remove} setRemove={setRemove} />
                            )
                        }) : <Loading />}
                    </div>
                </div>
            </div>
        </div>
    )
}