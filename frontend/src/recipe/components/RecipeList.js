import React from 'react';
import './RecipeList.css';
import RecipeItem from './RecipeItem';
import Card from '../../shared/components/UIElements/Card';

const RecipeList = props => {
    if(props.recipes.length === 0){
        return <div className='center'>
            <Card>
                <h2>No recipes found.</h2>
            </Card>
        </div>
    }

    return <ul className='recipeList'>
        {props.recipes.map(recipe => (
            <RecipeItem 
                key={recipe.id} 
                id={recipe.id} 
                image={recipe.image}
                title={recipe.title} 
                ingrediants = {recipe.ingrediants} 
                directions = {recipe.directions}
                onDelete = {props.onDeleteRecipe}
                />
        ))}
    </ul>;
};

export default RecipeList;