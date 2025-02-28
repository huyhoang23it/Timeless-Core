using AutoMapper;
using EventMate_Common.Common;
using EventMate_Common.Constants;
using EventMate_Common.Status;
using EventMate_Common.Type;
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
            try
            {
                var groups = await _groupService.GetAllGroupsAsync();
                return Ok(new ApiResponse<IEnumerable<Groups>>(200, ResponseKeys.FetchGroupSuccess, groups));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupById(Guid id)
        {
            try
            {
                var groupEntity = await _groupService.GetGroupsByIdAsync(id);

                if (groupEntity == null)
                {
                    return NotFound(new ApiResponse<string>(404, ResponseKeys.NotFound, "Không tìm thấy group."));
                }

                return Ok(new ApiResponse<Groups>(200, ResponseKeys.LoginSuccess, groupEntity));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
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
                    TotalMember=groupCreateModel.TotalMember,
                    Visibility=groupCreateModel.Visibility,
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            try
            {
                var groupEntity = await _groupService.GetGroupsByIdAsync(id); // Changed service to _groupService  
                if (groupEntity == null)
                {
                    return NotFound(new ApiResponse<string>(404, ResponseKeys.NotFound, "Không tìm thấy nhóm cần xóa.")); // Updated message  
                }

                await _groupService.DeleteGroupAsync(id); // Changed method to DeleteGroupAsync  
                return Ok(new ApiResponse<string>(200, ResponseKeys.GroupDeleted, "Nhóm đã được xóa thành công.")); // Updated response message  
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }
        [HttpPut("change-status/{groupId}")]
        public async Task<IActionResult> ChangeGroupStatus(Guid groupId, [FromBody] GroupStatus newStatus)
        {
            try
            {
                var groupEntity = await _groupService.GetGroupsByIdAsync(groupId); // Changed from event to group  
                if (groupEntity == null)
                {
                    return NotFound(new ApiResponse<string>(404, ResponseKeys.NotFound, "Không tìm thấy nhóm cần cập nhật.")); // Updated message  
                }

                var success = await _groupService.ChangeGroupStatusAsync(groupId, newStatus); // Changed service method  
                if (!success)
                {
                    return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, "Không thể cập nhật trạng thái nhóm.")); // Updated error message  
                }

                return Ok(new ApiResponse<string>(200, ResponseKeys.GroupUpdated, "Trạng thái nhóm đã được cập nhật thành công.")); // Updated response message and key  
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }
        [HttpPost("add-user-to-group/{groupId}/{userId}")]
        public async Task<IActionResult> AddUserToGroup(Guid groupId, Guid userId)
        {
            if (groupId == Guid.Empty || userId == Guid.Empty)
            {
                return BadRequest("Group ID and User ID are required.");
            }

            try
            {
                var success = await _groupService.AddUserToGroupAsync(userId, groupId);
                if (!success)
                {
                    return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, "Không thể thêm người dùng vào nhóm."));
                }

                return Ok(new ApiResponse<string>(200, ResponseKeys.UserAddedToGroup, "Người dùng đã được thêm vào nhóm thành công."));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }
        [HttpPost("add-conversation-to-group/{groupId}")]
        public async Task<IActionResult> AddConversationToGroup(Guid groupId, [FromBody] string conversationName)
        {
            if (groupId == Guid.Empty || string.IsNullOrWhiteSpace(conversationName))
            {
                return BadRequest("Group ID, Conversation ID, and Conversation Name are required.");
            }

            var conversation = new Conversations
            {
                Id = new Guid(), // Assign the conversation ID (if applicable)  
                Name = conversationName,
                GroupId = groupId,
                Type = ConversationType.Group, // Adjust based on your application logic  
                CreatedAt = DateTime.UtcNow,
                Status = ConversationStatus.In_Progress // Set default status or modify as needed  
            };

            try
            {
                var success = await _groupService.AddConversationToGroupAsync(conversation);
                if (!success)
                {
                    return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, "Không thể thêm cuộc trò chuyện vào nhóm."));
                }

                return Ok(new ApiResponse<string>(200, ResponseKeys.ConversationAddedToGroup, "Cuộc trò chuyện đã được thêm vào nhóm thành công."));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }
        [HttpGet("list-users-in-group/{groupId}")]
        public async Task<IActionResult> ListUsersInGroup(Guid groupId)
        {
            if (groupId == Guid.Empty)
            {
                return BadRequest("Group ID is required.");
            }

            try
            {
                var users = await _groupService.ListUsersInGroupAsync(groupId);

                if (users == null || !users.Any())
                {
                    return NotFound(new ApiResponse<string>(404, ResponseKeys.NoUsersFound, "Không tìm thấy người dùng trong nhóm."));
                }

                return Ok(new ApiResponse<List<User>>(200, ResponseKeys.UsersRetrieved, users));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }
    }
}
