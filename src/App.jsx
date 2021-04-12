import React,{useState} from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import FormPage from "./components/FormPage/FormPage";
import PrintPage from "./components/PrintPage/PrintPage";
import AnalysePrint from "./components/AnalysePrint/AnalysePrint";
import ArchivePage from "./components/ArchivePage/ArchivePage";
import ParaAnalyse from "./components/ParaAnalyse/ParaAnalyse";
import SituationPrint from "./components/SituationPrint/SituationPrint";

const App = () => {

	const [anl, setAnl] = useState([
        {id: 'fns', title:'FORMULE NUMIRIQUE SANGUINE (FNS)', price_adh: 240, price_nonadh: 340},
        {id: 'vds', title:'VITESSE DE SEDIMENTATION  (VS)', price_adh: 60, price_nonadh: 90},
        {id: 'grp', title:'GROUPAGE', price_adh: 180, price_nonadh: 210},
        {id: 'gaj', title:'GLYCEMIE A JEU ', price_adh: 60, price_nonadh: 90},
        {id: 'gpp', title:'GLYCEMIE POSTE-PRANDIALE', price_adh: 60, price_nonadh: 90},
        {id: 'ure', title:'UREE ', price_adh: 60, price_nonadh: 90},
        {id: 'hgl', title:'HEMOGLOBINE GLYCOLYSEE', price_adh: 520, price_nonadh: 750},
        {id: 'cre', title:'CREATININE ', price_adh: 60, price_nonadh: 90},    
        {id: 'cho', title:'CHOLESTEROL TOTAL', price_adh: 60, price_nonadh: 90},    
        {id: 'hdc', title:'HDL CHOLESTEROL', price_adh: 40, price_nonadh: 60},    
        {id: 'idc', title:'IDL CHOLESTEROL', price_adh: 40, price_nonadh: 60},    
        {id: 'trg', title:'TRIGLYCERIDE', price_adh: 90, price_nonadh: 130},    
        {id: 'tgo', title:'TGO', price_adh: 120, price_nonadh: 170},    
        {id: 'tgp', title:'TGP', price_adh: 120, price_nonadh: 170},    
        {id: 'bdc', title:'BILIRUBINE DIRECT/CONJUGUE', price_adh: 60, price_nonadh: 90},    
        {id: 'bic', title:'BILIRUBINE INDIRECTE/NON CONJUGUE', price_adh: 60, price_nonadh: 90},    
        {id: 'aur', title:'ACIDE URIQUE ', price_adh: 60, price_nonadh: 90},    
        {id: 'pha', title:'PHOSPHATASE ALCALINE', price_adh: 150, price_nonadh: 210},    
        {id: 'cal', title:'CALCIUM', price_adh: 60, price_nonadh: 90},    
        {id: 'pho', title:'PHOSPHORE', price_adh: 60, price_nonadh: 90},    
        {id: 'tdp', title:'TAUX DE PROTHTROMBINE (TP)', price_adh: 120, price_nonadh: 170},    
        {id: 'cdu', title:'CHIMIE DES URINES', price_adh: 60, price_nonadh: 90},    
        {id: 'lat', title:'LATEX', price_adh: 150, price_nonadh: 210},    
        {id: 'waa', title:'WAALER', price_adh: 150, price_nonadh: 210},    
        {id: 'hbs', title:'ANTIGENE HBS HEPATITE B', price_adh: 600, price_nonadh: 860},    
        {id: 'hiv', title:'ANTIGENE HIV HEPATITE', price_adh: 600, price_nonadh: 860},    
        {id: 'hcv', title:'ANTIGENE HCV HEPATITE C', price_adh: 600, price_nonadh: 860},    
        {id: 'tox', title:'TOXOPLASMOSE igG', price_adh: 700, price_nonadh: 980},    
        {id: 'rub', title:'RUBEOLE igm', price_adh: 700, price_nonadh: 980},    
        {id: 'crp', title:'CRP', price_adh: 150, price_nonadh: 210},    
        {id: 'asl', title:'ASLO', price_adh: 150, price_nonadh: 210},    
        {id: 'hba', title:'HBA1C', price_adh: 520, price_nonadh: 750},    
        {id: 'tsh', title:'TSH', price_adh: 500, price_nonadh: 730},    
        {id: 'ft3', title:'FT3', price_adh: 500, price_nonadh: 730},    
        {id: 'ft4', title:'FT4', price_adh: 500, price_nonadh: 730},    
        {id: 'atp', title:'ANTI TPO', price_adh: 740, price_nonadh: 1050},    
        {id: 'atg', title:'ANTI TG', price_adh: 740, price_nonadh: 1050},    
        {id: 'psa', title:'PSA T', price_adh: 730, price_nonadh: 1050},    
        {id: 'fer', title:'FERTINIMIE', price_adh: 690, price_nonadh: 980},    
        {id: 'vit', title:'VITAMINE D', price_adh: 2500, price_nonadh: 2500},    
        {id: 'tck', title:'TCK', price_adh: 120, price_nonadh: 170},    
        {id: 'tph', title:'TPHA', price_adh: 430, price_nonadh: 170},    
    ]);

	return (
		<div className="App">
			<Switch>
                
                <Route path="/situation" exact>
					<SituationPrint/>
				</Route>

                <Route path="/paraprint" exact>
					<ParaAnalyse anl={anl} />
				</Route>

				<Route path="/anprint" exact>
					<AnalysePrint anl={anl} />
				</Route>
				
				<Route path="/print" exact>
					<PrintPage anl={anl}/>
				</Route>

				<Route path="/non_adh" exact>
					<FormPage adh={false} anl={anl} setAnl={setAnl} />
				</Route>

				<Route path="/archives" exact>
					<ArchivePage />
				</Route>

				<Route path="/adh_mip" exact>
					<FormPage adh anl={anl} setAnl={setAnl} />
				</Route>

				<Route path="/">
					<LandingPage />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
