using HotPotProject.Models.DTO;

namespace HotPotProject.Interfaces
{
    public interface ITokenServices
    {
        public Task<string> GenerateToken(LoginUserDTO user);
    }
}
