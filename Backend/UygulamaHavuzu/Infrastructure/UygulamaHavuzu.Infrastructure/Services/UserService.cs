using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UygulamaHavuzu.Application.Abstractions;
using UygulamaHavuzu.Domain.Entities;
using UygulamaHavuzu.Persistence.Contexts;
using UygulamaHavuzu.Persistence.Models;

namespace UygulamaHavuzu.Infrastructure.Services
{
    public class UserService : IUserServices
    {
        private readonly IConfiguration _configuration;

        private readonly UygulamaHavuzuDbContext _context;

        public UserService(UygulamaHavuzuDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList(); // Veritabanından kullanıcıları alıyoruz
        }

        public async Task AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }


        public User AuthenticateUser(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserName.ToLower() == username && x.PasswordHash == password);
            return user;
        }

        public string GenerateJSONWebToken(User userInfo)
        {
            try
            {
                // JWT key'i al ve boş olup olmadığını kontrol et
                var jwtKey = _configuration["Jwt:Key"];
                if (string.IsNullOrEmpty(jwtKey))
                {
                    throw new Exception("JWT anahtarı bulunamadı veya geçersiz.");
                }

                // Security Key oluşturuluyor
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                // Claims ekleniyor
                var claims = new[]
                {
            new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
            new Claim(JwtRegisteredClaimNames.Email, userInfo.UserEmail),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("userId", userInfo.Id.ToString())
        };

                // JWT Token oluşturuluyor
                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Issuer"],  // Audience da issuer ile aynı
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: credentials);

                // Token string olarak döndürülüyor
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                // Hata durumunda loglama yapılabilir veya farklı bir iş akışı kullanılabilir
                throw new Exception("JWT oluşturulurken hata oluştu: " + ex.Message);
            }
        }

    }
}
