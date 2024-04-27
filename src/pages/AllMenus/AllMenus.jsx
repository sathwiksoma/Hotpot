import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllMenus.css";

export default function AllMenus() {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({
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
    fetchAllMenus();
  }, []);

  const fetchAllMenus = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7157/api/Restaurant/GetAllMenus"
      );
      setMenus(response.data);
    } catch (error) {
      console.error("Error while fetching menus", error);
    }
  };
  const handleDeleteMenu = async (id) => {
    console.log("id " + id);
    try {
      const response = await axios.delete(
        `https://localhost:7157/api/Restaurant/DeleteMenuItem?menuId=${id}`
      );
      fetchAllMenus();
    } catch (error) {
      console.error("Error while Deleting Menus " + error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7157/api/Restaurant/AddMenuItem",
        newMenu
      );
      console.log("New menu added:", response.data);
      fetchAllMenus();
      resetForm();
    } catch (error) {
      console.error("Error while adding new menu:", error);
    }
  };

  const resetForm = () => {
    setNewMenu({
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
    setShowForm(false);
  };

  return (
    <>
      <div className="container">
        <h1>Manage Menu</h1>
        <button className="add-menu-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Menu Item"}
        </button>
        {showForm && (
          <div className="form">
            <div>
              <h2>Add New Menu</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="label-1">Name:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="name"
                    value={newMenu.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">Type:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="type"
                    value={newMenu.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">Price:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="price"
                    value={newMenu.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">Description:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="description"
                    value={newMenu.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">Cuisine:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="cuisine"
                    value={newMenu.cuisine}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">CookingTime:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="cookingTime"
                    value={newMenu.cookingTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">TasteInfo:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="tasteInfo"
                    value={newMenu.tasteInfo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">ItemImage:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="itemImage"
                    value={newMenu.itemImage}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">NutritionId:</label>
                  <input
                    className="input-1"
                    type="text"
                    name="nutritionId"
                    value={newMenu.nutritionId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="label-1">RestaurantId:</label>
                  <input
                    className="input-1"
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
          </div>
        )}
        <h2>All Menu</h2>
        <table className="table-left-menu">
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
                    onClick={() => handleDeleteMenu(menu.menuId)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
