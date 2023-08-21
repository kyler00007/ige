import Home from './Components/Home';
import CustomItemContext from "./Components/ItemContex";


import './App.css';

function App() {
  return (
    <CustomItemContext>
    <div className="App">
        <Home/>
    </div>
    </CustomItemContext>
  );
}

export default App;
