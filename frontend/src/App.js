import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { hostname, protol } from './utils/const';

function App() {

  useEffect(() => {
    console.log(window.location)
    fetch(`${protol}//${hostname}:5000/api/hello`)
      .then(data => {
        data.json()
          .then(json => {
            console.log(json);
          })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
