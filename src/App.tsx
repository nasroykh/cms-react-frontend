import React from 'react';
import './App.css';
import {
	Switch,
	Route
  } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import FormPage from './components/FormPage/FormPage';
import PrintPage from './components/PrintPage/PrintPage';

const App = () => {
  return (
	<div className="App">
		<Switch>

			<Route path="/print">
				<PrintPage />
			</Route>

			<Route path="/non_adh">
				<FormPage adh={false}/>
			</Route>

			<Route path="/adh_mip">
				<FormPage adh/>
			</Route>

			<Route path="/">
				<LandingPage/>
			</Route>
		</Switch>
	</div>
  );
}

export default App;