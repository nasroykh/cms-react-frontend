import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import FormPage from './components/FormPage/FormPage';

const App = () => {
  return (
	<div className="App">
		{/* <LandingPage/> */}
		<FormPage/>
	</div>
  );
}

export default App;