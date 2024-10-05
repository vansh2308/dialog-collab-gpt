
import { Button } from "@/components/ui/button"
import heroVideo from "./../assets/hero-galaxy.mp4"
import { FaGoogle } from "react-icons/fa";


export default function Landing({ }) {
    return (
        <div className="w-full h-full bg-black relative">
            <video
                src={heroVideo}
                autoPlay={true}
                loop={true}
                controls={false}
                muted
                className="absolute -top-3 w-full rotate-180" />


            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <h1 className="font-bold text-[18rem] text-white/10 tracking-wider h-min leading-none">
                    DIALOG
                </h1>
                <p className="text-white mt-4 text-lg">Bridge the gap between collaboration and GPT</p>

                <Button className="mt-10 py-7 px-11 flex gap-3 hover:drop-shadow-[0px_13px_40px_rgba(217,148,255,0.4)]">
                    Sign In with Google 
                    <FaGoogle />
                </Button>
            </div>

        </div>
    )
}