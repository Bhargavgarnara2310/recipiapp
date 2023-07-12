// Third Party Imports from Library
import axios from "axios";

// import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Custom components Imports
import { Ingredients } from "./Ingredients";
import { URL } from "./RoutesRecipies";

// Rendered in Parent component : FoodItemList
// Component will return card with details of food. 
export const FoodDetails = ({ foodItem, editFoodItemData, foodItems, setFoodItems }) => {

    // Function to take confirmation from user to delete whole card of data
    async function deleteFoodItemdata() {
        let result = await Swal.fire({
            title: 'Are you sure?',
            text: `${foodItem.itemname}'s data will be deleted`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        })

        if (result.isConfirmed) {
            deleteFoodItem();
            Swal.fire({
                title: 'Deleted',
                text: `${foodItem.itemname}'s data deleted`,
                icon: 'success',
            })
        }
    }
    
    // Function to delete whole card data.
    function deleteFoodItem() {
        // console.log('delete id',foodItem.id);
        axios.delete(`${URL.url}/${foodItem.id}`)
        setFoodItems(foodItems.filter(item => item.id !== foodItem.id))
    }

    // Function to delete perticuler Ingredient li from card
    async function deleteData(id) {
        console.log(id);
        let updateData = foodItem.ingridients.filter((item, index) => {
            return index !== id;
        })

        let { status } = await axios.patch(`${URL.url}/${foodItem.id}`, { id: id, ingridients: updateData });

        if (status === 200) {
            Swal.fire({
                title: 'Deleted',
                text: `Data deleted`,
                icon: 'success',
            })

            setFoodItems(foodItems.map(item => {
                if(item.id === foodItem.id){
                    item.ingridients=updateData;
                    return item;
                }
                return item;
            }))
        }
    }

    return (
        <div className="card m-3 py-4 " >
            <div className="d-flex justify-content-around align-items-center m-2" >

                <div className="m-3">Item Name:
                <h3 className="text-center text-uppercase text-danger text-decoration-underline">{foodItem.itemname}</h3></div>

                <div className="d-flex">

                    <div><button className="btn btn-secondary btn-sm m-2"
                        onClick={() => editFoodItemData(foodItem.id)}>Edit<br />Recipie</button></div>

                    <div><button className="btn btn-danger btn-sm m-2"
                        onClick={deleteFoodItemdata}>Delete<br />Recipie</button></div>

                </div>
            </div>

            <div className="px-4">
                <label htmlFor="">Ingredients: </label>
                <div>
                    <Ingredients foodItem={foodItem} deleteData={deleteData} deleteFoodItem={deleteFoodItem} />
                </div>
            </div>

        </div>
    )
}