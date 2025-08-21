import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ReflectionOfLight from "./ReflectionOfLight";

type SlidesProps = {
  visible: boolean;
  setvisible: Dispatch<SetStateAction<boolean>>;
};

const Slides = ({ visible, setvisible }: SlidesProps) => {
  // Local state to control entry animation of the slide container
  const [show, setShow] = useState(false);

  // Track number of right/left navigation clicks
  const [clicks, setclicks] = useState(0);

  // Animate slide when visibility changes
  useEffect(() => {
    if (!visible) {
      setTimeout(() => setShow(true), 10); // smooth transition
    } else {
      setShow(false);
    }
  }, [visible]);

  // Show/hide left navigation button depending on click count
  useEffect(() => {
    const left = document.querySelector('#leftClick');
    if(left){
        if(clicks===1){  
            left.classList.remove("hidden");
        }
        else if(clicks===0){
            left.classList.add("hidden");
        }
    }
  }, [clicks])
  

  return (
    <div className="max-w-screen h-screen bg-black overflow-hidden relative">
      <div
        className={`
          main w-full h-full bg-black flex relative
          transform transition-transform duration-500 ease-out
          ${show ? "translate-y-0 opacity-100" : "translate-y-[2%] opacity-0"}
        `}
      >
        {/* Left navigation button */}
        <button className="h-full flex p-8 items-center justify-center fixed ">
          <svg
            id="leftClick" 
            className="w-[50px] h-[50px] hidden hover:cursor-pointer"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            onClick={()=>{setclicks(clicks-1)}}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Main Slide Content → loads ReflectionOfLight component */}
        <div className="h-full w-full overflow-y-auto">
          <ReflectionOfLight setvisible={setvisible}/>
        </div>

        {/* Right navigation button */}
        <button className="h-full flex p-8 items-center justify-center fixed right-0">
          <svg
            className="w-[50px] h-[50px] hover:cursor-pointer"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            onClick={()=>{setclicks(clicks+1)}}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slides;
