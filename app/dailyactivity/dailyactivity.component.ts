import {Component} from '@angular/core';
import {User} from '../model/User';

@Component({
    moduleId: module.id,
    selector: 'dailyactivity',
    templateUrl: 'dailyactivity.component.html'
})

export class DailyActivityComponent {
    user = new User();
    constructor() {
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
     }
}
