export const actionList = Object.freeze([
  { odrl: 'http://www.w3.org/ns/odrl/2/play', de: 'Abspielen', en: 'Playing'},
  { odrl: 'http://www.w3.org/ns/odrl/2/archive', de: 'Archivieren', en: 'Archiving' },
  { odrl: 'http://www.w3.org/ns/odrl/2/derive', de: 'Bearbeiten', en: 'Editing' },
  { odrl: 'http://www.w3.org/ns/odrl/2/print', de: 'Drucken', en: 'Printing' },
  { odrl: 'http://www.w3.org/ns/odrl/2/reproduce', de: 'Vervielfältigen', en: 'Reproducing' },
  { odrl: 'http://www.w3.org/ns/odrl/2/distribute', de: 'Verbreiten', en: 'Distributing' },
  { odrl: 'http://www.w3.org/ns/odrl/2/compensate', de: 'Verkaufen', en: 'Selling' },
  { odrl: 'http://www.w3.org/ns/odrl/2/present', de: 'Vorführen', en: 'Presenting' },
]);

class Action {
  constructor(definition, label, note, identifier, includedIn, includedBy) {
    this.definition = definition;
    this.label = label;
    this.note = note;
    this.identifier = identifier;
    this.includedIn = includedIn;
    this.includedBy = includedBy;
  }
}

const actions = {};

const attribution = new Action(
  'Credit be given to copyright holder and/or author.',
  'Attribution',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#Attribution',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[attribution.identifier] = attribution;

const commercialUse = new Action(
  'Exercising rights for commercial purposes.',
  'Commercial Use',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#CommericalUse',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[commercialUse.identifier] = commercialUse;

const derivativeWorks = new Action(
  'Distribution of derivative works.',
  'Derivative Works',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#DerivativeWorks',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[derivativeWorks.identifier] = derivativeWorks;

const distribution = new Action(
  'Distribution, public display, and publicly performance.',
  'Distribution',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#Distribution',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[distribution.identifier] = distribution;

const notice = new Action(
  'Copyright and license notices be kept intact.',
  'Notice',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#Notice',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[notice.identifier] = notice;

const reproduction = new Action(
  'Making multiple copies.',
  'Reproduction',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#Reproduction',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[reproduction.identifier] = reproduction;

const shareAlike = new Action(
  'Derivative works be licensed under the same terms or compatible terms as the original work.',
  'Share Alike',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#ShareAlike',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[shareAlike.identifier] = shareAlike;

const sharing = new Action(
  'Permits commercial derivatives, but only non-commercial distribution.',
  'Sharing',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#Sharing',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[sharing.identifier] = sharing;

const sourceCode = new Action(
  'Source code (the preferred form for making modifications) must be provided when exercising some rights granted by the license.',
  'Source Code',
  'This term is defined by Creative Commons.',
  'http://creativecommons.org/ns#SourceCode',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[sourceCode.identifier] = sourceCode;

const acceptTracking = new Action(
  'To accept that the use of the Asset may be tracked.',
  'Accept Tracking',
  'The collected information may be tracked by the Assigner, or may link to a Party with the role \'trackingParty\' function.',
  'http://www.w3.org/ns/odrl/2/acceptTracking',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[acceptTracking.identifier] = acceptTracking;

const aggregate = new Action(
  'To use the Asset or parts of it as part of a composite collection.',
  'Aggregate',
  '',
  'http://www.w3.org/ns/odrl/2/aggregate',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[aggregate.identifier] = aggregate;

const annotate = new Action(
  'To add explanatory notations/commentaries to the Asset without modifying the Asset in any other way.',
  'Annotate',
  '',
  'http://www.w3.org/ns/odrl/2/annotate',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[annotate.identifier] = annotate;

const anonymize = new Action(
  'To anonymize all or parts of the Asset.',
  'Anonymize',
  'For example, to remove identifying particulars for statistical or for other comparable purposes, or to use the Asset without stating the author/source.',
  'http://www.w3.org/ns/odrl/2/anonymize',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[anonymize.identifier] = anonymize;

const archive = new Action(
  'To store the Asset (in a non-transient form).',
  'Archive',
  'Temporal constraints may be used for temporal conditions.',
  'http://www.w3.org/ns/odrl/2/archive',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[archive.identifier] = archive;

const attribute = new Action(
  'To attribute the use of the Asset.',
  'Attribute',
  'May link to an Asset with the attribution information. May link to a Party with the role “attributedParty” function.',
  'http://www.w3.org/ns/odrl/2/attribute',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[attribute.identifier] = attribute;

const compensate = new Action(
  'To compensate by transfer of some amount of value, if defined, for using or selling the Asset.',
  'Compensate',
  'The compensation may use different types of things with a value: (i) the thing is expressed by the value (term) of the Constraint name; (b) the value is expressed by operator, rightOperand, dataType and unit. Typically the assignee will compensate the assigner, but other compensation party roles may be used.',
  'http://www.w3.org/ns/odrl/2/compensate',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[compensate.identifier] = compensate;

const concurrentUse = new Action(
  'To create multiple copies of the Asset that are being concurrently used.',
  'Concurrent Use',
  '',
  'http://www.w3.org/ns/odrl/2/concurrentUse',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[concurrentUse.identifier] = concurrentUse;

const deleteAction = new Action(
  'To permanently remove all copies of the Asset after it has been used.',
  'Delete',
  'Use a constraint to define under which conditions the Asset must be deleted.',
  'http://www.w3.org/ns/odrl/2/delete',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[deleteAction.identifier] = deleteAction;

const derive = new Action(
  'To create a new derivative Asset from this Asset and to edit or modify the derivative.',
  'Derive',
  'A new asset is created and may have significant overlaps with the original Asset. (Note that the notion of whether or not the change is significant enough to qualify as a new asset is subjective). To the derived Asset a next policy may be applied.',
  'http://www.w3.org/ns/odrl/2/derive',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[derive.identifier] = derive;

const digitize = new Action(
  'To produce a digital copy of (or otherwise digitize) the Asset from its analogue form.',
  'Digitize',
  '',
  'http://www.w3.org/ns/odrl/2/digitize',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[digitize.identifier] = digitize;

const distribute = new Action(
  'To supply the Asset to third-parties.',
  'Distribute',
  'It is recommended to use nextPolicy to express the allowable usages by third-parties.',
  'http://www.w3.org/ns/odrl/2/distribute',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[distribute.identifier] = distribute;

const ensureExclusivity = new Action(
  'To ensure that the Rule on the Asset is exclusive.',
  'Ensure Exclusivity',
  'If used as a Duty, the assignee should be explicitly indicated as the party that is ensuring the exclusivity of the Rule.',
  'http://www.w3.org/ns/odrl/2/ensureExclusivity',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[ensureExclusivity.identifier] = ensureExclusivity;

const execute = new Action(
  'To run the computer program Asset.',
  'Execute',
  'For example, machine executable code or Java such as a game or application.',
  'http://www.w3.org/ns/odrl/2/execute',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[execute.identifier] = execute;

const grantUse = new Action(
  'To grant the use of the Asset to third parties.',
  'Grant Use',
  'This action enables the assignee to create policies for the use of the Asset for third parties. The nextPolicy is recommended to be agreed with the third party. Use of temporal constraints is recommended.',
  'http://www.w3.org/ns/odrl/2/grantUse',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[grantUse.identifier] = grantUse;

const include = new Action(
  'To include other related assets in the Asset.',
  'Include',
  'For example: bio picture must be included in the attribution. Use of a relation sub-property is required for the related assets.',
  'http://www.w3.org/ns/odrl/2/include',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[include.identifier] = include;

const index = new Action(
  'To record the Asset in an index.',
  'Index',
  'For example, to include a link to the Asset in a search engine database.',
  'http://www.w3.org/ns/odrl/2/index',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[index.identifier] = index;

const inform = new Action(
  'To inform that an action has been performed on or in relation to the Asset.',
  'Inform',
  'May link to a Party with the role \'informedParty\' function.',
  'http://www.w3.org/ns/odrl/2/inform',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[inform.identifier] = inform;

const install = new Action(
  'To load the computer program Asset onto a storage device which allows operating or running the Asset.',
  'Install',
  '',
  'http://www.w3.org/ns/odrl/2/install',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[install.identifier] = install;

const modify = new Action(
  'To change existing content of the Asset. A new asset is not created by this action.',
  'Modify',
  'This action will modify an asset which is typically updated from time to time without creating a new asset. If the result from modifying the asset should be a new asset the actions derive or extract should be used. (Note that the notion of whether or not the change is significant enough to qualify as a new asset is subjective).',
  'http://www.w3.org/ns/odrl/2/modify',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[modify.identifier] = modify;

const move = new Action(
  'To move the Asset from one digital location to another including deleting the original copy.',
  'Move',
  'After the Asset has been moved, the original copy must be deleted.',
  'http://www.w3.org/ns/odrl/2/move',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[move.identifier] = move;

const nextPolicy = new Action(
  'To grant the specified Policy to a third party for their use of the Asset.',
  'Next Policy',
  'Useful for downstream policies.',
  'http://www.w3.org/ns/odrl/2/nextPolicy',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[nextPolicy.identifier] = nextPolicy;

const obtainConsent = new Action(
  'To obtain verifiable consent to perform the requested action in relation to the Asset.',
  'Obtain Consent',
  'May be used as a Duty to ensure that the Assigner or a Party is authorized to approve such actions on a case-by-case basis. May link to a Party with the role “consentingParty” function.',
  'http://www.w3.org/ns/odrl/2/obtainConsent',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[obtainConsent.identifier] = obtainConsent;

const play = new Action(
  'To create a sequential and transient rendition of an Asset.',
  'Play',
  'For example, to play a video or audio track. If the action is to be performed to a wider audience than just the Assignees, then the Recipient constraint is recommended to be used.',
  'http://www.w3.org/ns/odrl/2/play',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[play.identifier] = play;

const present = new Action(
  'To publicly perform the Asset.',
  'Present',
  'The asset can be performed (or communicated) in public.',
  'http://www.w3.org/ns/odrl/2/present',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[present.identifier] = present;

const print = new Action(
  'To create a tangible and permanent rendition of an Asset.',
  'Print',
  'For example, creating a permanent, fixed (static), and directly perceivable representation of the Asset, such as printing onto paper.',
  'http://www.w3.org/ns/odrl/2/print',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[print.identifier] = print;

const read = new Action(
  'To obtain data from the Asset.',
  'Read',
  'For example, the ability to read a record from a database (the Asset).',
  'http://www.w3.org/ns/odrl/2/read',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[read.identifier] = read;

const reproduce = new Action(
  'To make duplicate copies the Asset in any material form.',
  'Reproduce',
  '',
  'http://www.w3.org/ns/odrl/2/reproduce',
  'http://www.w3.org/ns/odrl/2/use',
  ['http://www.w3.org/ns/odrl/2/extract'],
);

actions[reproduce.identifier] = reproduce;

const reviewPolicy = new Action(
  'To review the Policy applicable to the Asset.',
  'Review Policy',
  'Used when human intervention is required to review the Policy. May link to an Asset which represents the full Policy information.',
  'http://www.w3.org/ns/odrl/2/reviewPolicy',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[reviewPolicy.identifier] = reviewPolicy;

const stream = new Action(
  'To deliver the Asset in real-time.',
  'Stream',
  'The Asset maybe utilised in real-time as it is being delivered. If the action is to be performed to a wider audience than just the Assignees, then the Recipient constraint is recommended to be used.',
  'http://www.w3.org/ns/odrl/2/stream',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[stream.identifier] = stream;

const synchronize = new Action(
  'To use the Asset in timed relations with media (audio/visual) elements of another Asset.',
  'Synchronize',
  '',
  'http://www.w3.org/ns/odrl/2/synchronize',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[synchronize.identifier] = synchronize;

const textToSpeech = new Action(
  'To have a text Asset read out loud.',
  'Text-to-speech',
  'If the action is to be performed to a wider audience than just the Assignees, then the recipient constraint is recommended to be used.',
  'http://www.w3.org/ns/odrl/2/textToSpeech',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[textToSpeech.identifier] = textToSpeech;

const transform = new Action(
  'To convert the Asset into a different format.',
  'Transform',
  'Typically used to convert the Asset into a different format for consumption on/transfer to a third party system.',
  'http://www.w3.org/ns/odrl/2/transform',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[transform.identifier] = transform;

const translate = new Action(
  'To translate the original natural language of an Asset into another natural language.',
  'Translate',
  'A new derivative Asset is created by that action.',
  'http://www.w3.org/ns/odrl/2/translate',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[translate.identifier] = translate;

const uninstall = new Action(
  'To unload and delete the computer program Asset from a storage device and disable its readiness for operation.',
  'Uninstall',
  'The Asset is no longer accessible to the assignees after it has been used.',
  'http://www.w3.org/ns/odrl/2/uninstall',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[uninstall.identifier] = uninstall;

const watermark = new Action(
  'To apply a watermark to the Asset.',
  'Watermark',
  '',
  'http://www.w3.org/ns/odrl/2/watermark',
  'http://www.w3.org/ns/odrl/2/use',
  [],
);

actions[watermark.identifier] = watermark;
