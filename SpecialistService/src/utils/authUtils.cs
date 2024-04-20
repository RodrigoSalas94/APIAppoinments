using System.Net;


public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthenticationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        
        if (context.Request.Path.StartsWithSegments("/swagger"))
        {
            
            await _next(context);
            return;
        }

        
        string authorizationHeaderValue = context.Request.Headers["Authorization"];
        string? token = string.IsNullOrEmpty(authorizationHeaderValue) ? null : authorizationHeaderValue.ToString().Split(' ').Length > 1 ? authorizationHeaderValue.ToString().Split(' ')[1] : null;

        if (string.IsNullOrEmpty(token))
        {
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            await context.Response.WriteAsync("Token de autenticación no proporcionado");
            return;
        }

        using (var httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var response = await httpClient.PostAsync("http://localhost:1234/auth", null);

            if (!response.IsSuccessStatusCode)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                await context.Response.WriteAsync("Token de autenticación inválido");
                return;
            }

            var userId = await response.Content.ReadAsStringAsync();

            context.Items["UserId"] = userId;
        }

        await _next(context);
    }
}