import { useState } from 'react';

import artstationImg from '../assets/images/artstation.png';
import itchImg from '../assets/images/itch.png';

const Projects = () => {
  const [bgImage, setBgImage] = useState(null);

  return (
    <section
      className="max-container py-24 flex flex-col items-center transition-all duration-500 h-[100vh]"
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="head-text mb-16">
        My <span className="blue-gradient_text">Projects</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-white-500">
        <p>
          Below, I’ve organized my work into two sections: 3D Art and Game Development. Each section highlights some of my favorite projects from over the years, reflecting my skills, creativity, and the progress I’ve made in both disciplines.
        </p>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-4xl">
        
        {/* 3D Art */}
        <a
          href="https://hugo_maza.artstation.com/"
          target="_blank"
          rel="noopener noreferrer"
          
          className="group bg-gray-900/80 backdrop-blur rounded-2xl p-10 shadow-xl hover:scale-105 transition-transform"
        >
          <img
            src={artstationImg}
            alt="3D Art"
            className="h-56 w-full object-cover rounded-xl mb-6"
          />

          <p className="text-gray-400 text-center">
            3D Art
          </p>
        </a>

        {/* Games */}
        <a
          href="https://hugo-maza.itch.io/"
          target="_blank"
          rel="noopener noreferrer"
         
          className="group bg-gray-900/80 backdrop-blur rounded-2xl p-10 shadow-xl hover:scale-105 transition-transform"
        >
          <img
            src={itchImg}
            alt="Games"
            className="h-56 w-full object-cover rounded-xl mb-6"
          />

          <p className="text-gray-400 text-center">
            Game Development
          </p>
        </a>
      </div>
    </section>
  );
};

export default Projects;
