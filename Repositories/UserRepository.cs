using HotPotProject.Context;
using HotPotProject.Interfaces;
using HotPotProject.Models;
using Microsoft.EntityFrameworkCore;

namespace HotPotProject.Repositories
{
    public class UserRepository: IRepository<int, string, User>
    {
        ApplicationTrackerContext _context;

        public UserRepository(ApplicationTrackerContext context)
        {
            _context = context;
        }

        public async Task<User> Add(User item)
        {
            _context.Add(item);
            _context.SaveChanges();
            return item;
        }

        public async Task<User> Delete(int key)
        {
            var user = await GetAsync(key);
            _context.Users.Remove(user);
            _context.SaveChanges();
            return user;
        }

        public Task<User> GetAsync(int key)
        {
            throw new NotImplementedException();
        }

        public async Task<List<User>> GetAsync()
        {
            var users = _context.Users.ToList();
            return users;
        }

        public async Task<User> GetAsync(string key)
        {
            var users = await GetAsync();
            var user = users.FirstOrDefault(u => u.UserName == key);
            return user;
        }

        public async Task<User> Update(User item)
        {
            var user = await GetAsync(item.UserName);
            _context.Entry<User>(item).State = EntityState.Modified;
            _context.SaveChanges();
            return item;
        }
    }
}
