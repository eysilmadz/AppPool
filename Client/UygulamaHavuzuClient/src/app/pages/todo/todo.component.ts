import { Component, OnInit, Inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../entities/todo';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = {
    title: '',
    description: '',
    created: new Date(),
    isCompleted: false,
    userId: '' // Kullanıcı ID'sini localStorage'dan al
  };

  constructor(private todoService: TodoService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.newTodo.userId = userId;
        this.loadTodos();
      }
    }
  }

  loadTodos(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId') || '';
      this.todoService.getTodos(userId).subscribe({
        next: (todos) => {
          this.todos = todos;
        },
        error: (error) => {
          console.error('Todo listesi yüklenirken bir hata oluştu: ', error);
        }
      });
    }
  }

  addTodo(): void {
    this.todoService.addTodo(this.newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTodo = { title: '', description: '', created: new Date(), isCompleted: false, userId: this.newTodo.userId };
      },
      error: (error) => {
        console.error('Yeni todo eklenirken bir hata oluştu: ', error);
      }
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  // Düzenleme modunu başlat
  startEditTodo(todo: Todo): void {
    todo.isEditing = true;
  }

  // Düzenleme işlemini iptal et
  cancelEdit(todo: Todo): void {
    todo.isEditing = false;
    this.loadTodos(); // Değişiklikleri iptal etmek için yeniden yükleme
  }

  // Todo güncelleme işlemi
  updateTodo(todo: Todo): void {
    if (todo.id) {
      this.todoService.updateTodo(todo.id, todo).subscribe(() => {
        todo.isEditing = false; // Düzenleme modundan çık
        this.loadTodos(); // Güncellenmiş todoları yeniden yükle
      });
    }
  }
  
  completeTodo(todo: Todo): void {
    if (todo.isCompleted) { // Eğer todo zaten tamamlanmışsa, geri al
      todo.isCompleted = false;
    } else {
      todo.isCompleted = true;
    }
    this.updateTodo(todo);
  }

  undoComplete(todo: Todo): void {
    todo.isCompleted = false;
    this.updateTodo(todo);
  }

  completeAll(): void {
    const userId = localStorage.getItem('userId') || '';
    this.todoService.completeAll(userId).subscribe(() => {
      this.todos.forEach(todo => todo.isCompleted = true);
    });
  }

  undoAll(): void {
    const userId = localStorage.getItem('userId') || '';
    this.todoService.undoAll(userId).subscribe({
      next: () => {
        this.todos.forEach(todo => todo.isCompleted = false);
      },
      error: (error) => {
        console.error('Todos geri alınırken bir hata oluştu: ', error);
      }
    });
  }
}
