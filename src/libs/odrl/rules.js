export const ruleOptions = [
  {
    name: 'Vorführen (öffentlich)',
    description: 'Die nicht-gewerbliche öffentliche Vorführung im Bildungsbereich ist erlaubt.',
    id: 'http://www.w3.org/ns/odrl/2/public-screening',
  },
  {
    name: 'Downloaden',
    description: 'Der Download des Inhalts ist erlaubt.',
    id: 'http://www.w3.org/ns/odrl/2/download',
  },
  {
    name: 'Streamen',
    description: 'Das Streaming des Inhalts ist erlaubt.',
    id: 'http://www.w3.org/ns/odrl/2/streaming',
  },
  {
    name: 'Speichern',
    description: 'Das permanente Speichern des Inhaltes ist erlaubt.',
    id: 'http://www.w3.org/ns/odrl/2/save',
  },
  {
    name: 'Bearbeiten',
    description: 'Bearbeitungen des Inhalts dürfen angefertigt werden.',
    id: 'http://www.w3.org/ns/odrl/2/derive',
  },
  {
    name: 'Drucken',
    description: 'Das Drucken des Inhalts ist erlaubt.',
    id: 'http://www.w3.org/ns/odrl/2/print',
  },
  {
    name: 'Vervielfältigen',
    description: 'Kopien des Inhalts dürfen erstellt werden.',
    id: 'http://www.w3.org/ns/odrl/2/reproduce',
  },
  {
    name: 'Verbreiten',
    description: 'Kopien des Inhalts dürfen weitergegeben werden.',
    id: 'http://www.w3.org/ns/odrl/2/distribute',
  },
  {
    name: 'Remixen',
    description: 'Der Remix des Inhalts ist erlaubt.',
    id: 'http://schul-could.org/license-vocabulary/remix',
  },
  {
    name: 'Veröffentlichen des Bearbeiteten',
    description: 'Bearbeitungen des Inhalts dürfen veröffentlicht werden.',
    id: 'http://schul-could.org/license-vocabulary/oeffentliche-zugaenglichmachung-von-bearbeitungen',
  },
  {
    name: 'Erzeugen von Thumbnails',
    description: 'Es dürfen Thumbnails aus dem Inhalt erzeugt werden.',
    id: 'http://schul-could.org/license-vocabulary/thumbnailerzeugung',
  },
];

export const RuleTypes = Object.freeze({
  permission: {
    gender: 'f',
    hasParentRule: false,
    subrule: 'duty',
    icon: 'far fa-check-circle',
  },
  obligation: {
    gender: 'f',
    hasParentRule: false,
    subrule: 'consequence',
    icon: 'far fa-handshake',
  },
  prohibition: {
    gender: 'n',
    hasParentRule: false,
    subrule: 'remedy',
    icon: 'fas fa-ban',
  },
  duty: {
    gender: 'f',
    hasParentRule: true,
    subrule: 'consequence',
    icon: 'far fa-hand-point-up',
  },
  consequence: {
    gender: 'f',
    hasParentRule: true,
    subrule: '',
    icon: 'fas fa-gavel',
  },
  remedy: {
    gender: 'f',
    hasParentRule: true,
    subrule: '',
    icon: 'fas fa-balance-scale',
  },
});
