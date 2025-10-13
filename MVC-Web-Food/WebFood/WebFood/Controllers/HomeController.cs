using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebFood.Controllers
{
    public class HomeController : Controller
    {
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
            return View();
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
    }
}