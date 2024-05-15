import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetManagers();
  }

  Managers: any = [];
  // Get Managers
  GetManagers() {
    if (typeof localStorage !== 'undefined') {
      const userString: string | null = localStorage.getItem('users');

      if (userString !== null) {
        try {
          const userData = JSON.parse(userString);
          const token: string | null = userData.token;

          if (token) {


            this.http.get('http://127.0.0.1:7007/manager').subscribe(
              (data: any) => {
                this.Managers = data.result;
                console.log(data);
              },
              (error) => {
                console.error('Error in fetching managers data:', error);
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



  newProject = new FormGroup({
    project_name: new FormControl('', [Validators.required]),
    project_details: new FormControl(''),
    manager_id: new FormControl('null')
  });


  // AddProject
  CreateProject() {

    if (this.newProject.value.manager_id === '') { alert('Select Manager'); }
    else {

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

              this.http.post('http://127.0.0.1:7007/add-new-project', this.newProject.value, { headers }).subscribe(
                (data: any) => {

                  console.log(data);
                },
                (error) => {
                  console.error('Error in creating project:', error);
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

}
