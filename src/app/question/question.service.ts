import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
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

    getQuestion(id): Promise<void | Question> {
        const url = urlJoin(this.questionsUrl, id);
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Question)
            .catch(this.handleError);
    }

    getToken() {
        const token = localStorage.getItem('token');
        return `?token=${token}`;
    }

    addQuestion(question: Question): Observable<any> {
        const body = JSON.stringify(question);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = this.getToken();
        return this.http.post(this.questionsUrl + token, body, { headers });
    }

    addAnswer(answer: Answer): Observable<any> {
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            }
        }
        const body = JSON.stringify(a);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const url: string = urlJoin(this.questionsUrl, answer.question._id.toString(), 'answers');
        const token = this.getToken();
        return this.http.post(url + token, body, { headers });
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        console.log(errMsg);
    }
}