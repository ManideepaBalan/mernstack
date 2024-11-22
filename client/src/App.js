import './App.css';
import Header from './components/Header/Header.tsx'
import About from './components/About/About.tsx'
import Projects from './components/Projects/Projects.tsx'
import Contact from './components/Contact/Contact.tsx'
import Dashboard from './pages/Dashboard.tsx'
import UserProfile from './pages/UserProfile.tsx'
import EditProject from './pages/EditProject.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/editProjects/:projectId" element={<EditProject />} />
          <Route path="/addProject" element={<EditProject />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />

        </Routes>
    </Router>
      {/* <Header />
      <About />
      <Projects />
      <Contact /> */}
    </div>
  );
}

export default App;

//import React from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

