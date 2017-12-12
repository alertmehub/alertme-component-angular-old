import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerPreference, DeliveryOption, AlertPreference } from '../../services/preference/preference';

@Component({
  selector: 'np-deliveryoption',
  templateUrl: './deliveryoption.component.html',
  styleUrls: ['./deliveryoption.component.css']
})
export class DeliveryoptionComponent implements OnInit {

  @Input() deliveryOption: DeliveryOption;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  editing = false;

  editedOption = new DeliveryOption();

  ngOnInit() {

  }

  editDeliveryOption() {
    this.editedOption.name = this.deliveryOption.name;
    this.editedOption.value = this.deliveryOption.value;
    this.editing = true;
  }

  saveDeliveryOption() {
    if (this.editedOption.value !== this.deliveryOption.value){
      this.deliveryOption.status = 'not validated';
    }
    this.deliveryOption.name = this.editedOption.name;
    this.deliveryOption.value = this.editedOption.value;

    this.editing = false;
    this.save.emit(null);
  }

  cancelDeliveryOption() {
    this.editing = false;
  }

  deleteDeliveryOption(deliveryOption: DeliveryOption) {
    this.delete.emit(this.deliveryOption);
    this.editing = false;
  }

}
