import { Constraint } from './constraint';

export class Action {
  constructor(name, nsVocabUri) {
    this.name = name;
    this.nsVocabUri = nsVocabUri;
    this.constraint = new Constraint();
  }

  name() {
    return this.nsVocabUri.split('/').pop();
  }
}
