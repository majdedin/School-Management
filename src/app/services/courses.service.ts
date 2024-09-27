import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseUrl: string='http://localhost:3000/api/courses';

  constructor(private http:HttpClient) { }
  addcourse(course: any){
    return this.http.post<{isAdded: boolean}>(this.courseUrl,course);}
  editcourse(courseObj: any){
    return this.http.put<{isEdited:string}>(this.courseUrl,courseObj);}
  deletecourse(id: any){
    return this.http.delete<{isDeleted:boolean}>(`${this.courseUrl}/${id}`);}
  //response one object
  getcourseById(id: any){
    return this.http.get<{course:any}>(`${this.courseUrl}/${id}`);}
  getAllcoursees(){
    return this.http.get<{courses:any}>(this.courseUrl);}
    getCourseStudents(courseId: string): Observable<any> {
      return this.http.get(`${this.courseUrl}/${courseId}/students`);
    }
  
    assignGrade(studentId: any, courseId:   any, gradeData: { grade: number, evaluation: string }): Observable<any> {
      return this.http.put(`${this.courseUrl}/students/${courseId}/${studentId}/grade`, { gradeData });
    }
   

}
