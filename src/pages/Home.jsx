import { useState, Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../Components/Loader';

import Island from '../models/Island';
import Sky from '../models/Sky';
import Spaceship from '../models/Spaceship';
import HomeInfo from '../Components/HomeInfo';

import space from '../assets/space.mp3'
import { soundoff, soundon } from '../assets/icons';
import rocket from '../assets/rocket.mp3'


const Home = () => {
  const audioRef = useRef(new Audio(space));
  audioRef.current.volume= 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(3);
  const [loaded, setLoaded] = useState(false); // track if models are loaded
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic])

  const rocketRef = useRef(new Audio(rocket));
  rocketRef.current.loop = true;
  rocketRef.current.volume = 0.01;

  useEffect(() => {
    if (isRotating) {
      rocketRef.current.play();
    } else {
      rocketRef.current.pause();
      rocketRef.current.currentTime = 0;
    }

    return () => {
      rocketRef.current.pause();
    };
  }, [isRotating]);



  const adjustIslandForScreenSize = () => {
    let scale = window.innerWidth < 768 ? [0.9, 0.9, 0.9] : [1, 1, 1];
    let position = [0, -2, 1.1];
    let rotation = [0.18, 7.3, 0];
    return [scale, position, rotation];
  };

  const adjustSpaceshipForScreenSize = () => {
    let scale = window.innerWidth < 768 ? [0.105, 0.105, 0.105] : [0.12, 0.12, 0.12];
    let position = window.innerWidth < 768 ? [0.03, -0.27, 4.33] : [0.04, -0.29, 4.33];
    return [scale, position];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [spaceshipScale, spaceshipPosition] = adjustSpaceshipForScreenSize();

  // Called when models are loaded
  const handleLoaded = () => setLoaded(true);

  return (
    <section className="w-full h-screen relative font-roboto">

      {/* Only render the popup after everything is loaded */}
      {loaded && currentStage && (
        <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
          <HomeInfo currentStage={currentStage} />
        </div>
      )}

      <Canvas 
        className={`w-full h-screen bg-[#0b0b1a] ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>


          {/* Pass handleLoaded to one or more models so loaded flips true */}
          <Sky isRotating={isRotating} onUpdate={handleLoaded} />
          <Spaceship 
            isRotating={isRotating}
            position={spaceshipPosition}   
            scale={spaceshipScale}         
            rotation={[0.25, 1.5, 0]}
            onUpdate={handleLoaded}
          />
          <Island 
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            onUpdate={handleLoaded}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-10 left-10">
        <img 
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};

export default Home;
