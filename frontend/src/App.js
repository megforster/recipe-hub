import React from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import AllRecipes from './recipe/pages/AllRecipes';
import NewRecipe from './recipe/pages/NewRecipe';
import SearchRecipes from './recipe/pages/SearchRecipes';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Recipe from './recipe/pages/Recipe';

const App = () => {
  return <Router>
    <MainNavigation/>
    <main>
      <Switch>
        <Route path="/" exact>
          <AllRecipes/>
        </Route>
        <Route path="/recipes/new" exact>
          <NewRecipe/>
        </Route>
        <Route path="/recipes/search" exact>
          <SearchRecipes/>
        </Route>
        <Route path="/recipes/:recipeId">
          <Recipe/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </main>
  </Router>
  
};

export default App;