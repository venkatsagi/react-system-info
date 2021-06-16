// client/src/App.js

import React from "react";
import "./App.css";

function App() {
  const [cpuInfo, setCpuInfo] = React.useState(null);
  const [memoryInfo, setMemoryInfo] = React.useState(null);
  const [memory, setMemory] = React.useState(null);
  const [cpu, setCpu] = React.useState(null);


  React.useEffect(() => {
    fetch("/cpu")
      .then((res) => res.json())
      .then((data) => setCpuInfo(data));

      fetch("/memory")
      .then((res) => res.json())
      .then((data) => setMemoryInfo(data));

      fetch("/cpuUsage")
      .then((res) => res.json())
      .then((data) => setCpu(data));

      fetch("/memoryUsage")
      .then((res) => res.json())
      .then((data) => setMemory(data));
      
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>CPU Info</h1>
        <div style={{wordBreak: "break-all"}}>{JSON.stringify(cpuInfo).replace(',', ', ')}</div>
        <h1>Memory Info</h1>
        <div style={{wordBreak: "break-all"}}>{JSON.stringify(memoryInfo).replace(',', ', ')}</div>
        <h1>CPU Usage:</h1>
        <div> {JSON.stringify(cpu)}</div>
        <h1>Memory Usage:</h1>
        <div> {JSON.stringify(memory)}</div>
      </header>
    </div>
  );
}

export default App;