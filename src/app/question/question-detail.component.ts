import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
    providers: [QuestionService]
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
    question?: Question;
    loading: boolean;
    sub: Subscription;

    constructor(private questionService: QuestionService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loading = true;
        this.sub = this.route.params.subscribe(params => {
            this.questionService
                .getQuestion(params.id)
                .then((question: Question) => {
                    this.question = question;
                    this.loading = false;
                });
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}