using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UygulamaHavuzu.Application.Abstractions;
using UygulamaHavuzu.Domain.Entities;
using UygulamaHavuzu.Infrastructure.Services;
using UygulamaHavuzu.Persistence.Contexts;
using UygulamaHavuzu.Persistence.Models;

namespace UygulamaHavuzu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        
        private readonly IUserServices _userService;

        public UsersController(IUserServices userService)
        {
            _userService = userService;
        }

        //Tüm kullanıcıları getirir
        [HttpGet("getUsers")]
        public IActionResult GetUsers()
        {
            var users = _userService.GetUsers();
            return Ok(users);
        }

        //
        [HttpPost("registerUser")]
        public async Task<IActionResult> RegisterUser([FromBody] UserModel user)
        {

            ResponseModel responseModel = new ResponseModel();

            if (user == null)
            {
                return BadRequest("Kullanıcı bilgileri eksik.");
            }

            User newUser = new User
            {
                UserName =  user.userName,
                PasswordHash = user.password,
                UserEmail= user.email,

            };

            await _userService.AddUser(newUser);


            responseModel.responseCode = 200;
            responseModel.message = "Kullanıcı başarılı bir şekilde kaydedildi.";
            responseModel.detail = "";

            return Ok(responseModel);

        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {

            var user = _userService.AuthenticateUser(login.userName, login.password);

            if (user == null) 
            {
                return Unauthorized("Kullanıcı adı veya şifre hatalı.");
            }

            var tokenString = _userService.GenerateJSONWebToken(user);
            return Ok(new {token = tokenString});
        }
    }
}
