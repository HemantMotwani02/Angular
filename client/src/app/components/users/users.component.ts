import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {


  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }
  ngOnInit() { this.getUsers(); }


  // Display Users
  users: any = [];
  getUsers() {
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

            this.http.get('http://127.0.0.1:7007/GetAllUsers').subscribe(
              (data: any) => {
                this.users = data.UsersData;
                console.log(this.users);
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



  // Delete Users
  selectedUserId: any;

  handleUserSelection(id: any) {
    this.selectedUserId = id;
  }


  deleteUser() {
    console.log(this.selectedUserId);
    if (confirm("Are you sure?")) {
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

              this.http.put('http://127.0.0.1:7007/delete', { user_id: this.selectedUserId }).subscribe(
                (data: any) => {

                  if (data.status === 'success') {
                    console.log(data.status);
                    this.cdr.detectChanges();
                  }
                },
                (error) => {
                  console.error('Error in removing user:', error);
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
