using MongoDB.Bson;

public class Specialist
{
    public ObjectId Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public int RegistrationNumber { get; set; }
    public required string Address { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
}