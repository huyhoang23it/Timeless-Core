using EventMate_Data.Entities;
using Eventmate_Data.IEventRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Eventmate_Data.IRepositories;
using EventMate_Data.Repositories;

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
    }

}
