using AutoMapper;
using EventMate_Data.Entities;

namespace EventMate_WebAPI.MappingModels
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LoginModel, User>();
        }
    }
}
