import { Html } from '@react-three/drei';

const Loader = () => {
  return (
    <Html center>
      <div className="flex justify-center items-center">
        <div
          className="w-28 h-28 border-4 border-blue-500 border-opacity-25 border-t-blue-400 rounded-full animate-spin
                     shadow-[0_0_20px_rgba(0,198,255,0.6)]"
        />
      </div>
    </Html>
  );
};

export default Loader;
