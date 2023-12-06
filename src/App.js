import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header/Header';
import Marker from './components/Markers/Marker';
import Driver from './components/Drivers/Driver';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/marker' element={<Marker />} />
          <Route path='/driver' element={<Driver />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
