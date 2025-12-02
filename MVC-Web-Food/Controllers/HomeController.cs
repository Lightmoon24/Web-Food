using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFood.Models;

namespace WebFood.Controllers
{
    public class HomeController : Controller
    {
        WebFoodEntities2 db = new WebFoodEntities2();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult HomePage()
        {
            // Lấy danh sách món ăn từ DB
            var items = db.FoodItems.ToList();
            return View(items);
        }
        public ActionResult ChiTietSanPham()
        {
            return View();
        }
        public ActionResult Giaohang()
        {
            return View();
        }
        public ActionResult GioHang()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult LichSuMuaHang()
        {
            return View();
        }
        public ActionResult Register() {
            return View();
        }

    }
}