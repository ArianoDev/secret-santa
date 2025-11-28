import React from "react";

interface HeroProps {
  onOpenEnroll: () => void;
  onOpenRules: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenEnroll, onOpenRules }) => {
  return (
    <section className="mb-6 md:mb-8">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brickEmber via-flagRed to-brickEmber px-5 md:px-10 py-6 md:py-10 text-brightSnow shadow-xmas-soft">
        {/* Decor: piccoli fiocchi */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-6 h-24 w-24 rounded-full bg-brightSnow/15" />
          <div className="absolute right-10 top-10 h-4 w-4 rounded-full bg-brightSnow/15" />
          <div className="absolute right-24 bottom-6 h-2 w-2 rounded-full bg-brightSnow/20" />
          <div className="absolute right-16 bottom-10 h-2 w-2 rounded-full bg-brightSnow/30" />
          <div className="absolute left-10 bottom-6 h-4 w-4 rounded-full bg-brightSnow/20" />
          <div className="absolute left-16 bottom-3 h-2 w-2 rounded-full bg-brightSnow/30" />
          <div className="absolute left-24 bottom-12 h-4 w-4 rounded-full bg-brightSnow/30" />
          <div className="absolute left-1/2 bottom-1/2 h-8 w-8 rounded-full bg-brightSnow/20" />
          <div className="absolute left-64 bottom-40 h-4 w-4 rounded-full bg-brightSnow/30" />
          <div className="absolute left-52 bottom-45 h-4 w-4 rounded-full bg-brightSnow/30" />
          <div className="absolute right-10 top-6 h-4 w-4 rounded-full bg-brightSnow/20" />
          <div className="absolute right-16 top-3 h-2 w-2 rounded-full bg-brightSnow/30" />
          <div className="absolute right-24 top-16 h-4 w-4 rounded-full bg-brightSnow/30" />
        </div>

        <div className="relative mb-6 flex items-center justify-between text-xs md:text-sm">
          <span className="font-semibold tracking-[0.16em] uppercase">
            Drop it like it's hot!
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full bg-brightSnow px-3.5 py-1 text-[11px] md:text-xs font-semibold text-flagRed shadow-md shadow-brickEmber/40 hover:bg-brightSnow/90 transition-colors"
              onClick={onOpenRules}
            >
              Regolamento
            </button>
          </div>
        </div>

        {/* Contenuto principale */}
        <div className="relative grid gap-6 md:gap-10 md:grid-cols-[1.1fr,0.9fr] items-center">
          {/* Titolo grande + CTA */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl font-semibold leading-none tracking-tight">
              <span className="block">Secret Santa 2025</span>
              <span className="block mt-1 md:mt-2">Rhi Edition</span>
            </h1>

            <p className="max-w-md text-xs md:text-sm text-brightSnow/90">
              Iscriviti, Crea il tuo Secret Santa e goditi la festa.
            </p>
            <p className="max-w-md text-xs md:text-sm text-brightSnow/90">
              Se pensi che sia l&apos;occasione giusta per riciclare le mutande di flanella che ti ha fatto tua zia l&apos;anno scorso, sei nel posto sbagliato.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                className="rounded-full bg-brightSnow px-5 py-2 text-sm font-semibold text-flagRed shadow-lg shadow-brickEmber/50 hover:bg-brightSnow/95 transition-colors"
                onClick={onOpenEnroll}
              >
                Unisciti alla magia del natale
              </button>
              <span className="text-[11px] md:text-xs text-brightSnow/80">
                ✨ Nessuna renna verrà maltrattata per organizzare questo evento ✨
              </span>
            </div>
          </div>

          {/* “Illustrazione” di Babbo Natale stilizzata */}
          <div className="relative">
            <div className="mx-auto flex h-52 w-52 md:h-64 md:w-64 items-center justify-center rounded-full bg-brightSnow shadow-2xl shadow-brickEmber/70">
              <div className="flex h-40 w-40 md:h-48 md:w-48 items-center justify-center rounded-full bg-gradient-to-b from-brickEmber/10 via-brickEmber/5 to-brightSnow">
                <svg
                  height="118"
                  width="118"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlSpace="preserve"
                  fill="#000000"
                  className="h-28 w-28 md:h-32 md:w-32 drop-shadow-lg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <polygon
                        fill="#FDC794"
                        points="97.102,344.276 423.722,344.276 423.722,158.897 97.102,158.897 "
                      ></polygon>
                      <path
                        fill="#E6E7E8"
                        d="M450.205,247.172c-26.138,0-48.446-16.26-57.468-39.194c2.71,24.814,9.366,49.161,18.432,72.96 c1.704,4.484,2.657,9.251,2.728,14.195c0.362,25.582-24.497,47.819-54.961,49.081c-21.248,0.883-40.113-7.857-50.997-21.469 c-10.549-13.197-27.101-22.043-46.036-22.528c-1.951-0.053-3.919-0.079-5.906-0.079s-3.955,0.026-5.906,0.079 c-18.935,0.486-35.487,9.331-46.036,22.528c-10.884,13.612-29.749,22.351-50.997,21.469c-30.464-1.262-55.322-23.499-54.961-49.081 c0.071-4.943,1.024-9.71,2.728-14.195c9.905-25.988,17.178-52.604,19.279-79.81l-53.822,9.834 C56.53,249.3,20.637,418.763,131.679,476.69c0,0,7.53-10.902,7.53-26.483c0,0,7.53,61.793,115.968,61.793 s116.957-61.793,116.957-61.793c0,15.581,8.519,26.483,8.519,26.483c89.185-46.521,83.244-164.961,72.333-229.659 C452.059,247.075,451.141,247.172,450.205,247.172"
                      ></path>
                      <path
                        fill="#FDC794"
                        d="M356.172,379.586c-55.367,47.078-144.975,47.078-200.351,0c55.375,0,100.175-16.728,100.175-26.483 C255.996,362.858,300.805,379.586,356.172,379.586"
                      ></path>
                      <path
                        fill="#D14A41"
                        d="M255.998,388.414c19.588,0,36.74-5.65,46.654-14.142c-28.019-5.729-46.654-14.883-46.654-21.169 c0,6.285-18.635,15.439-46.654,21.169C219.258,382.764,236.41,388.414,255.998,388.414"
                      ></path>
                      <path
                        fill="#BDC2C6"
                        d="M255.886,476.69h-0.371c-18.397-0.115-34.666-8.572-42.47-22.069 c-2.436-4.22-0.998-9.613,3.222-12.059c4.22-2.454,9.622-0.997,12.058,3.231c4.687,8.095,15.139,13.171,27.295,13.241 c12.111-0.159,23.164-5.041,28.098-13.339c2.498-4.193,7.892-5.57,12.103-3.072c4.193,2.489,5.561,7.901,3.072,12.094 C290.826,468.295,274.371,476.69,255.886,476.69"
                      ></path>
                      <g>
                        <path
                          fill="#FDC794"
                          d="M64.813,216.993c-6.1-3.16-12.932-5.129-20.295-5.129c-24.585,0-44.518,19.756-44.518,44.138 c0,24.373,19.933,44.138,44.518,44.138c3.046,0,5.959-0.477,8.81-1.103C54.82,264.194,60.841,233.774,64.813,216.993"
                        ></path>
                        <path
                          fill="#FDC794"
                          d="M498.246,224.207c-10.787,13.33-27.004,22.016-45.286,22.828 c2.525,14.989,4.785,32.759,5.658,51.995c2.869,0.627,5.791,1.112,8.854,1.112c24.594,0,44.526-19.765,44.526-44.138 C511.999,243.486,506.694,232.24,498.246,224.207"
                        ></path>
                      </g>
                      <path
                        fill="#A6352B"
                        d="M388.412,185.379c0-26.774,17.055-49.505,40.872-58.086l-61.334-11.211 c-74.019-13.524-149.884-13.524-223.903,0l-88.841,16.243c-11.502,2.101-19.897,12.588-19.897,24.85v29.449 c0,15.66,13.436,27.542,28.125,24.858l87.905-16.066c69.199-12.65,140.12-12.65,209.32,0l29.784,5.447 C389.162,195.902,388.412,190.738,388.412,185.379"
                      ></path>
                      <path
                        fill="#BE3A2B"
                        d="M450.205,123.586c5.835,0,11.467,0.865,16.817,2.375C458.627,89.662,386.973,0,264.826,0 C149.626,0,93.2,103.583,81.715,127.479l62.332-11.396c74.019-13.524,149.884-13.524,223.903,0l61.334,11.211 C435.825,124.937,442.852,123.586,450.205,123.586"
                      ></path>
                      <path
                        fill="#A6352B"
                        d="M450.205,132.409c-2.339,0-4.679-0.927-6.409-2.754c-0.477-0.503-48.313-50.211-108.35-50.211 c-4.873,0-8.828-3.946-8.828-8.828c0-4.873,3.955-8.828,8.828-8.828c67.761,0,119.022,53.46,121.176,55.737 c3.346,3.54,3.187,9.119-0.353,12.473C454.566,131.606,452.386,132.409,450.205,132.409"
                      ></path>
                      <g>
                        <path
                          fill="#F9A671"
                          d="M282.481,264.828c0,9.754-11.855,35.31-26.483,35.31c-14.627,0-26.483-25.556-26.483-35.31 c0-9.746,11.855-17.655,26.483-17.655C270.626,247.172,282.481,255.082,282.481,264.828"
                        ></path>
                        <path
                          fill="#F9A671"
                          d="M194.205,256c-4.873,0-8.828-3.955-8.828-8.828c0-4.705-6.188-8.828-13.241-8.828 s-13.241,4.122-13.241,8.828c0,4.873-3.955,8.828-8.828,8.828c-4.873,0-8.828-3.955-8.828-8.828 c0-14.601,13.859-26.483,30.897-26.483s30.897,11.882,30.897,26.483C203.033,252.045,199.078,256,194.205,256"
                        ></path>
                        <path
                          fill="#F9A671"
                          d="M361.929,256c-4.873,0-8.828-3.955-8.828-8.828c0-4.705-6.188-8.828-13.241-8.828 c-7.053,0-13.241,4.122-13.241,8.828c0,4.873-3.955,8.828-8.828,8.828c-4.873,0-8.828-3.955-8.828-8.828 c0-14.601,13.859-26.483,30.897-26.483c17.037,0,30.897,11.882,30.897,26.483C370.757,252.045,366.802,256,361.929,256"
                        ></path>
                      </g>
                      <path
                        fill="#D46F67"
                        d="M511.998,185.379c0,34.127-27.666,61.793-61.793,61.793s-61.793-27.666-61.793-61.793 s27.666-61.793,61.793-61.793S511.998,151.252,511.998,185.379"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;