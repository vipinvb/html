import Listmedicine from "./components/Listmedicine";
import Navbar from "./components/Navbar";




function App() {
  return (
    <div>
      
      <div className="App">
        <Navbar></Navbar>
        <div>
          <Listmedicine/>
        </div>
      </div>
    </div>
  );
}

export default App;
