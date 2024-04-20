using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Specialist
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public string? Id { get; set; }

    [BsonRequired]
    public string? FirstName { get; set; }

    [BsonRequired]
    public string? LastName { get; set; }

    public int RegistrationNumber { get; set; }

    [BsonRequired]
    public string? Address { get; set; }

    [BsonRequired]
    public string? PhoneNumber { get; set; }

    [BsonRequired]
    public string? Email { get; set; }
}
