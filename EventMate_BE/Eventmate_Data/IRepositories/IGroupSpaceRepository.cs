using EventMate_Common.Status;
using EventMate_Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eventmate_Data.IRepositories
{
    public interface IGroupSpaceRepository
    {
        Task<IEnumerable<Groups>> GetAllGroupsAsync();
        Task<IEnumerable<Groups>> GetGroupsByStatusAsync(GroupStatus status);

        Task<Groups?> GetGroupByIdAsync(Guid groupId);
        Task AddGroupAsync(Groups groupEntity);
        Task DeleteGroupAsync(Guid groupId);
        Task<bool> ChangeGroupStatusAsync(Guid groupId, GroupStatus newStatus);
    }
}
