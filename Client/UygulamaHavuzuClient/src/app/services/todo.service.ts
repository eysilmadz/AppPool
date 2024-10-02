import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Todo } from '../entities/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5281/api/todo';

  constructor(private http: HttpClient) { }

  // Kullanıcının todo'larını almak için
  getTodos(userId: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Yeni bir todo eklemek için
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  // Bir todo'yu silmek için
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Bir todo'yu güncellemek için
  updateTodo(id: string, todo: Todo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, todo);
  }

  // Tüm Todo'ları tamamlanmış olarak işaretlemek
  completeAll(userId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/completeAll/${userId}`, {});
  }

  undoAll(userId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/undoAll/${userId}`, {}); // Sorgu parametresini kaldırdım
  }
  
}
