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
  value: string;
  status: string;
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
