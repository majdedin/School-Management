import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private baseUrl = 'http://localhost:3000/api/students';  // Make sure this matches your backend API route

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get a student by ID
  getStudentById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Add a new student
  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, student);
  }

  // Update a student
  updateStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${student._id}`, student);
  }

  // Delete a student
  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getStudentsByCourseId(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/${courseId}`);
  }
   // Enroll student in a course
   enrollStudent(studentId: string, courseId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${studentId}/enroll`, { courseId });
  }
}
