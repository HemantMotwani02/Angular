import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './add-project/add-project.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgbDropdownModule, AddProjectComponent, CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {

  constructor(private http: HttpClient) { }

  showForm: boolean = false;


  ngOnInit() {
    this.getprojects();
  }

  // Display Projects
  projects: any = [];
  getprojects() {
    if (typeof localStorage !== 'undefined') {
      const userString: string | null = localStorage.getItem('users');

      if (userString !== null) {
        try {
          const userData = JSON.parse(userString);
          const token: string | null = userData.token;

          if (token) {
            const headers = new HttpHeaders({
              'Authorization': 'Bearer ' + token
            });

            this.http.get('http://127.0.0.1:7007/project', { headers }).subscribe(
              (data: any) => {
                this.projects = data.result;
                console.log(this.projects);
              },
              (error) => {
                console.error('Error fetching projects:', error);
              }
            );
          } else {
            console.log('Token not found in user data.');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        console.log('User data not found in local storage.');
      }
    } else {
      console.log('localStorage is not available.');
    }
  }


  // Search Projects
  SearchProjectName: any = '';
  SearchProject() {
    if (typeof localStorage !== 'undefined') {
      const userString: string | null = localStorage.getItem('users');

      if (userString !== null) {
        try {
          const userData = JSON.parse(userString);
          const token: string | null = userData.token;

          if (token) {
            const headers = new HttpHeaders({
              'Authorization': 'Bearer ' + token
            });
            const params = new HttpParams().set('project_name', this.SearchProjectName);

            this.http.get('http://127.0.0.1:7007/project/query', { headers, params }).subscribe(
              (data: any) => {
                this.projects = data.result;
                console.log(data);
              },
              (error) => {
                console.error('Error searching project:', error);
              }
            );
          } else {
            console.log('Token not found in user data.');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        console.log('User data not found in local storage.');
      }
    } else {
      console.log('localStorage is not available.');
    }
  }


  // Filter Projects
  FilterProject(status: any) {
    if (typeof localStorage !== 'undefined') {
      const userString: string | null = localStorage.getItem('users');

      if (userString !== null) {
        try {
          const userData = JSON.parse(userString);
          const token: string | null = userData.token;

          if (token) {
            const headers = new HttpHeaders({
              'Authorization': 'Bearer ' + token
            });
            const params = new HttpParams().set('filterby', status);
            this.http.get('http://127.0.0.1:7007/project-sort', { headers, params }).subscribe(
              (data: any) => {
                this.projects = data.result;
                console.log(data);
              },
              (error) => {
                console.error('Error searching project:', error);
              }
            );
          } else {
            console.log('Token not found in user data.');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        console.log('User data not found in local storage.');
      }
    } else {
      console.log('localStorage is not available.');
    }
  }


  // Order Projects
  SortProject(order: any) {
    if (typeof localStorage !== 'undefined') {
      const userString: string | null = localStorage.getItem('users');

      if (userString !== null) {
        try {
          const userData = JSON.parse(userString);
          const token: string | null = userData.token;

          if (token) {
            const headers = new HttpHeaders({
              'Authorization': 'Bearer ' + token
            });
            const params = new HttpParams().set('orderby', order);
            this.http.get('http://127.0.0.1:7007/project-order', { headers, params }).subscribe(
              (data: any) => {
                this.projects = data.result;
                console.log(data);
              },
              (error) => {
                console.error('Error in sorting project:', error);
              }
            );
          } else {
            console.log('Token not found in user data.');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        console.log('User data not found in local storage.');
      }
    } else {
      console.log('localStorage is not available.');
    }
  }
}

