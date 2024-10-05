import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMeteor } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";


export default function DefaultChat() {
    return (
        <div className="w-full h-full relative px-10 flex flex-col gap-5 pb-10">

            <div className="flex-1 w-full relative ">
                <FaMeteor className="text-[15rem] text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="bg-accent rounded-full w-full h-fit p-[0.4rem] flex gap-3  ">
                <Button variant="secondary" className="h-full aspect-square rounded-full hover:bg-popover bg-popover/50">
                    <FaPaperclip />
                </Button>

                <Input type="text" placeholder="Give me a startup idea..." className="h-full" />

                <Button variant="secondary" className="h-full aspect-square rounded-full hover:bg-popover bg-popover/50">
                    <FaArrowUp />
                </Button>


            </div>

        </div>
    )
}