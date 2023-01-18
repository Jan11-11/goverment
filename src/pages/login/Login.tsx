import {LoginHeader} from "../../components/loginHeader/LoginHeader";
import {useNavigate} from "react-router-dom";
import "./login.scss";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';

interface ILogin {
    [key: string]: string,
}
 export const Login=()=>{
     const navigate = useNavigate();
     const [checkLogin, setCheckLogin] = useState<ILogin>({});
     const [loginError, setLoginError] = useState<ILogin>({});
     const [password, setPassword] = useState<ILogin>({});
     const [passwordError, setPasswordError] = useState<ILogin>({});
     const [active, setActive] = useState(false);
     
     
     const regCheck: { [key: string]: RegExp } = {
        login: new RegExp(/^[A-Za-z][A-Za-z0-9]*$/),
        password: new RegExp(/^[A-Za-z][A-Za-z0-9]*$/),
     }

     const checkValidation = (e: any) => {
         e.preventDefault();
         let check = 0;

         
         if (checkLogin['login'] && checkLogin['login'].length >= 3 && checkLogin['login'].length <= 8) {
             check++;
             setLoginError({});
         } else if (checkLogin['login'] == '' || checkLogin['login'] == null) {
             loginError.login = 'Պարտադիր դաշտ';
             setLoginError({ ...loginError });
         } else if (checkLogin['login'] && checkLogin['login'].length < 3 || checkLogin['login'].length > 8) {
             loginError.login = 'Նվազագույնը 3 նիշ Առավելագույնը 8 նիշ';
             setLoginError({ ...loginError });
         }


            //  password validation
         if (password['password'] && password['password'].length >= 3 && password['password'].length <= 8) {
             check++;
             setPasswordError({});
         }
         else if (password['password'] == '' || password['password'] == null) {
             passwordError.password = 'Պարտադիր դաշտ';
             setPasswordError({ ...passwordError });
         }
         else if (password['password'] && password['password'].length < 3 || password['password'].length > 8) {
             passwordError.password = 'Նվազագույնը 3 նիշ Առավելագույնը 8 նիշ';
             setPasswordError({ ...passwordError });
         }
         if (check == 2) {
             navigate("/homeFullInfo")
         }
     }
    
    
     return (
         <div className="login">
             <div className="main">
                 <div className="container" id="container">
                     <LoginHeader />
                     <div className="containerMain">
                         <div className="loginImage">
                             <img src="../../../..//government/republicsquere.png" />
                         </div>
                         <form className="loginForm">
                             <h3 className="loginFormTitle">Մուտք գործել</h3>
                             <div id="loginFormChildLogin" className="loginFormChild">
                                 <label>Գաղտնանուն</label>
                                 <Input placeholder="Գաղտնանուն" name="login" 
                                     onChange={(e) => {
                                         e.preventDefault();
                                         setCheckLogin({ ...checkLogin, [e.target.name]: e.target.value })
                                     }}
                                     style={{ "borderRadius": "0px" }}
                                     id={loginError.login?"loginError1":""}
                                 />
                                 <p className="login_p">{loginError.login} </p>
                             </div>

                             <div id="loginFormChildPassword" className="loginFormChild">
                                 <label>Գաղտնաբառ</label>
                                 <Input.Password
                                     placeholder="*******"
                                     iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                     name='password'
                                     onChange={(e) => {
                                         e.preventDefault();
                                         setPassword({ ...password, [e.target.name]: e.target.value })
                                     }}
                                     className={loginError.login?"loginError1 loginFormChildid":"loginFormChildid"}
                                     style={{ "borderRadius": "0px" } }
                                 />

                                <p className="password_p">{passwordError.password}</p>

                             </div>
                             <div id="loginFormChildCheckbox" className="loginFormCheckbox">
                                 <div id="loginFormCheckboxChild" className="loginFormCheckboxChild">
                                    <div className="remcheck"> <input  type="checkbox" onClick={(e)=>{
                                        setActive(!active)
                                    }}/>
                                     <label id={active?"unCheked":"saveCheck"}>Հիշել</label>
                                     </div>
                                 </div>
                             </div>
                             <button id="loginFormChildButton" className="loginFormButton" onClick={checkValidation}>Մուտք</button>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
     );
}
