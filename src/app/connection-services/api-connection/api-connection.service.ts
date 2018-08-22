import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../shared/user';
import { Company } from '../../components/shared/companies/company';

// import { Course } from '../../shared/course';
// import { Category } from '../../shared/category';
const Token = localStorage.getItem('token');
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-access-token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
    })
};

const Api = {
    base: 'http://localhost:3000/api/',
    register: 'auth/register',
    login: 'auth/login',
    reset: 'auth/forgot'

};

@Injectable({
    providedIn: 'root'
})
export class ApiConnectionService {
    /* This is the service that will make calls to the back-end.
     * There's also a possibility to use a local BE, with json-server.
     */

    constructor(private http: HttpClient) {
    }


    // updateCourse(courseData: Course): Observable<Course> {
    //     return this.http.put<Course>(
    //         Api.base + Api.course,
    //         courseData,
    //         httpOptions
    //     );
    // }

    // getAllUsers(): Observable<User[]> {
    //     return this.http.get<User[]>(Api.base + Api.users);
    //     // return this.http.get<User[]>('http://localhost:3000/' + Api.users);
    // }

    // getUserByEmail(email: String): Observable<User[]> {
    //   return this.http.get<User[]>(Api.base + Api.userByEmail + email);
    // }

    registerUser(userData: User): Observable<User> {
        // return this.http.post<User>(Api.base + Api.register, JSON.stringify(userData), httpOptions);
        return this.http.post<User>(Api.base + Api.register, userData, httpOptions);
    }

    loginUser(data: Company): Observable<Company> {
        return this.http.post<Company>(Api.base + Api.login, data, httpOptions);
    }

    resetPassword(userData: User) {
        return this.http.post<User>(Api.base + Api.reset, userData, httpOptions);
    }

    // getUserById(id: Number): Observable<User> {
    //     return this.http.get<User>(Api.base + Api.users + `?id=${id}`);
    // }

    // getUserById(id: Number): Observable<User> {
    //   return this.http.put<User>(Api.base + Api.userById + id);
    // }
    // getAllCategories(): Observable<Category[]> {
    //     return this.http.get<Category[]>(Api.base + Api.categories + Token, httpOptions);
    // }
    // createCategory(dataCategory: Category): Observable<Category> {
    //     return this.http.post<Category>(Api.base + Api.createCategory + Token, dataCategory, httpOptions);
    // }
    // getCoursesByCategory(id: Number): Observable<Course[]> {
    // return this.http.get<Course[]>(Api.base + Api.coursesByCategoryId + id), httpOptions;
    // }
    // getCourseById(id: Number): Observable<Course[]> {
    // return this.http.get<Course[]>(Api.base + Api.courseById + id, httpOptions);
    // }
    // createCourse(courseData: Course): Observable<Course> {
    //     return this.http.post<Course>(Api.base + Api.createCourse + Token, courseData, httpOptions);
    // }
    // getChaptersByCourseId(id: Number): Observable<Chapter[]> {
    // return this.http.get<Chapter[]>(Api.base + Api.chaptersByCourseId + id, httpOptions);
    // }
    // getChapterBy(id: Number): Observable<Chapter[]> {
    // return this.http.get<Chapter[]>(Api.base + Api.chapterById + id, httpOptions);
    // }
    // createChapter(courseData: Chapter): Observable<Course> {
    // return this.http.post<Chapter>(Api.base + Api.createChapter, httpOptions);
    // }
    // getQuestionsByChapterId(id: Number): Observable<Questions[]> {
    // return this.http.get<Questions[]>(Api.base + Api.questionsByChapterId + id, httpOptions);
    // }
    // createQuestions(courseData: Questions): Observable<Questions> {
    // return this.http.post<Questions>(Api.base + Api.createQuestions, httpOptions);
    // }

    // deleteUser(id: Number): Observable<User> {
    //     return this.http.delete<any>(Api.base + Api.users + `/${id}`)
    // }
    // updateCourseProgress(id: Number, courseData: Course): Observable<Course> {
    //     return this.http.put<Course>(Api.base + Api.course + `/${id}`, courseData, httpOptions);
    // }

    // getUserByEmail(email: String): Observable<User[]> {
    //     return this.http.get<User[]>(Api.base + Api.userByEmail + email, httpOptions);
    // }
    // updateImage(id: Number, userData: User): Observable<User> {
    //     return this.http.put<User>(Api.base + Api.course + `/${id}`, userData, httpOptions);
    // }

    // updateUser(id: Number, userData: User): Observable<User> {
    //     return this.http.put<User>(
    //         Api.base + Api.userById + id,
    //         userData,
    //         httpOptions
    //     );
    // }
    // updatePassword(password: String, userData: User): Observable<User> {
    //     let token = "token=8ip1mx&password=";
    //     return this.http.put<User>(
    //         Api.base + Api.changepass + token + password,
    //         userData,
    //         httpOptions
    //     );
    // }

    // getAllCourses(): Observable<Course[]> {
    //     return this.http.get<Course[]>('http://localhost:3000/' + 'course');
    // }

    // getCoursesByCategory(id: Number): Observable<Course[]> {
    //     return this.http.get<Course[]>(Api.base + Api.coursesByCategoryId + id + '&token=' + Token);
    // }

}
