import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
  <div id="circle">
    <div class="loader">
        <div class="loader">
            <div class="loader">
                <div class="loader">

                </div>
            </div>
        </div>
    </div>
  </div>
  `,
  styles: [`
    #circle {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 100px;
      height: 100px;	
    }

    .loader {
      width: calc(100% - 0px);
      height: calc(100% - 0px);
      border: 8px solid #162534;
      border-top: 8px solid #09f;
      border-radius: 50%;
      animation: rotate 5s linear infinite;
    }

    @keyframes rotate {
    100% {transform: rotate(360deg);}
    } 
  `]
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
