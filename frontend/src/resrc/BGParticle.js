import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import NOTE1 from "./imgs/NOTE1-removebg-preview.png";
import NOTE2 from "./imgs/NOTE2-removebg-preview.png";
function BGParticle() {
  const particlesInit = async (main) => {
    console.log(main);

    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 40,
        interactivity: {
          detectsOn: "canvas",
          events: {
            resize: true,
          },
        },
        particles: {
          color: {
            value: "#000000",
          },
          move: {
            enable: true,
          },
          animation: {
            enable: true,
            speed: 40,
            sync: true,
          },

          number: {
            density: {
              enable: true,
              area: 1080,
            },
            limit: 0,
            value: 70,
          },

          shape: {
            type: "image",
            image: [
              {
                src: NOTE1,
              },
              {
                src: NOTE2,
              },
            ],
          },
          size: {
            random: {
              enable: true,
              minimumValue: 10,
            },
            value: 20,
          },
        },
      }}
    />
  );
}

export default BGParticle;
