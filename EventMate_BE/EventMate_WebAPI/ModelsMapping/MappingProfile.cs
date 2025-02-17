using AutoMapper;
using EventMate_Data.Entities;
using EventMate_WebAPI.ModelsMapping.Authentication;

namespace EventMate_WebAPI.ModelsMapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LoginModel, User>();
            CreateMap<SignUpModel, User>();
            CreateMap<User, UserResponse>()  
                  .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.RoleName));
            CreateMap<LoginGoogleModel, User>();
            CreateMap<ResetPasswordModel, User>();
        }
    }
}