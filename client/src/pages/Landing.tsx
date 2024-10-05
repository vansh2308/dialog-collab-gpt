
import { Button } from "@/components/ui/button"
import heroVideo from "./../assets/hero-galaxy.mp4"
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";

// @ts-ignore
import { googleAuth } from "../services/api";

export default function Landing(props: any) {
    const responseGoogle = async (authResult: any) => {

        try {
            if (authResult["code"]) {
                console.log(authResult.code);
                const result = await googleAuth(authResult.code);
                // console.log(result)
                // console.log(result.data);
                alert("successfuly logged in");
            } else {
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });



    return (
        <div className="w-full h-full bg-black relative">
            <video
                src={heroVideo}
                autoPlay={true}
                loop={true}
                controls={false}
                muted
                className="absolute -top-3 w-full rotate-180" />


            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <h1 className="font-bold text-[18rem] text-white/10 tracking-wider h-min leading-none">
                    DIALOG
                </h1>
                <p className="text-muted-foreground mt-4 text-lg">Bridge the gap between collaboration and GPT</p>

                <Button
                    className="mt-10 py-7 px-11 flex gap-3 hover:drop-shadow-[0px_13px_40px_rgba(217,148,255,0.4)]"
                    onClick={googleLogin}
                >
                    Sign In with Google
                    <FaGoogle />
                </Button>
            </div>

        </div>
    )
}