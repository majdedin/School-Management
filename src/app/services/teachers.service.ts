import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  teacherUrl: string='http://localhost:3000/api/teacher';

  constructor(private http:HttpClient) { }
  addteacher(teacher: any){
    return this.http.post<{isAdded:boolean}>(this.teacherUrl,teacher);}
  editteacher(teacherObj: any){
    return this.http.put<{isEdited:string}>(this.teacherUrl,teacherObj);}
  deleteteacher(id: any){
    return this.http.delete<{isDeleted:boolean}>(`${this.teacherUrl}/${id}`);}
  //response one object
  getteacherById(id: any){
    return this.http.get<{teacher:any}>(`${this.teacherUrl}/${id}`);}
  getAllteacheres(){
    return this.http.get<{teachers:any}>(this.teacherUrl);}
}
