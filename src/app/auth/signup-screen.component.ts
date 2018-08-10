import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';

@Component({
    selector: 'app-signup-screen',
    templateUrl: './signup-screen.component.html'
})
export class SignupScreenComponent implements OnInit {

    signupForm: FormGroup;

    ngOnInit() {
        this.signupForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
            lastName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
            email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
            password: new FormControl(null, Validators.required),
            passwordConfirm: new FormControl(null, Validators.required)
        });
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            const { name, lastName, email, password, passwordConfirm } = this.signupForm.value;
            if (password == passwordConfirm) {
                const user = new User(email, password, name, lastName);
                this.signupForm.reset();
                console.log(user);
            }
            else {
                alert('Las contraseñas no coinciden');
            }
        }
    }
}