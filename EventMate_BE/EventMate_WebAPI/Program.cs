
using EventMate.Data;
using Eventmate_Data.IRepositories;
using EventMate_Data.IRepositories;
using Eventmate_Data.Repositories;
using EventMate_Data.Repositories;
using Microsoft.EntityFrameworkCore;
using EventMate_Service.Services;
using EventMate_WebAPI.ModelsMapping;

using Eventmate_Common.Helpers;

using Eventmate_Data.IEventRepository;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddSingleton<AESHelper>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IEventRepository, EventRepository>();

builder.Services.AddScoped<AuthService>();

builder.Services.AddScoped<EmailService>();

builder.Services.AddScoped<EventService>();

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("EventMate")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();
app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
});

app.UseCors("reactApp");
app.MapControllers();

app.Run();
