import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LearnmoreComponent } from './learnmore/learnmore.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PopularclassesComponent } from './popularclasses/popularclasses.component';
import { OurteachersComponent } from './ourteachers/ourteachers.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BlogComponent } from './blog/blog.component';
import { FooterComponent } from './footer/footer.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CourseComponent } from './course/course.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { TeachersTabComponent } from './teachers-tab/teachers-tab.component';
import { CoursesTabComponent } from './courses-tab/courses-tab.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { UniversitiesComponent } from './universities/universities.component';
import { UniversityComponent } from './university/university.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import{HttpClientModule} from "@angular/common/http";
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassComponent } from './class/class.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { ProfileComponent } from './profile/profile.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { AddParentComponent } from './add-parent/add-parent.component';
import { EditParentComponent } from './edit-parent/edit-parent.component';
import { ParentInfoComponent } from './parent-info/parent-info.component';
import { StudentsTabComponent } from './students-tab/students-tab.component';
import { ParentsTabComponent } from './parents-tab/parents-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LearnmoreComponent,
    AboutusComponent,
    PopularclassesComponent,
    OurteachersComponent,
    TestimonialsComponent,
    BlogComponent,
    FooterComponent,
    AddCourseComponent,
    AddTeacherComponent,
    TeachersComponent,
    CoursesComponent,
    TeacherComponent,
    CourseComponent,
    AdminComponent,
    HomeComponent,
    TeachersTabComponent,
    CoursesTabComponent,
    SignUpComponent,
    LogInComponent,
    SearchCourseComponent,
    UniversitiesComponent,
    UniversityComponent,
    EditTeacherComponent,
    EditCoursesComponent,
    TeacherInfoComponent,
    ClassesComponent,
    ClassComponent,
    CourseInfoComponent,
    ProfileComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentInfoComponent,
    AddParentComponent,
    EditParentComponent,
    ParentInfoComponent,
    StudentsTabComponent,
    ParentsTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
