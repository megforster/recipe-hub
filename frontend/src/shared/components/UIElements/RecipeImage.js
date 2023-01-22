import React from 'react';

import './RecipeImage.css';

const RecipeImage = props => {
  return (
    <div className={`recipeImage ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default RecipeImage;