using Microsoft.AspNetCore.Mvc;
 

[Route("[controller]")]
[ApiController]
public class SpecialistController : ControllerBase
{
    private readonly SpecialistServices _specialistServices;

    public SpecialistController(SpecialistServices specialistServices)
    {
        _specialistServices = specialistServices;
    }

    [HttpPost]
    public async Task<ActionResult<Specialist>> CreateSpecialist([FromBody] Specialist specialist)
    {
        try
        {
            var newSpecialist = await _specialistServices.CreateSpecialist(specialist);
            return CreatedAtAction(nameof(GetSpecialistById), new { id = newSpecialist.Id }, newSpecialist);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error creating specialist: " + ex.Message);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Specialist>> GetSpecialistById(string id)
    {
        try
        {
            var specialist = await _specialistServices.FindSpecialistById(id);
            if (specialist == null)
            {
                return NotFound();
            }
            return Ok(specialist);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error finding specialist by ID: " + ex.Message);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<Specialist>>> GetAllSpecialists()
    {
        try
        {
            var specialists = await _specialistServices.GetAllSpecialists();
            return Ok(specialists);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error finding all specialists: " + ex.Message);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Specialist>> UpdateSpecialist(string id, [FromBody] Specialist updates)
    {
        try
        {
            var updatedSpecialist = await _specialistServices.UpdateSpecialist(id, updates);
            if (updatedSpecialist == null)
            {
                return NotFound();
            }
            return Ok(updatedSpecialist);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error updating specialist: " + ex.Message);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSpecialist(string id)
    {
        try
        {
            var deletedSpecialist = await _specialistServices.DeleteSpecialist(id);
            if (deletedSpecialist == null)
            {
                return NotFound();
            }
            return Ok(new { message = "Specialist deleted successfully" });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error deleting specialist: " + ex.Message);
            return StatusCode(500, "Internal server error");
        }
    }
}