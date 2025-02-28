using EventMate.Data;
using EventMate_Common.Status;
using Eventmate_Data.IRepositories;
using EventMate_Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eventmate_Data.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly DataContext _context;
        public GroupRepository(DataContext context)
        {
            _context = context;
        }
        public async Task AddGroupAsync(Groups groupEntity)
        {
            await _context.Groups!.AddAsync(groupEntity);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ChangeGroupStatusAsync(Guid groupId, GroupStatus newStatus)
        {
            var groupEntity = await _context.Groups!.FindAsync(groupId); // Changed from Events to Groups  
            if (groupEntity == null)
            {
                return false; // Return false if group is not found  
            }

            groupEntity.Status = newStatus; // Update the status  
            _context.Groups.Update(groupEntity); // Use the Groups DbSet  
            await _context.SaveChangesAsync(); // Save changes to the database  

            return true; // Return true indicating the operation was successful  
        }

        public async Task DeleteGroupAsync(Guid groupId)
        {
            var groupEntity = await _context.Groups!.FindAsync(groupId);
            if (groupEntity != null)
            {
                _context.Groups.Remove(groupEntity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Groups>> GetAllGroupsAsync()
        {
            return await _context.Groups!.ToListAsync();
        }

        public async Task<Groups?> GetGroupByIdAsync(Guid groupId)
        {
            var groupEntity = await _context.Groups!.FindAsync(groupId);
            return groupEntity;
        }
        public async Task<bool> AddUserToGroupAsync(User_Group userGroup)
        {
            await _context.User_Groups.AddAsync(userGroup);
            return await _context.SaveChangesAsync() > 0; // Returns true if at least one record was saved  
        }
        public async Task<bool> AddConversationToGroupAsync(Conversations conversation)
        {
            await _context.Conversations.AddAsync(conversation);
            return await _context.SaveChangesAsync() > 0; // Returns true if the conversation was saved  
        }
        public async Task<List<User>> ListUsersInGroupAsync(Guid groupId)
        {
            return await _context.User_Groups
                .Where(ug => ug.GroupId == groupId)
                .Select(ug => ug.User) // Assuming User_Group has a navigation property to User  
                .ToListAsync();
        }

        //public Task<IEnumerable<Groups>> GetGroupsByStatusAsync(GroupStatus status)
        //{

        //}
    }
}
