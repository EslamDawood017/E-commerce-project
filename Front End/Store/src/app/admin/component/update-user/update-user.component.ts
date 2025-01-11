import { HttpClient } from '@angular/common/http';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../shared/services/user-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  userForm! : FormGroup

  constructor(private userService : UserService,
    private formBuilder : FormBuilder , 
    private router : Router , 
    private route : ActivatedRoute) {

  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id : [{ value: '', disabled: true }] ,
      userName : ['' , [Validators.required , Validators.minLength(3)]],
      userEmail :  ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    })

    // Populate the form with the data passed via the route
    const userData = this.route.snapshot.queryParams;

    console.log(userData);

    this.userForm.patchValue(userData);
  }

  onSubmit():void {
    if(this.userForm.valid)
    {
      const UpdatedUser = this.userForm.getRawValue()


      this.userService.updateUser(UpdatedUser).subscribe({
        next: () => {
          console.log('Updated User:', UpdatedUser);
          Swal.fire('Success', 'User updated successfully', 'success').then(() => {
          this.router.navigate(['/adminUsers']); });
        },
        error : (error) => {console.error("User not updated" , error)}
      })

      
    }
  }

  onCancel(): void {
    this.router.navigate(['/adminUsers']); // Navigate back to user list
  }
}
