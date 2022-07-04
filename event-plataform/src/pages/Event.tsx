import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { Video } from "../components/Video";

export function Event() {

    const { slug } = useParams<{ slug: string }>();

    return (
        <div className="flex flex-col min-h-screen ">
            <Header />
            <main className="flex flex-1 lg:mt-[75px]">
                {slug 
                    ? <Video lessonSlug={slug}/> 
                    : <div className="flex-1"></div>
                }
            
                <SideBar classe="w-[348px] bg-gray-700 p-6 border-l border-gray-600 transition-all duration-100 lg:hidden "/>
            </main>
        </div>
    )
}