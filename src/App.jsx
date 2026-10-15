import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import About from './pages/About.jsx';
import Research from './pages/Research.jsx';
import Experience from './pages/Experience.jsx';
import Education from './pages/Education.jsx';
import Skills from './pages/Skills.jsx';
import Contact from './pages/Contact.jsx';

// The home screen ("/") shows just the animation; every other address opens
// that section's panel over it. Unknown addresses open a "not found" panel.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={null} />
          <Route path="about" element={<About />} />
          <Route path="research" element={<Research />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="skills" element={<Skills />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
