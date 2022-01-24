/** @format */
import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <Header />
      <Feed />
    </div>
    </RecoilRoot>
  );
}

export default App;
