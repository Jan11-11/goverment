// import React from "react";
// import "./header.scss";
// import {useNavigate} from "react-router-dom";
//
// export const Header=()=>{
//     const navigate=useNavigate();
//     return(
//         <header className={"header"}>
//             <div className={"headerContainer"}>
//                 <div>
//                     <div className={"headerGerbPart"}>
//                         <img src={"../../../../government/gerb.png"}/>
//                         <h5 id={"headerContainerH5"} className={"headerContainerH5"}>Հայաստանի Հանրապետության Կառավարություն</h5>
//                     </div>
//                 </div>
//                 <div className={"headerVectorPartParent"}>
//                     <div className={"headerVectorPart"} onClick={(event)=>{
//                         event.preventDefault();
//                         navigate("/");
//                     }
//                     }>
//                         <img src={"../../../../government/Vectorright.png"}/>
//
//                         <h6 id={"headerContainerH6"} className={"headerContainerH6"}>Դուրս գալ</h6>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     )
// }

import React from "react";
import "./header.scss";
import {useNavigate} from "react-router-dom";

export const Header=()=>{
    const navigate=useNavigate();
    return(
        <header className={"header"}>
            <div className={"headerContainer"}>
                <div>
                    <div className={"headerGerbPart"}>
                        <img src={"../../../../government/gerb.png"}/>
                        <h5 id={"headerContainerH5"} className={"headerContainerH5"}>Հայաստանի Հանրապետության Կառավարություն</h5>
                    </div>
                </div>
                <div className={"headerVectorPartParent"}>
                    <div className={"headerVectorPart"} onClick={(event)=>{
                        event.preventDefault();
                        navigate("/");
                    }
                    }>
                        <img src={"../../../../government/Vectorright.png"}/>

                        <h6 id={"headerContainerH6"} className={"headerContainerH6"}>Դուրս գալ</h6>
                    </div>
                </div>
            </div>
        </header>
    )
}