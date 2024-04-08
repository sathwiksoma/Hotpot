using HotPotProject.Models;

namespace HotPotProject.Interfaces
{
    public interface IRestaurantUserServices : IRestaurantOwnerServices
    {
        //public Task<List<Restaurant>> GetRestaurantsByCity(string city);
        //public Task<List<Menu>> GetMenuByRestaurant(int RestaurantId);
        //public Task<Restaurant> GetRestaurantByName(string name);
        public Task<List<RestaurantSpeciality>> GetAllSpecialities();
        Task<RestaurantSpeciality> AddRestaurantSpeciality(RestaurantSpeciality restaurantspeciality);
        public Task<List<CustomerReview>> GetCustomerReviews();
    }
}
