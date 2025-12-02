using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace WebFood.Models
{
  
    public class WebFoodEntities : DbContext 
    {
     
        public WebFoodEntities()
            : base("name=WebFoodEntities") 
        {
        }

        
        public virtual DbSet<Users> Users { get; set; }

   
    }
    
}