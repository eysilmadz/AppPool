using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using UygulamaHavuzu.Application.Abstractions;
using UygulamaHavuzu.Domain.Entities;
using UygulamaHavuzu.Persistence.Contexts;

namespace UygulamaHavuzu.Infrastructure.Services
{
    public class TodoServices : ITodoServices
    {
        private readonly UygulamaHavuzuDbContext _context;

        public TodoServices(UygulamaHavuzuDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Todo>> GetAllTodos(Guid userId)
        {
            return await _context.Todos.Where(t => t.UserId == userId).ToListAsync();
        }

        public async Task<Todo> GetTodoById(Guid id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task UpdateTodo(Todo todo)
        {
            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();
        }
        
        public async Task AddTodo(Todo todo)
        {
            await _context.Todos.AddAsync(todo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodo(Guid id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo != null)
            {
                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();
            }
        }
    }
}
