

import heroVideo from "./../assets/hero-galaxy.mp4"

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


            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="font-bold text-[18rem] text-white/10 tracking-wider">
                    DIALOG
                </h1>
            </div>

        </div>
    )
}