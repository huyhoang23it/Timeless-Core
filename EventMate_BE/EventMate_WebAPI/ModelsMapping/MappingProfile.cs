using AutoMapper;
using EventMate_Data.Entities;

namespace EventMate_WebAPI.ModelsMapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LoginModel, User>();
            CreateMap<SignUpModel, User>();
        }
    }
}