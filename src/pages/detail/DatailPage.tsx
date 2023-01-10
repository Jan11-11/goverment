import {useEffect,useState} from "react";
import "./detail.scss";
import {useLocation,useNavigate} from "react-router-dom";
import {useAppDispatch,useAppSelector} from "../../hooks";
import {uniqueProductAction} from "../../store/actions/uniqueProductAction";
import {Header} from "../../components/header";
import { Loading } from '../../components/loading';
export function DatailPage() {
    const id=useLocation();
    const {product,loading,error}=useAppSelector(state => state.uniqueProduct);
    const dispatch=useAppDispatch();
    useEffect(()=>{
        dispatch(uniqueProductAction(id.state.id))
    },[id])
    return (
        <div className={'detail'}>
            <Header />
            <div className='greenline' id='greenline'></div>
            <div className='contan' id='contan'>
                {product.length>0?<div  className='chunk' id='chunk'>

                    <div className='chunkleftdiv' id='chunkleftdiv'>
                        <div className='chunkleft' id='chunkleft'>
                            <img src={product[0]?.img}/>
                        </div>
                    </div>
                    <div className='chunkright' id='chunkright'>
                        <p className='fullName' id='fullName'>{product[0]?.fullName}</p>
                        <p className='fullInfo' id='fullInfo'>{product[0].title}</p>
                    </div>
                </div>:<Loading />}
            </div>
        </div>
    )
}
