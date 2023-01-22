import React from "react";
import RecipeImage from "../../shared/components/UIElements/RecipeImage";

import './FullRecipe.css';

const FullRecipe = props => {
   return(<React.Fragment>
        <RecipeImage image={props.image} alt={props.title} width={300}/>
        <h4 className="center">{props.title}</h4>
        <p>{props.ingrediants}</p>
        <p>{props.directions}</p>
    </React.Fragment>
   )
};

export default FullRecipe