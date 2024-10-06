import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";


export default function Chat({}){
    let { chatId } = useParams();
    useEffect(() => {
        // console.log(cha)
    }, [])


    return(
        <div className="w-full h-full text-foreground">
            {
                chatId 
            }
        </div>
    )
}