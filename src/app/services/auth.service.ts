import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerValidation: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  loginValidation: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registerLoad: boolean = false;
  registerReqObj: any;
  registerResObj: any;

  signinLoad: boolean = false;
  signinReqObj: any;
  signinResObj: any;

  updateProfileLoad: boolean = false;
  updateProfileReqObj: any;
  updateProfileResObj: any;

  emitter: EventEmitter<any> = new EventEmitter<any>();

  firebaseApp: any;

  user: any = {
    isLoggedIn: false,
    data: {},
  };

  constructor(public router: Router) {
    this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
  }

  register(): any {
    this.registerLoad = true;
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.registerValidation.controls.email.value,
        this.registerValidation.controls.password.value
      )
      .then((res: any) => {
        console.log(res, 'firebase res');
        this.registerReqObj = {
          user_name: this.registerValidation.controls.name.value,
          user_email: this.registerValidation.controls.email.value,
          mobile: this.registerValidation.controls.mobile.value,
          address: this.registerValidation.controls.address.value,
        };
        axios
          .post(environment.apiHost + '/user/add', this.registerReqObj)
          .then((register_res: any) => {
            console.log(register_res, 'register_res');
            this.user.isLoggedIn = true;
            this.user.data = register_res.data.user;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.emitter.emit('register_success');
            this.registerLoad = false;
          })
          .catch((register_err: any) => {
            console.log(register_err, 'register_err');
            this.registerLoad = false;
          });
      })
      .catch((error: any) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        this.registerLoad = false;
      });
  }

  signin(): any {
    this.signinLoad = true;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.loginValidation.controls.email.value, this.loginValidation.controls.password.value)
      .then((res: any) => {
        console.log(res, 'firebase login res');
        axios.get(environment.apiHost + '/user/user?user_email=' + this.loginValidation.controls.email.value)
        .then((login_res: any) => {
          console.log(login_res, 'login res');
          this.user.isLoggedIn = true;
          this.user.data = login_res.data.user;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.emitter.emit('login_success');
          this.signinLoad = false;
        }).catch((login_err: any) => {
          console.log(login_err, 'login err');
          this.signinLoad = false;
        })
      })
      .catch((error: any) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        this.signinLoad = false;
        console.log(error);
      });
  }

  checkLoginStatus(): any {
    let user = JSON.parse(localStorage.getItem('user') || JSON.stringify(this.user));
    console.log(user, 'user');
    if (user.isLoggedIn) {
      this.user = user;
    }
  }

  async logout(): Promise<any> {
    await firebase.auth().signOut();
    this.user.isLoggedIn = false;
    this.user.data = {};
    this.registerValidation.controls.name.setValue('');
    this.registerValidation.controls.email.setValue('');
    this.registerValidation.controls.password.setValue('');
    this.registerValidation.controls.confirmPassword.setValue('');
    this.registerValidation.controls.address.setValue('');
    this.registerValidation.controls.mobile.setValue('');
    this.loginValidation.controls.email.setValue('');
    this.loginValidation.controls.password.setValue('');
    localStorage.clear();
  }

  updateProfile(): any {
    this.updateProfileLoad = true;
    this.updateProfileReqObj = {
      user_id: this.user.data.user_id,
      user_name: this.registerValidation.controls.name.value,
      mobile: this.registerValidation.controls.mobile.value,
      address: this.registerValidation.controls.address.value,
      user_email: this.registerValidation.controls.email.value
    };
    firebase.auth()
    axios.put(environment.apiHost + '/user/edit', this.updateProfileReqObj)
    .then((updated_user: any) => {
      console.log(updated_user, 'updated_user');
      this.user.data = updated_user.data.user;
      localStorage.setItem('user', JSON.stringify(this.user));
      alert('Profile has been updated successfully!');
      this.emitter.emit('update_profile_success');
      this.updateProfileLoad = false;
    })
    .catch((err: any) => {
      console.log(err, 'err while updating user');
      this.updateProfileLoad = false;
    })
  }
}
