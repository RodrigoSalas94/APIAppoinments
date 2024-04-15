using MongoDB.Driver;
using MongoDB.Bson;


public class SpecialistRepository
{
    private readonly IMongoCollection<Specialist> _specialistsCollection;

    public SpecialistRepository(MongoDBService mongoDBService)
    {
        _specialistsCollection = mongoDBService.GetCollection<Specialist>("specialists");
    }

    public async Task<Specialist> CreateSpecialist(Specialist specialist)
    {
        try
        {
            await _specialistsCollection.InsertOneAsync(specialist);
            return specialist;
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
            var objectId = ObjectId.Parse(specialistId);
            return await _specialistsCollection.Find(s => s.Id == objectId).FirstOrDefaultAsync();
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
            return await _specialistsCollection.Find(_ => true).ToListAsync();
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
        var filter = Builders<Specialist>.Filter.Eq(s => s.Id, ObjectId.Parse(specialistId));
        var update = Builders<Specialist>.Update
            .Set(s => s.FirstName, updates.FirstName)
            .Set(s => s.LastName, updates.LastName)
            .Set(s => s.RegistrationNumber, updates.RegistrationNumber)
            .Set(s => s.Address, updates.Address)
            .Set(s => s.PhoneNumber, updates.PhoneNumber)
            .Set(s => s.Email, updates.Email);
        
        var options = new FindOneAndUpdateOptions<Specialist> { ReturnDocument = ReturnDocument.After };
        
        return await _specialistsCollection.FindOneAndUpdateAsync(filter, update, options);
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
            var objectId = ObjectId.Parse(specialistId);
            return await _specialistsCollection.FindOneAndDeleteAsync(s => s.Id == objectId);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error deleting specialist: " + ex.Message);
            throw;
        }
    }
}
