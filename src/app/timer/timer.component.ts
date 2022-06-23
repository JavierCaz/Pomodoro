import { Component, OnInit } from '@angular/core';
import { timerStates } from '../timerStates';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timerState:timerStates = timerStates.Pomodoro;
  timerSeconds:number = 1500;
  runningTimer:boolean = false;
  timerInterval = setInterval(() => this.timerSeconds--, 1000);

  constructor() { }

  ngOnInit(): void {
    if (this.timerInterval) 
      clearInterval(this.timerInterval);
  }

  stateClick(state:string): void{
    switch(state){
      case 'pomodoro':
        this.timerState = timerStates.Pomodoro;
        break;
      case 'shortBreak':
        this.timerState = timerStates.ShortBreak;
        break;
      case 'longBreak':
        this.timerState = timerStates.LongBreak;
        break;
    }
  }


  actionClick(): void{
    this.runningTimer = !this.runningTimer

    if(this.runningTimer)
      this.timerInterval = setInterval(() => this.timerSeconds--, 1000);
    else
      clearInterval(this.timerInterval);
  }

}
