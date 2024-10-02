using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UygulamaHavuzu.Domain.Entities;

namespace UygulamaHavuzu.Application.Abstractions
{
    public interface ITodoServices
    {
        Task<IEnumerable<Todo>> GetAllTodos(Guid userId);
        Task<Todo> GetTodoById(Guid id);
        Task AddTodo(Todo todo);
        Task UpdateTodo(Todo todo);
        Task DeleteTodo(Guid id);
    }
}
