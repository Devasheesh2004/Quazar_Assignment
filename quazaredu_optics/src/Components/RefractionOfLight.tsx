import { useState, type Dispatch, type SetStateAction } from "react";

type Props = {
  setvisible: Dispatch<SetStateAction<boolean>>;
};

export default function RefractionOfLight({ setvisible }: Props) {
  const [incidentDeg, setIncidentDeg] = useState<number>(30);
  const [n2, setN2] = useState<number>(1.5);

  // Canvas and ray constants
  const width = 900;
  const height = 420;
  const centerX = width / 2;
  const centerY = height / 2;
  const Linc = 220;
  const Lrefr = 220;
  const n1 = 1.0; // Refractive index of the first medium (air)

  // Physics calculations based on Snell's Law
  const rad = (incidentDeg * Math.PI) / 180;
  const sinTheta2 = (n1 / n2) * Math.sin(rad);
  const totalInternalReflection = Math.abs(sinTheta2) > 1;
  const theta2 = totalInternalReflection
    ? 0
    : Math.asin(Math.max(-1, Math.min(1, sinTheta2)));
  const theta2deg = (theta2 * 180) / Math.PI;

  // Calculate coordinates for the incident and refracted rays
  const dxInc = Math.sin(rad);
  const dyInc = Math.cos(rad);
  const dxRefr = Math.sin(theta2);
  const dyRefr = Math.cos(theta2);

  const incStartX = centerX - dxInc * Linc;
  const incStartY = centerY - dyInc * Linc;
  const meetX = centerX;
  const meetY = centerY;
  const refrEndX = centerX + dxRefr * Lrefr;
  const refrEndY = centerY + dyRefr * Lrefr;

  // Calculate angles and positions for the SVG angle arcs and labels
  const incidentArcRadius = 34;
  const refractedArcRadius = 42;
  const incArcStartAngle = 360 - incidentDeg;
  const incArcEndAngle = 360;
  const incLabelAngle = 360 - incidentDeg / 2;
  const incLabel = polarToCartesian(
    meetX,
    meetY,
    incidentArcRadius + 16,
    incLabelAngle
  );

  const refrArcStartAngle = 180;
  const refrArcEndAngle = 180 - theta2deg;
  const refrLabelAngle = 180 - theta2deg / 2;
  const refrLabel = polarToCartesian(
    meetX,
    meetY,
    refractedArcRadius + 20,
    refrLabelAngle
  );

  return (
    <div className="w-full h-full flex flex-col items-center p-4 md:p-6 text-white font-sans bg-black">
      <div className="w-full md:w-3/4 flex items-center justify-between px-4">
        <h2 className="text-3xl md:text-4xl mb-8 mt-6 text-center text-white flex-1">
          Refraction of Light
        </h2>
        <button
          className="hover:cursor-pointer"
          onClick={() => setvisible(true)}
        >
          <svg
            className="w-[35px] h-[35px]"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="w-11/12 md:w-auto md:max-w-3/4 bg-gray-900 p-4 md:p-10 rounded-2xl">
        <div className="mb-6 bg-gray-800 w-full rounded-lg p-4 leading-relaxed">
          <p>
            <span className="font-semibold">Refraction</span> is the bending of
            light when it passes from one medium to another with a different
            refractive index. The amount of bending depends on the angle of
            incidence and the ratio of the refractive indices of the two media.
          </p>
          <p className="mt-2">
            According to <span className="italic">Snell&apos;s Law</span>,{" "}
            <code>n₁ sin θ₁ = n₂ sin θ₂</code>, where:
          </p>
          <ul className="list-disc list-inside mt-1">
            <li>
              <b>n₁</b> is the refractive index of the first medium (air, usually
              ≈ 1.0)
            </li>
            <li>
              <b>θ₁</b> is the incident angle (with respect to the normal)
            </li>
            <li>
              <b>n₂</b> is the refractive index of the second medium
            </li>
            <li>
              <b>θ₂</b> is the refracted angle
            </li>
          </ul>
          <p className="mt-2">
            If the incident angle exceeds a certain critical value while light is
            traveling from a denser medium to a rarer medium, the ray does not
            refract but instead reflects entirely within the medium. This
            phenomenon is called
            <span className="font-semibold"> Total Internal Reflection</span>.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <div>
              <label className="block text-lg mb-1">Incident angle (°)</label>
              <input
                type="range"
                min={0}
                max={80}
                value={incidentDeg}
                onChange={(e) => setIncidentDeg(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm mt-1">{incidentDeg.toFixed(0)}°</div>
            </div>
            <div>
              <label className="block text-lg mb-1">
                Refractive index of lower medium (n₂)
              </label>
              <input
                type="range"
                min={1}
                max={2.5}
                step={0.01}
                value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-md mt-1">n₂ = {n2.toFixed(2)}</div>
            </div>
            <div className="opacity-80 text-md">
              <p>
                Snell&apos;s law: n₁ sin(θ₁) = n₂ sin(θ₂). Upper medium: n₁ = 1.00
                (air).
              </p>
              {totalInternalReflection ? (
                <p className="mt-1 text-amber-300">
                  Total internal reflection occurs (no refracted ray).
                </p>
              ) : (
                <p className="mt-1">Refracted angle θ₂ = {theta2deg.toFixed(1)}°</p>
              )}
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto bg-gradient-to-b from-transparent to-black/20 rounded-md border border-white/10 shadow-inner"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* SVG definitions for arrowheads */}
              <defs>
                <marker
                  id="incidentArrow"
                  viewBox="0 -5 10 10"
                  refX="9"
                  refY="0"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto"
                  fill="#ffd166"
                >
                  <path d="M0,-5L10,0L0,5" />
                </marker>
                <marker
                  id="refractedArrow"
                  viewBox="0 -5 10 10"
                  refX="9"
                  refY="0"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto"
                  fill="#8be9a9"
                >
                  <path d="M0,-5L10,0L0,5" />
                </marker>
              </defs>

              {/* Interface between the two media */}
              <line
                x1={0}
                y1={centerY}
                x2={width}
                y2={centerY}
                stroke="#77ddff"
                strokeWidth={3}
                strokeDasharray="6 6"
                opacity={0.6}
              />
              <text x={10} y={centerY - 10} fontSize={14} fill="#9fb8c8">
                n₁ = {n1.toFixed(2)} (air)
              </text>
              <text x={10} y={centerY + 24} fontSize={14} fill="#9fb8c8">
                n₂ = {n2.toFixed(2)}
              </text>

              {/* Incident and Refracted Ray Lines */}
              <line
                x1={incStartX}
                y1={incStartY}
                x2={meetX}
                y2={meetY}
                stroke="#ffd166"
                strokeWidth={3}
                strokeLinecap="round"
                markerEnd="url(#incidentArrow)"
              />
              {!totalInternalReflection && (
                <line
                  x1={meetX}
                  y1={meetY}
                  x2={refrEndX}
                  y2={refrEndY}
                  stroke="#8be9a9"
                  strokeWidth={3}
                  strokeLinecap="round"
                  markerEnd="url(#refractedArrow)"
                />
              )}
              
              {/* Normal line */}
              <line
                x1={meetX}
                y1={meetY - 140}
                x2={meetX}
                y2={meetY + 140}
                stroke="#ffffff33"
                strokeWidth={1}
              />

              {/* Angle arcs and labels */}
              <path
                d={describeArc(
                  meetX,
                  meetY,
                  incidentArcRadius,
                  incArcStartAngle,
                  incArcEndAngle,
                  1
                )}
                fill="none"
                stroke="#ffd166"
                strokeWidth={2}
              />
              <text
                x={incLabel.x}
                y={incLabel.y}
                fontSize={12}
                fill="#ffd166"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                θ₁ {incidentDeg.toFixed(0)}°
              </text>
              {!totalInternalReflection && (
                <>
                  <path
                    d={describeArc(
                      meetX,
                      meetY,
                      refractedArcRadius,
                      refrArcStartAngle,
                      refrArcEndAngle,
                      0
                    )}
                    fill="none"
                    stroke="#8be9a9"
                    strokeWidth={2}
                  />
                  <text
                    x={refrLabel.x}
                    y={refrLabel.y}
                    fontSize={12}
                    fill="#8be9a9"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    θ₂ {theta2deg.toFixed(1)}°
                  </text>
                </>
              )}
              <circle cx={meetX} cy={meetY} r={3} fill="#fff" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to describe an SVG arc path
function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  sweepFlag: 0 | 1 = 0
): string {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";

  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`,
  ].join(" ");
}

// Helper function to convert polar coordinates (angle, radius) to Cartesian (x,y)
function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}