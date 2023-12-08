import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header/Header';
import Driver from './components/Drivers/Driver';
import MarkerList from './components/Markers/MarkerList';
import { useEffect } from 'react';
import { fetchMarkers } from './redux/markers/markerSlice';
import Marker from './components/Markers/Marker';

function App() {
  useEffect(() => {
    store.dispatch(fetchMarkers())
  }, [store])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/markers' element={<MarkerList />} />
          <Route path='/marker/:id' element={<Marker />} />
          <Route path='/driver' element={<Driver />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
