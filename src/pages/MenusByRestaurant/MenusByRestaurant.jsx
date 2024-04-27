import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MenusByRestaurant.css";
const MenusByRestaurant = () => {
  const { restaurantId } = useParams();
  const [menus, setMenusByRestaurant] = useState([]);
  const [newMenu, setNewMenuByRestaurant] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    cuisine: "",
    cookingTime: "",
    tasteInfo: "",
    itemImage: "",
    nutritionId: "",
    restaurantId: "",
  });
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const fetchMenusByRestaurant = async () => {
      console.log("restaurantId " + restaurantId);
      try {
        const response = await axios.get(
          `https://localhost:7157/api/Customer/GetMenuByRestaurant?restaurantId=${restaurantId}`
        );
        setMenusByRestaurant(response.data);
      } catch (error) {
        console.error("Error while fetching menus", error);
      }
    };

    if (restaurantId) {
      setNewMenuByRestaurant((prevState) => ({ ...prevState, restaurantId }));
      fetchMenusByRestaurant();
    } else {
      console.error("Restaurant ID is missing in URL parameters");
    }
  }, [restaurantId]);

  const handleDeleteMenuByRestaurant = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7157/api/Restaurant/DeleteMenuItem?menuId=${id}`
      );
      fetchMenusByRestaurant();
    } catch (error) {
      console.error("Error while Deleting Menus ", error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMenuByRestaurant({ ...newMenu, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7157/api/Restaurant/AddMenuItem",
        newMenu
      );
      console.log("New menu added:", response.data);
      fetchMenusByRestaurant();
      resetForm();
    } catch (error) {
      console.error("Error while adding new menu:", error);
    }
  };
  const resetForm = () => {
    setNewMenuByRestaurant({
      name: "",
      type: "",
      price: "",
      description: "",
      cuisine: "",
      cookingTime: "",
      tasteInfo: "",
      itemImage: "",
      nutritionId: "",
      restaurantId: restaurantId,
    });
    setShowForm(false);
  };
  return (
    <div className="container">
      <h2>Manage Menus</h2>
      <button onClick={() => setShowForm(true)}>Add Menu Item</button>
      {showForm && (
        <div>
          <h2>Add New Menu</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newMenu.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={newMenu.type}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={newMenu.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={newMenu.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Cuisine:</label>
              <input
                type="text"
                name="cuisine"
                value={newMenu.cuisine}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>CookingTime:</label>
              <input
                type="text"
                name="cookingTime"
                value={newMenu.cookingTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>TasteInfo:</label>
              <input
                type="text"
                name="tasteInfo"
                value={newMenu.tasteInfo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>ItemImage:</label>
              <input
                type="text"
                name="itemImage"
                value={newMenu.itemImage}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>NutritionId:</label>
              <input
                type="text"
                name="nutritionId"
                value={newMenu.nutritionId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>RestaurantId:</label>
              <input
                type="text"
                name="restaurantId"
                value={newMenu.restaurantId}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Add Menu</button>
          </form>
        </div>
      )}
      <h2>Menus</h2>
      <table>
        <thead>
          <tr>
            <th>MenuId</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Description</th>
            <th>Cuisine</th>
            <th>CookingTime</th>
            <th>TasteInfo</th>
            <th>ItemImage</th>
            <th>NutritionId</th>
            <th>RestaurantId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.menuId}>
              <td>{menu.menuId}</td>
              <td>{menu.name}</td>
              <td>{menu.type}</td>
              <td>{menu.price}</td>
              <td>{menu.description}</td>
              <td>{menu.cuisine}</td>
              <td>{menu.cookingTime}</td>
              <td>{menu.tasteInfo}</td>
              <td>{menu.itemImage}</td>
              <td>{menu.nutritionId}</td>
              <td>{menu.restaurantId}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteMenuByRestaurant(menu.menuId)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MenusByRestaurant;
