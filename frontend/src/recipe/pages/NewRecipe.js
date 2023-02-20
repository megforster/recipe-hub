import React from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import './RecipeForm.css';
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from '../../shared/components/FormElements/Button';
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const NewRecipe = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
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

    const history = useHistory();

    const recipeSubmitHandler = async event => {
        event.preventDefault();
        try{
            await sendRequest('http://localhost:5001/api/recipes', 'POST', 
                JSON.stringify({
                    title: formState.inputs.title.value, 
                    ingrediants: formState.inputs.ingrediants.value,
                    directions: formState.inputs.directions.value, 
                    image:"test"
                }), 
                {'Content-Type': 'application/json' }
            ); 
            history.push('/');
        }catch(err){} 
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear = {clearError}/>
            {isLoading && <LoadingSpinner asOverlay/>}
            <form className="recipe-form" onSubmit={recipeSubmitHandler}>
                <div className="form__content">
                    <Input id="title" element="input" type = "text" label = "Title" placeholder = "Recipe Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's title." onInput={inputHandler}/>
                    <Input id="ingrediants" element="textarea" label = "Ingrediants" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's ingrediants." onInput={inputHandler}/>
                    <Input id="directions" element="textarea" label = "Directions" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's directions." onInput={inputHandler}/>
                    <Button type="submit" disabled={!formState.isValid}>Add Recipe</Button>
                </div>
            </form>
        </React.Fragment>
    )
};

export default NewRecipe;