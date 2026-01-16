import Card from "../ui/Card.jsx"

export default function Sidebar(){
    return ( 
    <aside className="sidebar">
        <Card title="Aktiv tid"/>
        <Card title="Energiprognos"/>
        <Card title="Nästa rast"/>
        <Card title="Fokusläge"/>
    </aside>
    ) 
}