import { Header } from "../../components/header";
import "./createDataProduct.scss";
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { fetchGovernmentMemberFullInfo } from "../../store/actions/governmentMembersFullInfoAction";
import { addProduct } from "../../store/actions/governmentAddRemoveMembers";
interface ICreateMember {
    [key: string]: string
}
export function CreateDataProduct() {

    const [img, setImg] = useState("");
    const [createProduct, setCreateProduct] = useState<ICreateMember>({});
    const [errorProduct, setErrorProduct] = useState<ICreateMember>({});
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const regCheck: { [key: string]: RegExp } = {
        fullName: new RegExp(/^[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}[\s][\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}$/),
        title: new RegExp(/^[\u0531-\u0561]{1,2}[\u0561-\u0586]{0,19}[,]{0,1}[\s]{1}([\u0531-\u0561]{0,5}[\u0561-\u0586]{0,19}[\u0587]{0,3}[,։՝]{0,1}[\s]{0,1}){1,9}$/),
    }
    const uploadImageHandler = (e: any) => {
        convertBase64(e.target.files[0]).then((res: any) => {
            setImg(res);
            setCreateProduct({ ...createProduct, img: res })
        });
    }

    const addConfirme = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let check = 0;

        for (let key in regCheck) {
            if (key !== "img") {
                if (regCheck[key].test(createProduct[key])) {
                    check++;
                    if (errorProduct[key]) {
                        delete errorProduct[key];
                    }
                }
                else if (createProduct[key] == null || createProduct[key] == "") {
                    errorProduct[key] = "Պարտադիր դաշտ";
                    setErrorProduct({ ...errorProduct });
                }
                else if (!regCheck[key].test(createProduct[key])) {
                    errorProduct[key] = "Դաշտը լրացնել հայերեն";
                    setErrorProduct({ ...errorProduct });
                }

            }

        }

        if (createProduct.img) {
            check++;
            if (errorProduct.img) {
                delete errorProduct.img;
                setErrorProduct({ ...errorProduct })
            }
        }
        else {
            setErrorProduct({ ...errorProduct, img: "Ներբեռնեք նկարը" });
        }

        if (Object.keys(regCheck).length + 1 === check) {
            dispatch(addProduct(createProduct));
            navigate("/homeFullInfo");
        }

    }
    const convertBase64 = (file: any) => {
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

    const blurFullName = (event: any) => {
        event.preventDefault();
        delete errorProduct['fullName'];
        setErrorProduct({ ...errorProduct })
        if (createProduct["fullName"] === "" || createProduct["fullName"] === null) {
            errorProduct.fullName = "Պարտադիր դաշտ";
            setErrorProduct({ ...errorProduct });
        }
        else if (!regCheck["fullName"].test(createProduct["fullName"])) {
            errorProduct.fullName = "Դաշտը լրացնել հայերեն";
            setErrorProduct({ ...errorProduct })
        }
    }
    const blurTitle = (event: any) => {
        event.preventDefault();
        delete errorProduct['title'];
        setErrorProduct({ ...errorProduct })
        if (createProduct["title"] === "" || createProduct["title"] === null) {
            errorProduct.title = "Պարտադիր դաշտ";
            setErrorProduct({ ...errorProduct });
        }
        else if (!regCheck["title"].test(createProduct["title"])) {
            errorProduct.title = "Դաշտը լրացնել հայատառ";
            setErrorProduct({ ...errorProduct })
        }
    }

    return (

        <div className='createData'>
            <Header />
            <div className="container" id="container">
                <div className="pageTitle" id="createTitle"> Ավելացնել նոր նկար</div>
                <div className="createpage" id="createpage">
                    <div className={errorProduct.img ? "createimg imageError" : "createimg"} id="createImage">
                        <img id={img ? "createdImg" : ""} src={img || " ../../../../government/backgroundimage.png"} />
                    </div>
                    <form className="create" id="create">
                        <div className="createInput" id="createInput">
                            <div className="createName" id="createName">
                                <label className={errorProduct.fullName ? "labelError" : ""}>Անուն Ազգանուն</label>
                                <input id={errorProduct.fullName ? "inputError" : ""} type="text" name={"fullName"} onBlur={blurFullName} onChange={(event) => {
                                    setCreateProduct({ ...createProduct, [event.target.name]: event.target.value })
                                }} placeholder='Անուն Ազգանուն' />
                                <label id={errorProduct.fullName ? "errorMessageForName" : "hideErrorMessage"}>{errorProduct["fullName"]}</label>
                            </div>
                            <div className="createInfo" id="createInfo">
                                <label className={errorProduct.title ? "labelError" : ""}>Պաշտոն</label>
                                <input type="text" id={errorProduct.title ? "inputError" : ""} name={"title"} onBlur={blurTitle} onChange={(event) => {
                                    setCreateProduct({ ...createProduct, [event.target.name]: event.target.value })
                                }} placeholder='Օր․՝ ՀՀ վարչապետ' />
                                <label id={errorProduct.title ? "errorMessageForTitle" : "hideErrorMessage"}>{errorProduct["title"]}</label>
                            </div>
                        </div>
                        <div className="buttons" id="buttons" >
                            <div className="rightbtns" id="buttons" >
                                <button type="submit" className="removeBtn" id="removeBtn">Չեղարկել</button>
                                <button type="submit" className="addBtn" id="addBtn" onClick={addConfirme}>Հաստատել </button>
                            </div>
                        </div>
                        <div className={errorProduct.img ? "leftbtn imageErrorMessage" : "leftbtn"} id="leftBtn">
                            <label htmlFor="file">
                                <img src={errorProduct.img ? "../../../../government/down.svg" : "../../../../government/vectordown1.png"} className={errorProduct.img ? "imageErrorIcon" : ""} />
                                Ներբեռնել Նկար
                            </label>
                            <input type="file" accept="image/*" name="file" id="file" onChange={(e) => uploadImageHandler(e)}
                                style={{ "display": "none" }} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
