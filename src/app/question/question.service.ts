import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Question } from './question.model';
import { environment } from '../../environments/environment';
import urlJoin from 'url-join';

@Injectable()
export class QuestionService {

    private questionsUrl: string;

    constructor(private http: Http) {
        this.questionsUrl = urlJoin(environment.apiUrl, 'questions');
    }

    getQuestions(): Promise<void | Question[]> {
        return this.http.get(this.questionsUrl)
            .toPromise()
            .then(response => response.json() as Question[])
            .catch(this.handleError);
    }

    question(id): Promise<void | Question> {
        const url = urlJoin(this.questionsUrl, id);
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Question)
            .catch(this.handleError);
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        console.log(errMsg);
    }
}