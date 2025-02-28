using EventMate_Data.Entities;
using Eventmate_Data.IEventRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Eventmate_Data.IRepositories;
using EventMate_Data.Repositories;
using EventMate_Common.Status;

namespace EventMate_Service.Services
{
    public class GroupService
    {
        private readonly IGroupRepository _groupRepository;

        public GroupService(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;

        }
        public async Task<IEnumerable<Groups>> GetAllGroupsAsync()
        {
            
            return await _groupRepository.GetAllGroupsAsync();     
        }
        public async Task AddGroupAsync(Groups groupEntity)
        {            
            await _groupRepository.AddGroupAsync(groupEntity);
        }
        public async Task DeleteGroupAsync(Guid id)
        {
            await _groupRepository.DeleteGroupAsync(id);
        }
        public async Task<Groups> GetGroupsByIdAsync(Guid eventId)
        {
            return await _groupRepository.GetGroupByIdAsync(eventId);
        }
        public async Task<bool> ChangeGroupStatusAsync(Guid groupId, GroupStatus newStatus)
        {
            return await _groupRepository.ChangeGroupStatusAsync(groupId, newStatus);
        }
        public async Task<bool> AddUserToGroupAsync(Guid userId, Guid groupId)
        {
            var userGroup = new User_Group
            {
                UsergroupId = Guid.NewGuid(), // Generate a new ID  
                UserId = userId,
                GroupId = groupId
            };

            return await _groupRepository.AddUserToGroupAsync(userGroup);
        }
        public async Task<bool> AddConversationToGroupAsync(Conversations conversation)
        {
            // Assuming the conversation is already set up with necessary properties  
            return await _groupRepository.AddConversationToGroupAsync(conversation);
        }
        public async Task<List<User>> ListUsersInGroupAsync(Guid groupId)
        {
            return await _groupRepository.ListUsersInGroupAsync(groupId);
        }

    }

}
