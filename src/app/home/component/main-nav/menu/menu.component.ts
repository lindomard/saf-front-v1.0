import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from './nav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuComponent implements OnInit {

  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
  @Input() showIcon: boolean;

  constructor(
    public navService: NavService,
    public router: Router,
    readonly route: ActivatedRoute
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
    
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.closeDrawer();
      this.navService.setNameTool(item.name);
      this.router.navigate([item.route], { relativeTo: this.route });
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  private closeDrawer() {
    this.navService.closeNav();
  }

}

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  name?: string;
  children?: NavItem[];
}
