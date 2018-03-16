export class Customer {
  _id: string;
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
  value: string;
  public updateType(): boolean {
    const emailPattern =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (emailPattern.test(this.value)) {
      this.deliveryType = 'email';
      return true;
    }
    if (phonePattern.test(this.value)) {
      this.deliveryType = 'text';
      return true;
    }
    return false;
  }
}

export class AlertPreference {
  alertDefId: string;
  clientId: string;
  active: boolean;
  deliverTo: string[];
  parameters: object;
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
  lookupLists: LookupList[];
}

export class AlertDefParameter {
  name: string;
  label: string;
  ptype: string;
  lookup: string;
}

export class LookupList {
  name: string;
  values: LookupValue[];
}

export class LookupValue {
  id: string;    // the value selected
  itemName: string;  // what the user sees in the list
  group: string;  // used to group the values
}
