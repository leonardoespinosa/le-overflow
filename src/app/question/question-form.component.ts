import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from './question.model';
import icons from './icons';
import { QuestionService } from './question.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styles: [`
        i {
            font-size: 48px;
        }

        small {
            display: block;
        }
    `],
    providers: [QuestionService, AuthService]
})
export class QuestionFormComponent implements OnInit {

    icons: Object[] = icons;

    constructor(private questionService: QuestionService,
        private authService: AuthService,
        private router: Router) {

    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/signin');
        }
    }

    getIconVersion(icon: any): any {
        let version;
        if (icon.versions.font.includes('plain-wordmark')) {
            version = 'plain-wordmark';
        } else {
            version = icon.versions.font[0];
        }
        return version;
    }

    onSubmit(form: NgForm) {
        const q = new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.icon
        );
        this.questionService.addQuestion(q).subscribe((result) => {
            let questionResponse: any = JSON.parse(result._body);
            this.router.navigate(['/questions/', questionResponse._id]);
        }, (err) => {
            this.authService.handleError(err);
        });
        form.resetForm();
    }
}