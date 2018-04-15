import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'am-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() state: boolean;
  @Output() stateChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  toggleSlider() {
    this.state = !this.state;
    this.stateChange.emit(this.state);
  }

}
