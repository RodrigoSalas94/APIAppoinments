using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

  public void ConfigureServices(IServiceCollection services)
{
   
    var connectionString = Configuration.GetConnectionString("DefaultConnection");
    var databaseName = Configuration.GetValue<string>("DatabaseName");

   
    services.AddScoped<MongoDBService>(sp => new MongoDBService(connectionString!, databaseName!));

    services.AddScoped<SpecialistServices>();
    services.AddScoped<SpecialistController>();
    services.AddScoped<SpecialistRepository>();
    services.AddControllers();

    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Mi API",
            Version = "v1"
        });
    });
} 
 
   
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        
        app.UseHttpsRedirection();

        
        app.UseStaticFiles();

       
        app.UseRouting();

        app.UseMiddleware<AuthenticationMiddleware>();

        
        app.UseAuthorization();

        
        app.UseSwagger();

      
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mi API V1");
        });

       
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
