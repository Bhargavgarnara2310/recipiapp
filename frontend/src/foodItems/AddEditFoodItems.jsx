// Third Party Imports from Library
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

// Custom components Imports
import { URL } from "./RoutesRecipies";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

import './style.css'



// Rendered in Parent Component: FoodItemList
// Add and Edit component to add & edit data through form.

export const AddEditFoodItems = ({fid, setFid, foodItems, setFoodItems, isEditing, setIsEditing}) => {
    console.log("form rendered");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [haveData, setHaveData] = useState([])
    const { register, handleSubmit, reset, setValue, formState: { errors }, clearErrors } = useForm();

   
    // do action after submitting data in form put and psot the data in json file.
    const onSubmit = async ({ itemname, ing }) => {
        let ingridients = ing.split(',')

        if (fid !== null) {
            setIsSubmitting(true);

            await axios.put(`${URL.url}/${fid}`, { itemname, ingridients })
            Swal.fire({
                title: 'Updated',
                text: `Food Item Updated`,
                icon: 'success',
            })

            setIsSubmitting(false);

            setFoodItems(foodItems.map(item => {
                if (item.id === fid) {
                    item.itemname = itemname;
                    item.ingridients = ingridients;
                    return item;
                }
                return item;
            }))
            setFid(null)
            reset()

        } else {
            setIsSubmitting(true);
            let {data} = await axios.post(URL.url, { itemname, ingridients })
            Swal.fire({
                title: 'Added',
                text: `Food Item Added`,
                icon: 'success',
            })

            setIsSubmitting(false);

            setFoodItems([...foodItems, data])
            reset();
        }

    }

    // function to fetch data at time of edit and show data into form for edition.
    const getFoodData = async () => {
        console.log("get data called");
        let { data } = await axios.get(`${URL.url}/${fid}`)
        setHaveData(data)
        setValue("itemname", data.itemname);
        setValue("ing", (data.ingridients).join(','));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        setIsEditing(false)
    }

    useEffect(()=>{
        if (fid !== null) {
            console.log("called 74");
            getFoodData()
        }
    // eslint-disable-next-line
    },[fid])

    console.log(typeof(haveData) )
    return (
        <div className="container d-flex justify-content-center">
            {isSubmitting || isEditing ? <div id="cover-spin"></div> : ''}
            <div>
                <h2 className="text-center mt-5">{fid && Object.keys(haveData).length>0 ? "Edit Item" : "Add Item"}</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)} className="border border-dark rounded p-5 shadow-lg bg-body-tertiary rounded">
                    
                    <div className="mt-3">
                        <label htmlFor="itemname" className="form-label">Item Name:</label>
                        <input type="text" className="form-control" 
                        {...register("itemname", {required : "* Enter Recipie Name", 
                            minLength:{
                            value:3,
                            message: "Minimum 3 Characters required"
                            }, 
                            maxLength: {
                            value:15,
                            message: "Max 15 allowed"
                            }
                        } )}  />
                        <ErrorMessage errors={errors} name="itemname" 
                        render={({message}) => (
                            <span className="errorMessage" >{message}</span>
                        )}
                        />
                    </div>

                    <div className="mt-3">
                        <label htmlFor="ingridients" className="form-label">Ingredients:</label>
                        <input type="text" className="form-control"{...register("ing", {required : "* Enter Recipie Ingredients"})}  />
                        <ErrorMessage errors={errors} name="ing" 
                        render={({message}) => (
                            <span className="errorMessage">{message}</span>
                        )}  
                        />
                    </div>
                    <div id="Help" class="form-text mt-2">Example : Bread, Butter, Spices</div>
                            
                    {fid && Object.keys(haveData).length>0 ?
                        <input type="submit" className="btn btn-primary mt-3" value={isSubmitting ? "Wait..." : "Update Item"} disabled={isSubmitting} />
                    :   <input type="submit" className="btn btn-primary mt-3" value={isSubmitting ? "Wait..." : "Submit"} disabled={isSubmitting} />}
                        <button type="button" disabled={isSubmitting} className="btn btn-danger ms-3 mt-3" onClick={()=>{if(errors){clearErrors();} reset(); if(fid){setFid(null)} setHaveData({}) }}>Cancel</button>
                </form> 
            </div>
        </div>
    )
}
