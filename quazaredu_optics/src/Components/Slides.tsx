import { useEffect, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import ReflectionOfLight from "./ReflectionOfLight";
import RefractionOfLight from "./RefractionOfLight";

type SlidesProps = {
  visible: boolean;
  setvisible: Dispatch<SetStateAction<boolean>>;
};

const Slides = ({ visible, setvisible }: SlidesProps) => {
  const [show, setShow] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slideComponents: ReactNode[] = [
    <ReflectionOfLight key="reflection" setvisible={setvisible} />,
    <RefractionOfLight key="refraction" setvisible={setvisible} />,
  ];

  useEffect(() => {
    if (!visible) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [visible]);

  const handleNext = () => {
    if (currentSlideIndex < slideComponents.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="max-w-screen h-screen bg-black overflow-hidden relative">
      <div
        className={`
          main w-full h-full bg-black flex relative
          transform transition-transform duration-500 ease-out
          ${show ? "translate-y-0 opacity-100" : "translate-y-[2%] opacity-0"}
        `}
      >
        {/* --- Left navigation button --- */}
        {/* MODIFIED: Padding is smaller on mobile (p-4) and larger on desktop (md:p-8) */}
        <button className="h-full flex p-4 md:p-8 items-center justify-center fixed z-10">
          <svg
            // MODIFIED: Icon is smaller on mobile (w/h-[35px]) and larger on desktop (md:w/h-[50px])
            className={`
              w-[35px] h-[35px] md:w-[50px] md:h-[50px] hover:cursor-pointer transition-opacity duration-300
              ${currentSlideIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}
            `}
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            onClick={handlePrev}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* --- Main Slide Content --- */}
        <div className="slides h-full w-full overflow-y-auto">
          {slideComponents[currentSlideIndex]}
        </div>

        {/* --- Right navigation button --- */}
        {/* MODIFIED: Padding is smaller on mobile (p-4) and larger on desktop (md:p-8) */}
        <button className="h-full flex p-4 md:p-8 items-center justify-center fixed right-0 z-10">
          <svg
            // MODIFIED: Icon is smaller on mobile (w/h-[35px]) and larger on desktop (md:w/h-[50px])
            className={`
              w-[35px] h-[35px] md:w-[50px] md:h-[50px] hover:cursor-pointer transition-opacity duration-300
              ${currentSlideIndex >= slideComponents.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"}
            `}
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            onClick={handleNext}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slides;