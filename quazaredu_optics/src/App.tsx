import { useState } from "react"
import Slides from "./Components/Slides"

function App() {
  // State to control whether we are on the "main screen" or "slides screen"
  const [visible, setvisible] = useState(true);

  // If visible = false → show the Slides component instead of the main dashboard
  if(!visible){
    return(
      <Slides visible={visible} setvisible={setvisible}/>
    )
  }

  // Main home screen layout
  return(
    <div className="bg-gray-900 h-screen w-screen flex flex-col">
      
      {/* Navigation bar with logo, user info, and Sign Out button */}
      <nav className="Navbar w-full p-6 py-3 mx-auto flex items-center justify-center bg-gray-800">
        <div className="flex items-center justify-between w-2/3">
          <div className="Logo text-xl font-bold text-indigo-600 dark:text-indigo-300">Quazar</div>
          <div className="User flex items-center text-gray-300 gap-5">
            <div className="text-center text-sm">Devasheesh Upreti</div>
            <button className="text-center border-gray-700 border-1 p-2 px-4 rounded-md hover:bg-gray-700 transition ease-in-out  duration-400 hover:cursor-pointer ">Sign Out</button>
          </div>
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="main w-full py-20 h-full flex justify-center">
        <div className="w-2/3 px-2">

          {/* Subject Card → "Optics" */}
          <div className="Optics h-[210px] w-[350px] border-gray-700 border-1 rounded-xl bg-gray-800 text-white flex flex-col p-5 gap-5">
            <h1 className="text-white text-lg font-semibold ">Optics</h1>
            <p className="text-sm text-gray-400 line-clamp-2">
              Reflection of Light, Refraction of Light, Human Eye and Defects of Vision, Dispersion of Light, Atmospheric Refraction, and Scattering of Light.
            </p>

            {/* Action Buttons */}
            <div className="border-t border-gray-600 flex gap-2 items-center py-3 pb-0">
              {/* This button hides main screen and opens Slides */}
              <button className="bg-indigo-700 w-auto p-2 rounded-md hover:cursor-pointer" onClick={()=>{setvisible(false)}} >View Content</button>
              <button className="bg-indigo-700 w-auto p-2 rounded-md hover:cursor-pointer">Practise Questions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
