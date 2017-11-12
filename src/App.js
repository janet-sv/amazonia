import React from 'react';
import Helmet from 'react-helmet';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Layout from 'components/Layout';
import Home from 'pages/Home';
import Complaints from 'pages/Complaints';
import Procedure from 'pages/Procedure';
import MapRegion from 'pages/MapRegion';
import FirstService from 'pages/FirstService';
import Login from 'pages/Login';
import Admin from 'pages/Admin';
import Detail from 'pages/Detail';
import './App.scssm';

const title = 'Salvavoz';

const App = () => (
  <Layout>
    <Helmet>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{title}</title>
    </Helmet>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route exact path="/denuncias/:status?" component={Complaints} />
      <Route exact path="/recepciones/:id" component={FirstService} />
      <Route exact path="/mapa-regiones" component={MapRegion} />
{/*      <Route path="/mi-perfil" component={Profile} />
      <Route path="/mis-tramites" component={Procedure} />
      <Route path="/expedicion-constancia-sufragio" component={FirstService} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/detail/:id" component={Detail} />*/}
      <Redirect to="/" />
    </Switch>
  </Layout>
);

export default App;
