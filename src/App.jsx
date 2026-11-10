import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';

// Every address shows the same page; Layout scrolls to the entry the address names
// (e.g. /ualbany), and unknown addresses open at the top.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
