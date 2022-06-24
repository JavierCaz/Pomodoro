import { Component, OnInit } from '@angular/core';
import { timerStates } from '../timerStates';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  pomodoroTime:number = 1500;
  shortBreakTime:number = 300;
  longBreakTime:number = 900;
  timerState:timerStates = timerStates.Pomodoro;
  timerTime:number = this.pomodoroTime;
  pomodoroCounter:number = 0;
  runningTimer:boolean = false;
  timerInterval = setInterval(() => this.timerTime--, 1000);
  timerAlert = new Audio("../../../assets/audio/alarm.wav");
  timerMinutes:number = 0;
  timerSeconds:number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerAlert.load();
    this.timerFormat();
  }

  stateClick(state:string): void{
    this.timerEnds();

    switch(state){
      case 'pomodoro':
        this.timerTime = this.pomodoroTime;
        this.timerState = timerStates.Pomodoro;
        break;
      case 'shortBreak':
        this.timerState = timerStates.ShortBreak;
        this.timerTime = this.shortBreakTime;
        break;
      case 'longBreak':
        this.timerState = timerStates.LongBreak;
        this.timerTime = this.longBreakTime;
        break;
    }

    this.timerFormat();
  }


  actionClick(): void{
    this.runningTimer = !this.runningTimer

    if(this.runningTimer){
      this.timerInterval = setInterval(() => {
        if(this.timerTime > 0){
          this.timerTime--;
          this.timerFormat();
        }
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

    if(this.timerTime == 0){
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
        this.timerTime = this.pomodoroTime;
        break;
      case timerStates.ShortBreak:
        this.timerTime = this.shortBreakTime;
        break;
      case timerStates.LongBreak:
        this.timerTime = this.longBreakTime;
        break;
    }

  }

  timerFormat(): void{
    this.timerMinutes = Math.floor(this.timerTime/60);
    this.timerSeconds = this.timerTime - this.timerMinutes * 60;
  }

}
