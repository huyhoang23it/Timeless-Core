using AutoMapper;
using EventMate_Data.Entities;
using EventMate_WebAPI.ModelsMapping.Event;
using EventMate_WebAPI.ModelsMapping.Authentication;
using EventMate_WebAPI.ModelsMapping.Authentication;

using EventMate_WebAPI.ModelsMapping.Event;

namespace EventMate_WebAPI.ModelsMapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LoginModel, User>();
            CreateMap<SignUpModel, User>();

            CreateMap<EventCreateModel, Events>();
       
            CreateMap<User, UserResponse>()  
                  .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.RoleName));
            CreateMap<LoginGoogleModel, User>();
            CreateMap<ResetPasswordModel, User>();
            CreateMap<VerifyOTPRequest, User>()
                  .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.CompanyName));
        }
    }
}