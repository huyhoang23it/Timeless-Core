using EventMate.Data;
using EventMate_Common.Status;
using Eventmate_Data.IRepositories;
using EventMate_Data.Entities;
using Microsoft.EntityFrameworkCore;
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

        //public Task<bool> ChangeGroupStatusAsync(Guid groupId, GroupStatus newStatus)
        //{
            
        //}

        //public Task DeleteGroupAsync(Guid groupId)
        //{

        //}

        public async Task<IEnumerable<Groups>> GetAllGroupsAsync()
        {
            return await _context.Groups!.ToListAsync();
        }

        //public Task<Groups?> GetGroupByIdAsync(Guid groupId)
        //{

        //}

        //public Task<IEnumerable<Groups>> GetGroupsByStatusAsync(GroupStatus status)
        //{

        //}
    }
}
