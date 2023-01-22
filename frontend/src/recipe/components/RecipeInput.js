import React from "react";
import Input from "../../shared/components/FormElements/Input";
import './RecipeInput.css';

const RecipeForm = props => {
    return(
        <form className="recipe-form" onSubmit={props.onSubmit?props.onSubmit:event=>event.preventDefault()}>
            <div className="form__content">
                <Input element="input" type = "text" label = "Title" placeholder = "Recipe Title"/>
                <Input element="textarea" type = "text" label = "Ingrediants"/>
                <Input element="textarea" type = "text" label = "Directions"/>
            </div>
        </form>
    )
};

export default RecipeForm;