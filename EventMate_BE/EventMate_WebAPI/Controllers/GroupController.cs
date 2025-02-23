using AutoMapper;
using EventMate_Common.Constants;
using EventMate_Common.Status;
using EventMate_Data.Entities;
using EventMate_Service.Services;
using EventMate_WebAPI.ModelsMapping.Event;
using EventMate_WebAPI.ModelsMapping.Group;
using Microsoft.AspNetCore.Mvc;

namespace EventMate_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : Controller
    {

        private readonly GroupService _groupService;
        private readonly AwsService _awsService;

        private readonly IMapper _mapper;
        public GroupController(GroupService groupService, IMapper mapper, AwsService awsService)
        {
            _groupService = groupService;
            _mapper = mapper;
            _awsService = awsService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllGroup()
        {
            var events = await _groupService.GetAllGroupsAsync();
            return Ok(events);
        }
        [HttpPost]
        public async Task<IActionResult> PostGroup(GroupCreateModel groupCreateModel)
        {
            try
            {
                await _awsService.addFile(groupCreateModel.Img, "amzn-eventmate-group");
                string s = string.Format(Constants.urlImg, "amzn-eventmate-group", groupCreateModel.Img.FileName);

                Groups groups = new Groups()
                {
                    GroupId=new Guid(),
                    GroupName= groupCreateModel.GroupName,
                    CreatedAt= DateTime.Now,
                    Description=groupCreateModel.Description,   
                    EventId=groupCreateModel.EventId,
                    Leader = groupCreateModel.Leader,
                    TotalMember=10,
                    Visibility=1,
                    Status = GroupStatus.Active,
                    Img=s
                };

                await _groupService.AddGroupAsync(groups);
                return Ok("link img: " + s);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
