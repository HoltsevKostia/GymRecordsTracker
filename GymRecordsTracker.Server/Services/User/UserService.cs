using AutoMapper;
using GymProgressTracker.Server.Models.Domain;
using GymProgressTracker.Server.Models.DTO.User;
using GymProgressTracker.Server.Repositories.User;
using GymRecordsTracker.Server.Models.DTO.User;
using System.Security.Cryptography;
using System.Text;

namespace GymProgressTracker.Server.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly TokenGenerator _tokenGenerator;
        public UserService(IUserRepository userRepository, IMapper mapper, TokenGenerator tokenGenerator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            await _userRepository.DeleteAsync(user);
            return true;
        }

        public async Task<UserDTO?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user == null ? null : _mapper.Map<UserDTO>(user);
        }

        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        public async Task<(string Token, UserDTO User)?> LoginAsync(LoginUserDTO loginUserDTO)
        {
            var user = await _userRepository.GetByEmailAndPassword(loginUserDTO.Email, HashPassword(loginUserDTO.Password));

            if (user == null)
            {
                return null;
            }

            var token = _tokenGenerator.GenerateJwtToken(user);
            var userDTO = _mapper.Map<UserDTO>(user);
            return (token, userDTO);
        }

        public async Task<(string Token, UserDTO User)?> RegisterAsync(AddUserDTO userDTO)
        {
            var isEmailTaken = await _userRepository.IsEmailTaken(userDTO.Email);
            if (isEmailTaken)
            {
                return null;
            }
            var isUsernameTaken = await _userRepository.IsUsernameTaken(userDTO.Username);
            if (isUsernameTaken)
            {
                return null;
            }

            var user = _mapper.Map<Models.Domain.User>(userDTO);
            user.Password = HashPassword(userDTO.Password);

            await _userRepository.AddAsync(user);

            var token = _tokenGenerator.GenerateJwtToken(user);
            var userDTOResult = _mapper.Map<UserDTO>(user);

            return (token, userDTOResult);
        }

        public async Task<bool> UpdateEmailAsync(UpdateUserDTO updateUserDTO)
        {
            return await _userRepository.UpdateEmailAsync(updateUserDTO.Id, updateUserDTO.Email);
        }       
    }
}
