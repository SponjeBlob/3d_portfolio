import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { Home, About, Projects, Contact } from './pages';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <main className="bg-slate-300/2 min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} /> {/* Landing page */}

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router> 
    </main>
  )
}

export default App
