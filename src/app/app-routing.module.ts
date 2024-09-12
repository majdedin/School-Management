import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { UniversitiesComponent } from './universities/universities.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';
import { ClassesComponent } from './classes/classes.component';
import { CourseInfoComponent } from './course-info/course-info.component';

const routes: Routes = [
  {path: 'Home',component:HomeComponent},
  {path: 'teachers',component:TeachersComponent},
  {path: 'classes',component:ClassesComponent},
  {path: 'courses',component:CoursesComponent},
  {path: 'add-course',component:AddCourseComponent},
  {path: 'add-teacher',component:AddTeacherComponent},
  {path: 'admin',component:AdminComponent},
  {path: 'SignUp',component:SignUpComponent},
  {path: 'inscription',component:SignUpComponent},
  {path: 'inscriptionParent',component:SignUpComponent},
  {path: 'inscriptionTeacher',component:SignUpComponent},
  {path: 'Login',component:LogInComponent},
  {path: 'searchCourse',component:SearchCourseComponent},
  {path: 'Universities',component:UniversitiesComponent},
  {path: 'edit-courses/:id',component:EditCoursesComponent},
  {path: 'edit-teachers/:id',component:EditTeacherComponent},
  {path: 'teacher-info/:id',component:TeacherInfoComponent},
  {path: 'course-info/:id',component:CourseInfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
