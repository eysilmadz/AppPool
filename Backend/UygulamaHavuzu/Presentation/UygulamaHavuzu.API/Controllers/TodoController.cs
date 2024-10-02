using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UygulamaHavuzu.Application.Abstractions;
using UygulamaHavuzu.Domain.Entities;
using System;
using UygulamaHavuzu.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace UygulamaHavuzu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoServices _todoServices;
        private readonly UygulamaHavuzuDbContext _context;

        public TodoController(ITodoServices todoServices, UygulamaHavuzuDbContext context)
        {
            _todoServices = todoServices;
            _context = context;
        }

        // Kullanıcının todo'larını listelemek için
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodosByUserId(Guid userId)
        {
            var todos = await _context.Todos.Where(t => t.UserId == userId).ToListAsync();
            return Ok(todos);
        }

        // Yeni bir todo eklemek için
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodosByUserId), new { userId = todo.UserId }, todo);
        }


        // Bir todo'yu silmek için
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(Guid id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Bir todo'yu güncellemek için
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(Guid id, Todo updatedTodo)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            todo.Title = updatedTodo.Title;
            todo.Description = updatedTodo.Description;
            todo.IsCompleted = updatedTodo.IsCompleted;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Tüm Todo'ları tamamlanmış olarak işaretlemek
        [HttpPut("completeAll/{userId}")]
        public async Task<IActionResult> CompleteAll(Guid userId)
        {
            var todos = await _context.Todos.Where(t => t.UserId == userId).ToListAsync();
            foreach (var todo in todos)
            {
                todo.IsCompleted = true;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Tüm Todo'ların tamamlanmış durumunu geri almak
        [HttpPut("undoAll/{userId}")]
        public async Task<IActionResult> UndoAll(Guid userId)
        {
            var todos = await _context.Todos.Where(t => t.UserId == userId).ToListAsync();
            foreach (var todo in todos)
            {
                todo.IsCompleted = false;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}
