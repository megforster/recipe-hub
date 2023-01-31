import React, {useCallback, useReducer} from "react";
import Input from "../../shared/components/FormElements/Input";
import './RecipeInput.css';
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from '../../shared/components/FormElements/Button';

const formReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGED':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(inputId===action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state, 
                inputs:{
                    ...state.inputs, 
                    [action.inputId]:{value:action.value, isValid:action.isValid}
                }, 
                isValid:formIsValid
            };
        default:
            return state;
    }
};

const RecipeForm = props => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
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
        }, 
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type:'INPUT_CHANGED', value:value, isValid: isValid, inputId: id})
    }, []);

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

export default RecipeForm;