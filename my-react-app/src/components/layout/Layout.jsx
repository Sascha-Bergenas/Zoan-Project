import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import "./layout.css";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return ( 
        <>
            <Header/>
        <div className="layout">
            <Sidebar />
            <MainContent>
                <Outlet/>
            </MainContent>
        </div>
        </>
    )
}