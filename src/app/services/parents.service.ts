import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentsService {
  private baseUrl = 'http://localhost:3000/api/parents';  // Make sure this matches your backend API route

  constructor(private http: HttpClient) {}

  // Get all parents
  getParents(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get a parent by ID
  getParentById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Add a new parent
  addParent(parent: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, parent);
  }

  // Update a parent
  updateParent(parent: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${parent._id}`, parent);
  }

  // Delete a parent
  deleteParent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getChildrenForParent(parentId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${parentId}/children`);
  }
  getChildByPhone(phone: string): Observable<any> {
    return this.http.get<{ child: any }>(`${this.baseUrl}/child/${phone}`);
  }
  getCoursesWithTeachers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/courses-with-teachers');
  }
  
}
