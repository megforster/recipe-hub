import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import RecipeImage from '../../shared/components/UIElements/RecipeImage';
import './RecipeItem.css';
import Card from '../../shared/components/UIElements/Card';
import {FaTrash, FaPencilAlt} from "react-icons/fa"
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button'
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const RecipeItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const openDeleteModalHandler = () => setShowDeleteModal(true);
    const cancelDeleteHandler = () => setShowDeleteModal(false);
    const confirmDeleteHandler = async () => {
        setShowDeleteModal(false);
        try{
            await sendRequest(
                `http://localhost:5001/api/recipes/${props.id}`, 
                'DELETE'
            );
            props.onDelete(props.id);
        }catch(err){}
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} clearError={clearError}/>
            <Modal show={showDeleteModal} onCancel={cancelDeleteHandler} header="Delete Recipe" footer={<div><Button onClick={cancelDeleteHandler}>Cancel</Button><Button onClick={confirmDeleteHandler}>Delete</Button></div>}>
                <div>
                    <p>Are you sure you want to delete this recipe?</p>
                </div>
            </Modal>
            <li className="recipeItem">
                <Card>
                {isLoading && <LoadingSpinner asOverlay/>}
                    <Link to={`/recipes/${props.id}`}>
                        <div className='recipeItem__content'>
                            <div className='recipeItem__image'>
                                <RecipeImage image={props.image} alt={props.title} width={75}/>
                            </div>
                            <div className='recipeItem__info'>
                                <h1>{props.title}</h1>
                                <h4>{props.ingrediants}</h4>
                            </div>
                        </div>
                    </Link>
                    <div className='recipe-icons'>
                        <Button delete={true} onClick={openDeleteModalHandler}>
                            <FaTrash/>
                        </Button>
                        <Button edit={true} to={`/recipes/edit/${props.id}`}>
                            <FaPencilAlt/>
                        </Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
};

export default RecipeItem;