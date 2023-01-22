import React from 'react';
import {Link} from 'react-router-dom'
import RecipeImage from '../../shared/components/UIElements/RecipeImage';
import './RecipeItem.css';
import Card from '../../shared/components/UIElements/Card';
import {FaTrash} from "react-icons/fa"

const RecipeItem = props => {
    return (
        <li className="recipeItem">
            <Card>
                <Link to={`/recipes/${props.id}`}>
                
                    <div className='recipeItem__content'>
                        <Link to={'/recipes/search'}>
                            <FaTrash className='delete-icon'/>
                        </Link>
                        <div className='recipeItem__image'>
                            <RecipeImage image={props.image} alt={props.title} width={75}/>
                        </div>
                        <div className='recipeItem__info'>
                            <h1>{props.title}</h1>
                            <h4>{props.ingrediants}</h4>
                        </div>
                    </div>
                </Link>
            </Card>
        </li>
    )
};

export default RecipeItem;