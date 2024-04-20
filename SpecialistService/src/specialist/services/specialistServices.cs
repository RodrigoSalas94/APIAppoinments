using MongoDB.Driver;

public class SpecialistService
{
    private readonly MongoDBService _mongoDBService;
    private readonly IMongoCollection<Specialist> _specialistsCollection;

    public SpecialistService(MongoDBService mongoDBService)
    {
        _mongoDBService = mongoDBService;
        _specialistsCollection = _mongoDBService.GetCollection<Specialist>("specialists");
    }

    public void ConnectToMongoDB()
    {
        try
        {
            Console.WriteLine("Conectado a MongoDB");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error de conexión a MongoDB: " + ex.Message);
            throw;
        }
    }
}

public class SpecialistServices
{
    private readonly SpecialistRepository _specialistRepository;

    public SpecialistServices(SpecialistRepository specialistRepository)
    {
        _specialistRepository = specialistRepository;
    }

    public async Task<Specialist> CreateSpecialist(Specialist specialist)
    {
        try
        {
            return await _specialistRepository.CreateSpecialist(specialist);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error creating specialist: " + ex.Message);
            throw;
        }
    }

    public async Task<Specialist> FindSpecialistById(string specialistId)
    {
        try
        {
            return await _specialistRepository.FindSpecialistById(specialistId);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error finding specialist by ID: " + ex.Message);
            throw;
        }
    }

    public async Task<List<Specialist>> GetAllSpecialists()
    {
        try
        {
            return await _specialistRepository.GetAllSpecialists();
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error finding all specialists: " + ex.Message);
            throw;
        }
    }

    public async Task<Specialist> UpdateSpecialist(string specialistId, Specialist updates)
    {
        try
        {
            return await _specialistRepository.UpdateSpecialist(specialistId, updates);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error updating specialist: " + ex.Message);
            throw;
        }
    }

    public async Task<Specialist> DeleteSpecialist(string specialistId)
    {
        try
        {
            return await _specialistRepository.DeleteSpecialist(specialistId);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error deleting specialist: " + ex.Message);
            throw;
        }
    }
}
