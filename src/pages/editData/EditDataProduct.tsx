import { Header } from "../../components/header";
import "./editDataProduct.scss";
import {editeAProduct} from "../../store/actions/governmentAddRemoveMembers"
import { useState, useEffect, useRef } from 'react';
import  {useLocation,useNavigate} from "react-router-dom";
import {uniqueProductAction} from "../../store/actions/uniqueProductAction";
import {useAppSelector,useAppDispatch} from "../../hooks";
import {addProduct} from "../../store/actions/governmentAddRemoveMembers";
import {IMemberFullInfo} from "../../types/models";

  type MyEdite= Record<string | number, string | string>

export function EditDataProduct() {
    let obj:MyEdite={}

  const [editeProduct, setEditeProduct] = useState<MyEdite>({});
  const [editeErrorProduct,setEditeErrorProduct]=useState<MyEdite>({})
  const {product,error,loading}=useAppSelector(state=>state.uniqueProduct);
  const navigate=useNavigate();
  const id=useLocation();
  const dispatch = useAppDispatch();
  if(product.length) {
    editeProduct.id = id.state.id;
    obj.fullName = product[0].fullName;
    obj.title = product[0].title
  }

  const  regCheck:{[key:string]:RegExp}={
    fullName:new RegExp(/^[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}[\s][\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}$/),
    title:new RegExp(/^[\u0531-\u0561]{1,2}[\u0561-\u0586]{0,19}[,]{0,1}[\s]{1}([\u0531-\u0561]{0,5}[\u0561-\u0586]{0,19}[\u0587]{0,3}[,։՝]{0,1}[\s]{0,1}){1,9}$/),
    id:new RegExp(/^[0-9]{1,2}$/)
  }

  const uploadImageHandler = (e: any) =>{
    convertBase64(e.target.files[0]).then((res :any) => {
      setEditeProduct({...editeProduct,img:res})
    });
  }


  useEffect(()=>{
    dispatch(uniqueProductAction(id.state.id))
  },[id.state.id]);


  const convertBase64 = (file :any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const blurFullName=(event: React.FocusEvent<HTMLElement>)=>{
    event.preventDefault();
    delete editeErrorProduct.fullName;
    setEditeErrorProduct({...editeErrorProduct});
    if (editeProduct["fullName"]=="" || editeProduct["fullName"]==null){
      editeErrorProduct.fullName="Պարտադիր դաշտ";
      setEditeErrorProduct({...editeErrorProduct})
    }
    else if(!regCheck["fullName"].test(editeProduct["fullName"])){
      editeErrorProduct.fullName="Դաշտը լրացնել հայերեն";
      setEditeErrorProduct({...editeErrorProduct});
    }
  }

  const blurTitle=(event: React.FocusEvent<HTMLElement>)=>{
    event.preventDefault();
    delete editeErrorProduct['title'];
    setEditeErrorProduct({...editeErrorProduct})
    if (editeProduct["title"]=="" || editeProduct["title"]==null){
      editeErrorProduct.title="Պարտադիր դաշտ";
      setEditeErrorProduct({...editeErrorProduct});
    }
    else if(editeProduct["title"].length<18){
      editeErrorProduct.title="Նվազագույնը 18 հայատառ նիշ";
      setEditeErrorProduct({...editeErrorProduct})
    }
    else if(editeProduct["title"].length>150){
      editeErrorProduct.title="Առավելագույնը 150 հայատառ նիշ";
      setEditeErrorProduct({...editeErrorProduct})
    }
    else if (!regCheck["title"].test(editeProduct["title"])){
       editeErrorProduct.title="Դաշտը լրացնել հայերեն";
       setEditeErrorProduct({...editeErrorProduct})
    }

  }

  const addConfirme=(event: React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    setEditeErrorProduct({});
    let check=0;

    for(let key in regCheck) {
      if (key !== "img" ) {

        if (regCheck[key].test(editeProduct[key])) {
          check++;
          if (editeErrorProduct[key]){
            delete editeErrorProduct[key];
          }
        }
        else if (editeProduct[key]=="" || editeProduct[key]==null){
          editeErrorProduct[key]="Պարտադիր դաշտ"
          setEditeErrorProduct({...editeErrorProduct});
        }
        else if(!regCheck[key].test(editeProduct[key])){
         editeErrorProduct[key]="Դաշտը լրացնել հայերեն"
          setEditeErrorProduct({...editeErrorProduct});
        }
      }
    }


    if (editeProduct.img){
      check++;
        delete editeErrorProduct.img;
        setEditeErrorProduct({...editeErrorProduct})
    }
    else {
      setEditeErrorProduct({...editeErrorProduct,img:"Ներբեռնեք նկարը"});
    }

    if (Object.keys(regCheck).length+1==4){
        dispatch(editeAProduct(editeProduct));
        navigate("/homeFullInfo");
    }
  }

  return (
    <div className='createData'>
   <Header/>
      <div className="container" id="container">
        <div className="pageTitle" id="createTitle"> Տվյալների խմբագրում</div>
        <div className="createpage" id="createpage">
          <div className="createimg" id="createimg">

              <img id={editeProduct.img?"activeImg":"passiveImg"} src={editeProduct.img?editeProduct.img : " ../../../../government/backgroundimage.png"} />
          </div>
          <form className="create" id="create">
            <div className="createInput" id="createInput">
              <div className="createName" id="createName">
                <label>Անուն Ազգանուն</label>
                <p>{editeErrorProduct.fullName}</p>
                <input  name={"fullName"} type="text" value={ editeProduct["fullName"]  || "" } onBlur={blurFullName}  onChange={(event)=>{
                  event.preventDefault();
                  setEditeProduct({...editeProduct, [event.target.name]:event.target.value})
                }
                }  placeholder='Անուն Ազգանուն'/>
              </div>
              <div className="createInfo" id="createInfo">
                <label>Պաշտոն</label>
                <p>{editeErrorProduct.title}</p>
                <input type="text" name={"title"}      onBlur={blurTitle}   onChange={(event)=>{
                  event.preventDefault();
                 setEditeProduct({...editeProduct, [event.target.name]:event.target.value})
                }
                }placeholder='Օր․՝ ՀՀ վարչապետ' />
              </div>
            </div>
            <div className="buttons" id="buttons" >
              <div className="rightbtns" id="buttons" >
                <button   type="submit" className="removeBtn" id="removeBtn">Չեղարկել</button>
                <button   type="submit" className="addBtn" id="addBtn" onClick={addConfirme}>Հաստատել </button>
              </div>
            </div>
            <div className="leftbtn" id="leftBtn">
              <label htmlFor="file">
                <img src="../../../../government/vectordown.png" alt='img'/>
                Ներբեռնել Նկար
              </label>
                <input type="file" accept="image/*" name="file" id="file"  style={{"display":"none"}} onChange={(e)=>uploadImageHandler(e)}/>
              </div>
          </form>
        </div>
    </div>
  </div>
  );
  }
