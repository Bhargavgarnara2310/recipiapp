// Imports from react library
import { useEffect, useState } from "react"

// Third Party Imports from Library
import axios from "axios";

// Custom components Imports
import { AddEditFoodItems } from "./AddEditFoodItems";
import { FoodDetails } from "./FoodDetails";
import { URL } from "./RoutesRecipies";

// Parent component: RoutesRecipies
// Its main page to show the list of items.
const FoodItemsList = () => {
    console.log("list rendered");
    const [foodItems, setFoodItems] = useState([]);
    const [editId, setEditId] = useState(null);

    // Function to fetch data from json server
    const fetchData = async () => {
        try {
            let { data } = await axios.get(URL.url);
                setFoodItems(data)
        } catch (error) {
            console.log(error);
            setFoodItems("Server Down")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    function editFoodItemData(fid) {
        console.log("id",fid);
        setEditId(fid)
    }

    return (
        <div>
            <AddEditFoodItems fid={editId} setFid={setEditId} foodItems={foodItems} setFoodItems={setFoodItems}/>
            {foodItems === 'Server Down'? 
             <h2 className="fs-16 text-center mt-3">Sorry...Server Is Down!!!</h2>
            :
            <>
            {foodItems.length > 0 ?
                <div className="d-flex flex-wrap justify-content-center mt-4">
                    {foodItems.map(item => (<FoodDetails foodItem={item} key={item.id} editFoodItemData={editFoodItemData} foodItems={foodItems} setFoodItems={setFoodItems}/>))}
                </div>

                : <h2 className="fs-16 text-center mt-3">No Items Availible Right now...Add some Dishes first!!!</h2>}
              </>}  
        </div>
    )
}
export default FoodItemsList