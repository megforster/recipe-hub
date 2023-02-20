import React, {useEffect, useState} from 'react'
import RecipeList from '../components/RecipeList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const AllRecipes  = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedData, setLoadedData] = useState();

    useEffect(() => {
        const fetchRecipes = async () => {
            try{
                const responseData = await sendRequest('http://localhost:5001/api/recipes/all');
                setLoadedData(responseData.recipes);
            } catch (err) {}
        };
        fetchRecipes();
    }, [sendRequest]);

    const recipeDeletedHandlder = deletedRecipeId => {
        setLoadedData(prevRecipes => prevRecipes.filter(r=>r.id!==deletedRecipeId));
    };

    return (
        <React.Fragment>
        <ErrorModal error = {error} onClear = {clearError}/>
            {isLoading&&(<div className='center'>
                <LoadingSpinner/>
            </div>)}
            {!isLoading && loadedData && <RecipeList recipes={loadedData} onDeleteRecipe={recipeDeletedHandlder}/>}
        </React.Fragment>
    );
};

export default AllRecipes;