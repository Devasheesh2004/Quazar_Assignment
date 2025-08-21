import { useState } from "react";
import Slides from "./Components/Slides";

function App() {
  // State to control whether we are on the "main screen" or "slides screen"
  const [visible, setvisible] = useState(true);

  // If visible = false → show the Slides component instead of the main dashboard
  if (!visible) {
    return <Slides visible={visible} setvisible={setvisible} />;
  }

  // Main home screen layout
  return (
    <div className="bg-gray-900 min-h-screen w-full flex flex-col">
      {/* Navigation bar with logo, user info, and Sign Out button */}
      <nav className="Navbar w-full p-4 md:p-6 md:py-3 mx-auto flex items-center justify-center bg-gray-800">
        {/* Responsive width for the navbar content */}
        <div className="flex items-center justify-between w-full md:w-5/6 lg:w-2/3">
          <div className="Logo text-xl font-bold text-indigo-600 dark:text-indigo-300">
            Quazar
          </div>
          <div className="User flex items-center text-gray-300 gap-3 md:gap-5">
            {/* Hide name on very small screens */}
            <div className="text-center text-sm hidden sm:block">
              Devasheesh Upreti
            </div>
            <button className="text-center border-gray-700 border p-2 px-3 md:px-4 rounded-md hover:bg-gray-700 transition ease-in-out duration-300 hover:cursor-pointer text-sm md:text-base">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Section */}
      {/* Centering and padding adjusted for different screen sizes */}
      <div className="main w-full py-10 md:py-20 h-full flex justify-center">
        {/* Responsive width and padding for the main content area */}
        <div className="w-full px-4 sm:px-6 md:w-5/6 lg:w-2/3">
          {/* Subject Card → "Optics" */}
          {/* Card width and height are now responsive */}
          <div className="Optics min-h-[200px] w-full max-w-[380px] md:w-[350px] border-gray-700 border rounded-xl bg-gray-800 text-white flex flex-col p-5 gap-4">
            <h1 className="text-white text-lg font-semibold">Optics</h1>
            <p className="text-sm text-gray-400 line-clamp-3">
              Reflection of Light, Refraction of Light, Human Eye and Defects
              of Vision, Dispersion of Light, Atmospheric Refraction, and
              Scattering of Light.
            </p>

            {/* Action Buttons */}
            {/* Flex container for buttons to wrap on smaller screens if needed */}
            <div className="border-t border-gray-600 flex flex-wrap gap-2 items-center pt-4 mt-auto">
              {/* This button hides main screen and opens Slides */}
              <button
                className="bg-indigo-700 w-auto p-2 px-3 rounded-md hover:cursor-pointer text-sm"
                onClick={() => {
                  setvisible(false);
                }}
              >
                View Content
              </button>
              <button className="bg-indigo-700 w-auto p-2 px-3 rounded-md hover:cursor-pointer text-sm">
                Practise Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;