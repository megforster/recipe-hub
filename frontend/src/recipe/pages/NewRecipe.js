import React from "react";
import Input from "../../shared/components/FormElements/Input";
import './RecipeForm.css';
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from '../../shared/components/FormElements/Button';
import { useForm } from "../../shared/hooks/form-hook";

const NewRecipe = () => {
    const [formState, inputHandler] = useForm({
        title: {
            value:'', 
            isValid: false
        }, 
        ingrediants: {
            value:'', 
            isValid: false
        }, 
        directions: {
            value:'', 
            isValid: false
        }
    }, false)

    const recipeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); //To-Do: Send to backend
    }

    return(
        <form className="recipe-form" onSubmit={recipeSubmitHandler}>
            <div className="form__content">
                <Input id="title" element="input" type = "text" label = "Title" placeholder = "Recipe Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's title." onInput={inputHandler}/>
                <Input id="ingrediants" element="textarea" label = "Ingrediants" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's ingrediants." onInput={inputHandler}/>
                <Input id="directions" element="textarea" label = "Directions" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's directions." onInput={inputHandler}/>
                <Button type="submit" disabled={!formState.isValid}>Add Recipe</Button>
            </div>
        </form>
    )
};

export default NewRecipe;