using System;
using System.Linq;
using System.Web.Mvc;
using WebFood.Models;

namespace WebFood.Controllers
{
    public class UserController : Controller
    {
        WebFoodEntities1 db = new WebFoodEntities1();

        // GET: Register
        [HttpGet]
        public ActionResult Register() => View();

        // POST: Register
        [HttpPost]
        public ActionResult Register(Users model)
        {
            if (ModelState.IsValid)
            {
                model.CreatedAt = DateTime.Now;
                db.Users.Add(model);
                db.SaveChanges();
                return RedirectToAction("Login", "User");
            }
            return View(model);
        }

        // GET: Login
        [HttpGet]
        public ActionResult Login() => View();

        // POST: Login
        [HttpPost]
        public ActionResult Login(Users model)
        {
            if (ModelState.IsValid)
            {
                var user = db.Users.FirstOrDefault(u => u.Username == model.Username);
                if (user != null && user.Password == model.Password)
                {
                    Session["UserID"] = user.UserID;
                    Session["Username"] = user.Username;

                    user.IsActive = true;
                    db.SaveChanges();
                    Session["IsAdmin"] = user.IsAdmin;
                    Session["IsActive"] = user.IsActive;
                    return RedirectToAction("HomePage", "Home");
                }
                ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng!");
            }
            return View(model);
        }

        // Logout
        public ActionResult Logout()
        {
            if (Session["UserID"] != null)
            {
                int userId = (int)Session["UserID"];
                var user = db.Users.FirstOrDefault(u => u.UserID == userId);
                if (user != null)
                {
                    user.IsActive = false;
                    db.SaveChanges();
                }
            }
            Session.Clear();
            return RedirectToAction("HomePage", "Home");
        }
    }
}
