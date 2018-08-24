import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { QuestionService } from '../question/question.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-form.component.html',
    styleUrls: ['./answer-form.component.scss'],
    providers: [QuestionService, AuthService]
})
export class AnswerFormComponent {
    @Input()
    private question: Question;

    constructor(private authService: AuthService,
        private questionService: QuestionService,
        private router: Router) {

    }

    onSubmit(form: NgForm) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/signin');
        }
        
        const answer = new Answer(form.value.description, this.question);
        this.questionService.addAnswer(answer).subscribe((result) => {
            let answerResponse: any = JSON.parse(result._body);
            this.question.answers.unshift(answerResponse);
        }, (err) => {
            this.authService.handleError(err);
        });
        form.reset();
    }
}