import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import FormPage from "./components/FormPage/FormPage";
import PrintPage from "./components/PrintPage/PrintPage";
import ArchivePage from "./components/ArchivePage/ArchivePage";

const App = () => {
	return (
		<div className="App">
			<Switch>
				<Route path="/print" exact>
					<PrintPage />
				</Route>

				<Route path="/non_adh" exact>
					<FormPage adh={false} />
				</Route>

				<Route path="/archives" exact>
					<ArchivePage />
				</Route>

				<Route path="/adh_mip" exact>
					<FormPage adh />
				</Route>

				<Route path="/" exact>
					<LandingPage />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
