import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import "./layout.css";

export default function Layout({ children }){
    return ( 
        <>
            <Header/>
        <div className="layout">
            <Sidebar />
            <MainContent>{children}
                <h2>MAAIN CONTENTO</h2>
            </MainContent>
        </div>
        </>
    )
}