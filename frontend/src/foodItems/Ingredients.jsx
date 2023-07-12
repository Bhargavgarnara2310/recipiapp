// Imports from react library
import { useEffect, useState } from "react";

// Third Party Imports from Library
import axios from "axios";

// Custom imports
import { URL } from "./RoutesRecipies";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// Rendered in parent component FoodDetails
// Component to return list of Ingredients used for recipie from comma sepereted value to list.
export const Ingredients = ({ deleteFoodItem, foodItem, deleteData }) => {
  console.log("ingredients rendered");
  const [changedData, setChange] = useState("");
  const [editId, setEditId] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to save the data and update into json file
  async function saveData({ index, item }) {
    foodItem.ingridients[index] = item;
    let updatedData = foodItem.ingridients;

    let { status } = await axios.patch(`${URL.url}/${foodItem.id}`, {
      id: index,
      ingridients: updatedData,
    });

    if (status === 200) {
      setEditId("");
      Swal.fire({
        title: "Updated",
        text: `Ingredient Updated`,
        icon: "success",
      });
    }
  }

  function editIngrediant(id, value) {
    reset();
    setEditId(id);
    setChange(value);
  }
  // console.log((foodItem.ingridients).length);
  useEffect(() => {
    if (foodItem.ingridients.length === 0) {
      console.log("called");
      deleteFoodItem();
    }
    // eslint-disable-next-line
  }, [foodItem.ingridients.length]);

  return (
    <>
      {foodItem.ingridients.map((ing, index) => {
        return editId !== index ? (
          <div className="m-3" key={index}>
            {ing}
            <div style={{ float: "right" }}>
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => editIngrediant(index, ing)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteData(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div key={index}>
            <div>
              <form action="" onSubmit={handleSubmit(saveData)}>
                <input type="hidden" {...register("index")} value={index} />
                {console.log(changedData)}
                <input
                  type="text"
                  defaultValue={changedData}
                  {...register("item", {
                    required: "* Ingridient Can't be Empty !",
                  })}
                  
                  className="ms-2"
                  style={{
                    width: "66%",
                    border: "1px solid gray",
                    borderRadius: "7px",
                    padding: "4px 10px",
                    marginTop: "5px",
                  }}
                />
                <div className="d-block mt-1">
                    <input
                      type="submit"
                      className="btn btn-sm btn-secondary ms-2"
                      value="Save"
                    />
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => setEditId("")}
                    >
                      Cancel
                    </button>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="item"
                  render={({ message }) => (
                    <span className="errorMessage ms-3">{message}</span>
                  )}
                />
              </form>
            </div>
          </div>
        );
      })}
    </>
  );
};
