import React, {useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import './RecipeForm.css';
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UpdateRecipe = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedRecipe, setLoadedRecipe] = useState();
    const recipeId = useParams().recipeId
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            title:{
                value: '', 
                isValid:false
            }, 
            ingrediants:{
                value:'', 
                isValid:false
            }, 
            directions:{
                value:'', 
                isValid:false
            }
        }, false    
    );

    useEffect(() => {
        const fetchRecipe = async () => {
            try{
                const responseData = await sendRequest(`http://localhost:5001/api/recipes/${recipeId}`);
                setLoadedRecipe(responseData.recipe)
                setFormData({
                    title:{
                        value: responseData.recipe.title, 
                        isValid:true
                    }, 
                    ingrediants:{
                        value:responseData.recipe.ingrediants, 
                        isValid:true
                    }, 
                    directions:{
                        value:responseData.recipe.directions, 
                        isValid:true
                    }
                }, true);
            }catch(err){}
        };
        fetchRecipe();
    }, [sendRequest, recipeId, setFormData]);

    const recipeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try{
            await sendRequest(
                `http://localhost:5001/api/recipes/${recipeId}`, 
                'PATCH', 
                JSON.stringify({
                    title:formState.inputs.title.value, 
                    image:"test",
                    directions:formState.inputs.directions.value, 
                    ingrediants:formState.inputs.ingrediants.value
                }),
                {'Content-Type': 'application/json' }
            );
            history.push('/')
        }catch(err){}
        
    }

    if(isLoading){
        return <LoadingSpinner/>
    }

    if(!loadedRecipe && !error){
        return <Card><h2 className="center">Recipe not found</h2></Card>
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {!isLoading && loadedRecipe && <form onSubmit={recipeUpdateSubmitHandler}>
                <Input id="title" element="input" type = "text" label = "Title" placeholder = "Recipe Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's title." onInput={inputHandler} value={loadedRecipe.title} valid={true}/>
                <Input id="ingrediants" element="textarea" label = "Ingrediants" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's ingrediants." onInput={inputHandler} value={loadedRecipe.ingrediants} valid={true}/>
                <Input id="directions" element="textarea" label = "Directions" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter the recipe's directions." onInput={inputHandler} value={loadedRecipe.directions} valid={true}/>
                <Button type="submit" disabled={!formState.isValid}>Update Recipe</Button>
            </form> }
        </React.Fragment>
          
    );
};

export default UpdateRecipe;