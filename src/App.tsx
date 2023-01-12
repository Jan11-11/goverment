import React from 'react';
import { fetchGovernmentMemberFullInfo } from "../src/store/actions/governmentMembersFullInfoAction";
import { fetchGovernmentMember } from "../src/store/actions/governmentMembersAction"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login"
import { Home } from "./pages/home";
import { HomeFullInfo } from "./pages/homeFullInfo";
import { EditDataProduct } from "./pages/editData";
import { DatailPage } from './pages/detail';
import { CreateDataProduct } from './pages/createData';
function App() {
    return (
        <div className={"app"}>
            <Routes>
                <Route path="/edite" element={<EditDataProduct />} />
                <Route path={"/homeFullInfo"} element={<HomeFullInfo />} />
                <Route path={'/'} element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path='/detail' element={<DatailPage />} />
                <Route path="/createProduct" element={<CreateDataProduct />} />
            </Routes>
        </div>
        
    );
}

export default App;
