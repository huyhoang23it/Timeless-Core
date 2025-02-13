using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eventmate_Data.IRepositories
{
    public interface IUserRepository
    {
        public Task<Guid?> GetRoleIdbyName(string roleName);
    }
}
