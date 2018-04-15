export class Subscriber {
  _id: string;
  token: string;
  publisherId: string;
  deliveryOptions: DeliveryOption[];
  subscriptions: AlertSubscription[];
  active: boolean;
}

export class DeliveryOption {
  id: number;
  deliveryType: string;
  name: string;
  status: string;
  value: string;
}

export class AlertSubscription {
  topicId: string;
  publisherId: string;
  active: boolean;
  deliverTo: string[];
  parameters: object;
  topic: Topic;
}

export class Topic {
  _id: string;
  name: string;
  label: string;
  description: string;
  parameters: [TopicParameter];
  content: {
    emailText: string,
    smsText: string
  };
  lookupLists: LookupList[];
}

export class TopicParameter {
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
