import { Event } from "./pages/Event";
import { Subscribe } from "./pages/Subscribe";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";

export function Router() {
    return (
        <Routes>
            {/* <Route path="/" element={<h1>Hello</h1>}/> */}
            <Route path="/" element={<Subscribe />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/event" element={<Event />}/>
            <Route path="/event/lesson/:slug" element={<Event />}/>
        </Routes>
    );
}