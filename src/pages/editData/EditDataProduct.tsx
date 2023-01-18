import { Header } from "../../components/header";
import "./editDataProduct.scss";
import { editeAProduct } from "../../store/actions/governmentAddRemoveMembers"
import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { uniqueProductAction } from "../../store/actions/uniqueProductAction";
import { useAppSelector, useAppDispatch } from "../../hooks";

type MyEdite = Record<string | number, string | string>

export function EditDataProduct() {
  const { product, error, loading } = useAppSelector(state => state.uniqueProduct);

  const [editeProduct, setEditeProduct] = useState<MyEdite>({
  fullName: "",
  title: "",
  img: ""
});
  const [editeErrorProduct, setEditeErrorProduct] = useState<MyEdite>({
   
  });

  const navigate = useNavigate();
  const id = useLocation();
  const dispatch = useAppDispatch();
  let fileReader:any = new FileReader();

  const regCheck: { [key: string]: RegExp } = {
    fullName: new RegExp(/^[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}[\s][\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}$/),
    title: new RegExp(/^[\u0531-\u0561]{1,2}[\u0561-\u0586]{0,19}[,]{0,1}[\s]{1}([\u0531-\u0561]{0,5}[\u0561-\u0586]{0,19}[\u0587]{0,3}[,։՝]{0,1}[\s]{0,1}){1,9}$/),
    id: new RegExp(/^[0-9]{1,2}$/)
  }

  const uploadImageHandler = (e: any) => {
    if(e.target.files){
  convertBase64(e.target.files[0]).then((res: any) => {
    setEditeProduct({ ...editeProduct, img:res})   
});
}


   

  }
  if (id.state != null) {
    localStorage.setItem("id", JSON.stringify(id.state.id));
  }
  let storeId = localStorage.getItem("id");

  useEffect(() => {
    if (storeId) {
      dispatch(uniqueProductAction(parseInt(storeId)));
    }
  }, [storeId]);

  useEffect(() => {
    if (product.length > 0) {
      setEditeProduct({ ...editeProduct, fullName: product[0].fullName, title: product[0].title, img: product[0].img })
    }
  }, [product]);

  if (storeId) {
    editeProduct.id = storeId;
  }

  const convertBase64 = (file: any) => {
   
    return new Promise((resolve, reject) => {

     if (file) {
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
     }
    })
   
  }
  
  const blurFullName = (event: React.FocusEvent<HTMLElement>) => {
    event.preventDefault();
    delete editeErrorProduct.fullName;
    setEditeErrorProduct({ ...editeErrorProduct });
    if (editeProduct["fullName"] == "" || editeProduct["fullName"] == null) {
      editeErrorProduct.fullName = "Պարտադիր դաշտ";
      setEditeErrorProduct({ ...editeErrorProduct })
    }
    else if (!regCheck["fullName"].test(editeProduct["fullName"])) {
      editeErrorProduct.fullName = "Դաշտը լրացնել հայերեն";
      setEditeErrorProduct({ ...editeErrorProduct });
    }
  }

  const blurTitle = (event: React.FocusEvent<HTMLElement>) => {
    event.preventDefault();
    delete editeErrorProduct['title'];
    setEditeErrorProduct({ ...editeErrorProduct })
    if (editeProduct["title"] == "" || editeProduct["title"] == null) {
      editeErrorProduct.title = "Պարտադիր դաշտ";
      setEditeErrorProduct({ ...editeErrorProduct });
    }
    else if (editeProduct["title"].length > 150) {
      editeErrorProduct.title = "Առավելագույնը 150 հայատառ նիշ";
      setEditeErrorProduct({ ...editeErrorProduct })
    }
    else if (!regCheck["title"].test(editeProduct["title"])) {
      editeErrorProduct.title = "Դաշտը լրացնել հայերեն";
      setEditeErrorProduct({ ...editeErrorProduct })
    }

  }
  const addConfirme = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditeErrorProduct({});
    let check = 0;
    for (let key in regCheck) {
      if (key !== "img") {
        if (regCheck[key].test(editeProduct[key])) {
          check++;
          if (editeErrorProduct[key]) {
            delete editeErrorProduct[key];
          }
        }
        else if (editeProduct[key] == "" || editeProduct[key] == null) {
          editeErrorProduct[key] = "Պարտադիր դաշտ"
          setEditeErrorProduct({ ...editeErrorProduct });
        }
        else if (!regCheck[key].test(editeProduct[key])) {
          editeErrorProduct[key] = "Դաշտը լրացնել հայերեն"
          setEditeErrorProduct({ ...editeErrorProduct });
        }
      }
    }
    if (editeProduct.img) {
      check++;
      delete editeErrorProduct.img;
      setEditeErrorProduct({ ...editeErrorProduct })
    }
    else {
      setEditeErrorProduct({ ...editeErrorProduct, img: "Ներբեռնեք նկարը" });
    }
       
    if (!(Object.keys(editeErrorProduct).length)  && check == 4) {
      dispatch(editeAProduct(editeProduct));
      navigate("/homeFullInfo");
    }
  }

  return (
    <div className='createData'>
      <Header />
      <div className="container" id="container">
        <div className="pageTitle" id="createTitle"> Տվյալների խմբագրում</div>
        <div className="createpage" id="createpage">
          <div className={editeErrorProduct.img ? "createimg imageError" : "createimg"} id="createimg">
            <img id={editeProduct.img ? "createdImg" : ""} src={editeProduct.img ? editeProduct.img : " ../../../../government/backgroundimage.png" }  />
          </div>
          <form className="create" id="create" autoComplete="off">
            <div className="createInput" id="createInput">
              <div className="createName" id="createName">
                <label className={editeErrorProduct.fullName ? "labelError" : ""}>Անուն Ազգանուն</label>
                <input id={editeErrorProduct.fullName ? "inputError" : ""} name={"fullName"} type="text" value={editeProduct.fullName || ""} onBlur={blurFullName} onChange={(event) => {
                  event.preventDefault();
                  setEditeProduct({ ...editeProduct, [event.target.name]: event.target.value })
                }
                } placeholder='Անուն Ազգանուն' />
                <p className="fullNameError" id="fullNameError">{editeErrorProduct.fullName}</p>
              </div>
              <div className="createInfo" id="createInfo">
                <label className={editeErrorProduct.title ? "labelError" : ""}>Պաշտոն</label>
                <input id={editeErrorProduct.title ? "titleErrorMessage" : ""} type="text" name={"title"} value={editeProduct.title || ""} onBlur={blurTitle} onChange={(event) => {
                  event.preventDefault();
                  setEditeProduct({ ...editeProduct, [event.target.name]: event.target.value })
                }
                } placeholder='Օր․՝ ՀՀ վարչապետ' />
                <p className="titleError" id="titleError">{editeErrorProduct.title}</p>
              </div>
            </div>
            <div className="buttons" id="buttons" >
              <div className="rightbtns" id="buttons" >
                <button className="removeBtn" id="removeBtn" onClick={(event) => {
                  if (Object.values(editeProduct).length) {
                    for (let key in editeProduct) {
                      delete editeProduct[key];
                    }
                    setEditeProduct({ ...editeProduct });
                  }
                  if (Object.values(editeErrorProduct).length) {
                    for (let key in editeErrorProduct) {
                      delete editeErrorProduct[key];
                    }
                    setEditeErrorProduct({ ...editeErrorProduct });
                  }
                }}>Չեղարկել</button>
                <button className="addBtn" id="addBtn" onClick={addConfirme}>Հաստատել </button>
              </div>
            </div>
            <div className={editeErrorProduct.img ? "leftbtn imageErrorMessage" : "leftbtn"} id="leftBtn">
              <div id="uppDiv">
                <label htmlFor="file">
                  <img src={editeErrorProduct.img ? "../../../../government/down.svg" : "../../../../government/vectordown1.png"} alt='img' />
                  Ներբեռնել նկար
                </label>
                <input type="file" accept="image/*" name="file" id="file" style={{ "display": "none" }} value={Object.keys(fileReader).length>0?fileReader.files[0]:""} onChange={(e) => uploadImageHandler(e)} />
              </div>
              {editeProduct.img?<div id="delDiv" onClick={() => {
                delete editeProduct.img;
                 fileReader="";
                setEditeProduct({...editeProduct});
              }}>
                <img src="../../../../government/trash.svg" />
                <label>Ջնջել</label>
              </div>:""}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
