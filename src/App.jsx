import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/resume-parser-genAI" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
