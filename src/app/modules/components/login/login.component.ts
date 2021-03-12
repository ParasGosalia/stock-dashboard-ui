import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/core/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  private authStatus : String = ""

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private loginService: LoginService,
      private toastr: ToastrService
  ) {
      // redirect to home if already logged in
      if (this.loginService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.loginService.login(this.f.username.value, this.f.password.value)
          .subscribe(
            data => { // Success
              console.log(data['jwtToken']);
              if(data['jwtToken']!=null)
              {
                this.router.navigate(['./dashboard']);
                this.toastr.success('You have logged in Successfully');
              }
            },
              error => {
                  //this.alertService.error(error);
                  this.loading = false;
                  console.log(error);
                  if(error.status===401)
                  {
                    this.toastr.error("Invalid Credentials")
                  }
                  else if(error.status===403)
                  {
                    this.toastr.error("You session has expired.Please re-login")
                  }
                  else{
                    this.toastr.error("An Internal error has occured. Please contact System Administrator")
                  }

              });
  }

}
