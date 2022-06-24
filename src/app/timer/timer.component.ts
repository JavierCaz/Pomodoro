import { Component, OnInit } from '@angular/core';
import { timerStates } from '../timerStates';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  pomodoroTime:number = 3;
  shortBreakTime:number = 2;
  longBreakTime:number = 4;
  timerState:timerStates = timerStates.Pomodoro;
  timerSeconds:number = this.pomodoroTime;
  pomodoroCounter:number = 0;
  runningTimer:boolean = false;
  timerInterval = setInterval(() => this.timerSeconds--, 1000);
  timerAlert = new Audio("../../../assets/audio/alarm.wav")

  constructor() { }

  ngOnInit(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerAlert.load();
  }

  stateClick(state:string): void{
    this.timerEnds();

    switch(state){
      case 'pomodoro':
        this.timerSeconds = this.pomodoroTime;
        this.timerState = timerStates.Pomodoro;
        break;
      case 'shortBreak':
        this.timerState = timerStates.ShortBreak;
        this.timerSeconds = this.shortBreakTime;
        break;
      case 'longBreak':
        this.timerState = timerStates.LongBreak;
        this.timerSeconds = this.longBreakTime;
        break;
    }
  }


  actionClick(): void{
    this.runningTimer = !this.runningTimer

    if(this.runningTimer){
      this.timerInterval = setInterval(() => {
        if(this.timerSeconds > 0)
          this.timerSeconds--;
        else
          this.timerEnds();
      }, 1000);
    }
    else{
      clearInterval(this.timerInterval);
    }
  }

  timerEnds(): void{
    clearInterval(this.timerInterval);
    this.runningTimer = false;

    if(this.timerSeconds == 0){
      this.timerAlert.play();
      alert("Timer ends!");

      if(this.timerState == 'Pomodoro'){
        this.pomodoroCounter++;

        if(this.pomodoroCounter % 4 == 0)
          this.timerState = timerStates.LongBreak;
        else
          this.timerState = timerStates.ShortBreak;
          
      }else{
        this.timerState = timerStates.Pomodoro;
      }

    }

    switch(this.timerState){
      case timerStates.Pomodoro:
        this.timerSeconds = this.pomodoroTime;
        break;
      case timerStates.ShortBreak:
        this.timerSeconds = this.shortBreakTime;
        break;
      case timerStates.LongBreak:
        this.timerSeconds = this.longBreakTime;
        break;
    }
  }

}
