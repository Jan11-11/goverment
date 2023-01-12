import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchGovernmentMember } from "../../store/actions/governmentMembersAction";
import { IMemberInfo } from "../../types/models";
import { HomeInfoProduct } from "../../components/homeInfoProduct";
import { Header } from "../../components/header";
import "./home.scss";

export const Home = () => {
    const { members, loading, error } = useAppSelector((state) => state.membersInfo);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGovernmentMember())
    }, [dispatch])
    
    return (
        <div id={"body"} className={"body"}>
            <Header />
            <div className={"container"}>
                <h1 id={"containerTitle"}>ՀՀ Կառավարության անդամներ</h1>
                <div id={"members"} className={"members"}>
                    {members.length > 0 ? members.map((member: IMemberInfo) => {
                        return (
                            <HomeInfoProduct member={member} key={member.id} />
                        )
                    }) : loading}
                </div>
            </div>
        </div>
    );
}
