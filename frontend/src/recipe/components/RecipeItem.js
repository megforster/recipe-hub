import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import RecipeImage from '../../shared/components/UIElements/RecipeImage';
import './RecipeItem.css';
import Card from '../../shared/components/UIElements/Card';
import {FaTrash} from "react-icons/fa"
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button'

const RecipeItem = props => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const openDeleteModalHandler = () => setShowDeleteModal(true);
    const clostDeleteModalHandler = () => setShowDeleteModal(false);
    return (
        <React.Fragment>
            <Modal show={showDeleteModal} onCancel={clostDeleteModalHandler} header="Delete Recipe" footer={<Button onClick={clostDeleteModalHandler}>Cancel</Button>}>
                <div>
                    <p>Are you sure you want to delete this recipe?</p>
                </div>
            </Modal>
            <li className="recipeItem">
                <Card>
                    <Link to={`/recipes/${props.id}`}>
                    
                        <div className='recipeItem__content'>
                            <Link>
                                <FaTrash className='delete-icon' onClick={openDeleteModalHandler}/>
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
        </React.Fragment>
    )
};

export default RecipeItem;