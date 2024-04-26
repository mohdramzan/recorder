using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentapp.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace studentapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentContext _studentContext;
        public StudentController(StudentContext studentContext)
        {
            _studentContext = studentContext;
        }
        // GET: api/<StudentController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _studentContext.Students.ToListAsync());
        }

        // GET api/<StudentController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
           return  Ok(await _studentContext.Students.FirstOrDefaultAsync(x => x.Id == id));
        }

        // POST api/<StudentController>
        [HttpPost]
        public IActionResult Post([FromBody] Student student)
        {
             _studentContext.Students.Add(student);
           return Ok(_studentContext.SaveChanges());
        }

        // PUT api/<StudentController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Student student)
        {
           var result =   _studentContext.Students.Find(id);
            if(result !=  null)
            {
                _studentContext.Students.Update(student);
                            return Ok(_studentContext.SaveChanges());
            }

            return BadRequest("Student doesn't exist");
            
        }

        // DELETE api/<StudentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _studentContext.Students.Find(id);
            if (result != null)
            {
                _studentContext.Students.Remove(result);
                return Ok(_studentContext.SaveChanges());
            }

            return BadRequest("Student doesn't exist");
        }
    }
}
