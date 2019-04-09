import { ID_PERMISSION_CLASS, ID_PROHIBITION_CLASS, ID_DUTY_CLASS } from './concepts';
import { Action } from './action';


const uuidv4 = require('uuid/v4');

export default class Rule {
  constructor(uid, type) {
    this.uid = uid;
    if (this.uid === null) {
      this.uid = uuidv4();
    }
    this.type = type;

    this.target = null;
    this.assigner = null;
    this.assignee = null;

    this.constraint = null;
    this.action = new Action();
  }
}

export class Permission extends Rule {
  constructor(uid) {
    super(uid, ID_PERMISSION_CLASS);

    this.duty = null;
  }
}

export class Prohibition extends Rule {
  constructor(uid) {
    super(uid, ID_PROHIBITION_CLASS);

    this.remedy = null;
  }
}

export class Duty extends Rule {
  constructor(uid) {
    super(uid, ID_DUTY_CLASS);

    this.remedy = null;
  }
}
