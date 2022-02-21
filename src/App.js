import Footer from "./components/Footer";
import Header from "./components/Header";
import MainTable from "./components/MainTable";
import Hero from "./components/Hero";
import "./index.css"
import { Routes, Route} from "react-router-dom";
import CoinDetail from "./components/CoinDetail";




function App() {


  return (
    <div className="App">
    <Header/>
    <Hero/>
    <Routes>
      <Route path="/Cryptocurrency_tracker_app" element={<MainTable/>}/>
      <Route path="/coinInfo" element={<CoinDetail/>}/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
