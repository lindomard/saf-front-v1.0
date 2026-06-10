import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const NAME_TOOL = 'NAME_TOOL';

@Injectable({
    providedIn: 'root'
})
export class NavService {
    appDrawer: any;
    currentUrl = new BehaviorSubject<string>(undefined);
    private $tools = new BehaviorSubject<string>(this.getNameToolLocalStorage());
    tools = this.$tools.asObservable();

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }

    closeNav() {
        this.appDrawer.close();
    }

    openNav() {
        this.appDrawer.open();
    }

    setNameTool(name: string) {
        localStorage.setItem(NAME_TOOL, name);
        this.$tools.next(name);
    }

    getNameToolLocalStorage(): string {
        return localStorage.getItem(NAME_TOOL);
    }
}

