import React from 'react';

//import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Router, Route, browserHistory } from 'react-router-3';

import Main from './componentes/Main';
import TramitesGeneral from './componentes/TramitesGeneral';

function App() {
  return (
    <Router history={browserHistory} className="container-fluid">
      <Route path="/"  exact component={Main}></Route>
      <Route path="/allTramites" className="py-4" exact component={TramitesGeneral}></Route>
    </Router>
  );
}

export default App;
