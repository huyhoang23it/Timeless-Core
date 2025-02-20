using AutoMapper;
using EventMate_Data.Entities;
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
       
        }
    }
}