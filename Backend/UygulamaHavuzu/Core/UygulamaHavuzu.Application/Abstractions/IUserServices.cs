using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UygulamaHavuzu.Domain.Entities;

namespace UygulamaHavuzu.Application.Abstractions
{
    public interface IUserServices
    {
        Task AddUser(User newUser);
        List<User> GetUsers();
        string GenerateJSONWebToken(User userInfo);
        User AuthenticateUser(string userName, string password);
    }
}
