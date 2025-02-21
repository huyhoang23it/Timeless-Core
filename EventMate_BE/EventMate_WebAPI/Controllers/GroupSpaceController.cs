using Microsoft.AspNetCore.Mvc;

namespace EventMate_WebAPI.Controllers
{
    public class GroupSpaceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
