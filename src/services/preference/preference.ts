export class CustomerPreference {
  _id: number;
  token: string;
  clientId: string;
  deliveryOptions: DeliveryOption[];
  alertPreferences: AlertPreference[];
  active: boolean;
}

export class DeliveryOption {
  id: number;
  deliveryType: string;
  name: string;
  status: string;
  private _value: string;
  public set value(v: string) {
    this._value = v;

    const emailPattern =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (emailPattern.test(v)) {
      this.deliveryType = 'email';
    } else if (phonePattern.test(v)) {
      this.deliveryType = 'text';
    }
  }
  public get value(): string {
    return this._value;
  }
}

export class AlertPreference {
  alertId: string;
  active: boolean;
  deliverTo: number[];
  parameters: AlertPrefParameter[];
  alertDef: AlertDef;
}

export class AlertDef {
  _id: string;
  name: string;
  description: string;
  parameters: [AlertDefParameter];
  content: {
    emailText: string,
    smsText: string
  };
  trigger: string;

}

export class AlertDefParameter {
  id: string;
  label: string;
  ptype: string;
}

export class AlertPrefParameter {
  parameterId: string;
  value: string;
}
