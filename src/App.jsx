import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ...

const App = () => {
  return (
    <main className="bg-slate-300/2 min-h-screen">
      <Router basename="/3d_portfolio">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
