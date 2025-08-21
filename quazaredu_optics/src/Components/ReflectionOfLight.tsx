import React, { useState, type Dispatch, type SetStateAction } from "react";

type slidesprop = {
    setvisible: Dispatch<SetStateAction<boolean>>;
}

const ReflectionOfLight: React.FC<slidesprop> = ({setvisible}) => {
  const [angle, setAngle] = useState<number>(30);

  const width: number = 600;
  const height: number = 500;
  const centerX: number = width / 2;
  const centerY: number = height / 2;

  const rad = (deg: number): number => (deg * Math.PI) / 180;

  const incidentX: number = centerX - 150 * Math.cos(rad(angle));
  const incidentY: number = centerY - 150 * Math.sin(rad(angle));

  const reflectedX: number = centerX + 150 * Math.cos(rad(angle));
  const reflectedY: number = centerY - 150 * Math.sin(rad(angle));

  function arrowHead(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    kind: string
  ) {
    const angleArrow = Math.atan2(y2 - y1, x2 - x1);
    const size = 8;
    const ax = x2 - size * Math.cos(angleArrow - Math.PI / 6);
    const ay = y2 - size * Math.sin(angleArrow - Math.PI / 6);
    const bx = x2 - size * Math.cos(angleArrow + Math.PI / 6);
    const by = y2 - size * Math.sin(angleArrow + Math.PI / 6);
    return (
      <g>
        <line
          x1={x2}
          y1={y2}
          x2={ax}
          y2={ay}
          className={`stroke-${kind}-500`}
          strokeWidth={2}
        />
        <line
          x1={x2}
          y1={y2}
          x2={bx}
          y2={by}
          className={`stroke-${kind}-500`}
          strokeWidth={2}
        />
      </g>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 md:p-0">
        <div className="w-full md:w-3/4 flex items-center justify-between px-4">
            <h2 className="text-3xl md:text-4xl mb-8 mt-6 text-center text-white flex-1">
              Reflection of Light (Plane Mirror)
            </h2>
            <button className="hover:cursor-pointer" onClick={()=>{setvisible(true)}}>
                <svg className="w-[35px] h-[35px]" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

      <div className="p-6 w-full md:max-w-3/4 h-auto mx-auto bg-gray-900 rounded-2xl shadow-lg">
        
        <p className="mb-4 text-gray-300 text-base md:text-lg">
          This interactive diagram demonstrates the <b>laws of reflection</b> in a <b>plane mirror</b>,
          as studied in CBSE Class 10 Physics. The light ray is incident on a mirror surface and
          reflects back in the same medium. The two laws are:
        </p>
        <ul className="list-disc list-inside mb-8 text-gray-300 text-base md:text-lg">
          <li>The angle of incidence equals the angle of reflection.</li>
          <li>The incident ray, the reflected ray, and the normal all lie in the same plane.</li>
        </ul>

        <div className="flex justify-center mb-8">
          <input
            type="range"
            min={10}
            max={80}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full max-w-xs accent-indigo-600"
          />
        </div>

        <div className="w-full flex items-center justify-center">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-3/4 h-auto border rounded bg-gray-800">
              <line
                x1={50}
                y1={centerY}
                x2={width - 50}
                y2={centerY}
                className="stroke-gray-700"
                strokeWidth={3}
              />

              <line
                x1={centerX}
                y1={centerY - 150}
                x2={centerX}
                y2={centerY + 150}
                strokeDasharray="6,6"
                className="stroke-red-400"
                strokeWidth={2}
              />

              <line
                x1={incidentX}
                y1={incidentY}
                x2={centerX}
                y2={centerY}
                className="stroke-blue-500"
                strokeWidth={3}
              />
              {arrowHead(incidentX, incidentY, centerX, centerY, "blue")}

              <line
                x1={centerX}
                y1={centerY}
                x2={reflectedX}
                y2={reflectedY}
                className="stroke-green-500"
                strokeWidth={3}
              />
              {arrowHead(centerX, centerY, reflectedX, reflectedY, "green")}

              <circle cx={centerX} cy={centerY} r={5} className="fill-yellow-400" />

              <text
                x={centerX - 120}
                y={centerY + 40}
                className="fill-gray-300 text-sm"
              >
                ∠i: {angle}°
              </text>
              <text
                x={centerX + 60}
                y={centerY + 40}
                className="fill-gray-300 text-sm"
              >
                ∠r: {angle}°
              </text>
            </svg>
        </div>
        
        <p className="mt-6 text-gray-300 text-base md:text-lg">
          The reflection shown here occurs in the <b>same medium</b> (air) from a <b>plane mirror</b>.
          The <b>angle of incidence</b> and <b>angle of reflection</b> are always equal, satisfying
          the first law of reflection. Both rays and the normal lie in the same plane, satisfying
          the second law of reflection.
        </p>

        <div className="mt-4 p-3 bg-indigo-900 rounded">
          <p className="text-md text-indigo-200">
            💡 Formula: <b>∠i = ∠r</b> (Angle of Incidence = Angle of Reflection)
          </p>
        </div>

        <div className="mt-2 p-3 bg-indigo-900 rounded">
          <p className="text-md text-indigo-200">
            💡 Did you know? When light reflects from a plane mirror, the image formed is
            <b> virtual, erect, and of the same size</b> as the object, and it appears behind
            the mirror.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReflectionOfLight;