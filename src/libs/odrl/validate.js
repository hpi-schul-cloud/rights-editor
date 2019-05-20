import i18n from '../../i18n';
import { operandMapping } from './constraints.js';

export function validatePolicy(policy, warnings) {
  let errors = 0;
  warnings.length = 0;

  // target
  if (typeof policy.target === 'string') {
    if (policy.target.length <= 0) {
      warnings.push({ path: [], message: `${i18n.t('error')}: ${i18n.t('target')} ${i18n.t('is_empty')}.` });
      errors++;
    }
  } else if (policy.target.uid.length <= 0) {
    warnings.push({ path: [], message: `${i18n.t('error')}: ${i18n.t('target')} ${i18n.t('is_empty')}.` });
    errors++;
  }

  // assigner
  if (typeof policy.assigner === 'string') {
    if (policy.assigner.length <= 0) {
      warnings.push({ path: [], message: `${i18n.t('error')}: ${i18n.t('assigner')} ${i18n.t('is_empty')}.` });
      errors++;
    }
  } else if (policy.assigner.uid.length <= 0) {
    warnings.push({ path: [], message: `${i18n.t('error')}: ${i18n.t('assigner')} ${i18n.t('is_empty')}.` });
    errors++;
  }

  // assignee
  if (typeof policy.assignee === 'string') {
    if (policy.assignee.length <= 0) {
      warnings.push({ path: [], message: `${i18n.t('error')}: ${i18n.t('assignee')} ${i18n.t('is_empty')}.` });
      errors++;
    }
  } else if (policy.assignee.uid.length <= 0) {
    warnings.push({ path: [], message: `${i18n.t('error')}: ${i18n.t('assignee')} ${i18n.t('is_empty')}.` });
    errors++;
  }

  if (policy.constraint) {
    errors += validateConstraints(policy.constraint, [], warnings);
  }

  if (policy.permission) {
    policy.permission.forEach((rule, index) => {
      if (Array.isArray(rule.action)) {
        errors += validateRefinements(rule.action[0].refinement, ['permission', index], warnings);
      }
      errors += validateConstraints(rule.constraint, ['permission', index], warnings);
    });
  }

  if (policy.obligation) {
    policy.obligation.forEach((rule, index) => {
      if (Array.isArray(rule.action)) {
        errors += validateRefinements(rule.action[0].refinement, ['obligation', index], warnings);
      }
      errors += validateConstraints(rule.constraint, ['obligation', index], warnings);
    });
  }

  if (policy.prohibition) {
    policy.prohibition.forEach((rule, index) => {
      if (Array.isArray(rule.action)) {
        errors += validateRefinements(rule.action[0].refinement, ['prohibition', index], warnings);
      }
      errors += validateConstraints(rule.constraint, ['prohibition', index], warnings);
    });
  }

  return errors == 0;
}

function validateRefinements(refinement, rulePath, warnings) {
  return validateConditions(refinement, rulePath, 'refinement', warnings);
}

function validateConstraints(constraint, rulePath, warnings) {
  return validateConditions(constraint, rulePath, 'constraint', warnings);
}

function validateConditions(constraint, rulePath, type, warnings) {
  let errors = 0;

  if (constraint && !Array.isArray(constraint)) {
    // there is more than one constraint...
    const logicalOperator = Object.keys(constraint)[0];
    const constraints = constraint[logicalOperator]['@list'];

    // collect all conditions
    const conditions = {};
    if (logicalOperator == 'and') {
      constraints.forEach((ref) => {
        if (!conditions[ref.leftOperand]) {
          conditions[ref.leftOperand] = [];
        }
        if (!Array.isArray(ref.rightOperand)) {
          // right operand is number with unit
          conditions[ref.leftOperand].push({ op: ref.operator, val: ref.rightOperand['@value'], unit: ref.unit });
        } else {
          // right operand is selection from list of options
          conditions[ref.leftOperand].push(ref.rightOperand);
        }
      });

      const valuesPerOperator = {
        gt: [], gteq: [], lt: [], lteq: [], eq: [],
      };

      Object.keys(conditions).forEach((key) => {
        const conditionsOfSameOperand = conditions[key];

        if (operandMapping[key].units) {
          // check if units are selected ambiguously
          const units = [];
          conditionsOfSameOperand.forEach((item) => {
            if (!units.includes(item.unit)) {
              units.push(item.unit);
            }
          });

          if (units.length > 1) {
            warnings.push({ path: rulePath, message: `${i18n.t('error')} ${i18n.t('in')} ${i18n.t(`${type}.name`)}: ${i18n.t('units_ambiguous')} ${i18n.t('for')} ${i18n.t(key)}.` });
            errors++;
            return errors;
          }

          if (conditionsOfSameOperand.length > 1) {
            conditionsOfSameOperand.forEach((cond) => {
              valuesPerOperator[cond.op].push(parseFloat(cond.val));
            });
          }
        } else if (operandMapping[key].list) {
          if (conditionsOfSameOperand.length > 1) {
            warnings.push({ path: rulePath, message: `${i18n.t('error')} ${i18n.t('in')} ${i18n.t(`${type}.name`)}: ${i18n.t('selection_ambiguous')} ${i18n.t('for')} ${i18n.t(key)}.` });
            errors++;
          }
        }
      });

      const uniqueEqualValues = valuesPerOperator.eq.filter((v, i) => valuesPerOperator.eq.indexOf(v) === i);
      if (uniqueEqualValues.length > 1) {
        warnings.push({ path: rulePath, message: `${i18n.t('error')} ${i18n.t('in')} ${i18n.t(`${type}.name`)}: ${i18n.t('never_fullfilled')}.` });
        errors++;
      }

      // check if conditions have collisions
      const gtMax = Math.max(...valuesPerOperator.gt);
      const gteqMax = Math.max(...valuesPerOperator.gteq);
      const ltMin = Math.min(...valuesPerOperator.lt);
      const lteqMin = Math.min(...valuesPerOperator.lteq);

      if (gtMax >= ltMin || gtMax >= lteqMin || gteqMax >= ltMin || gteqMax > lteqMin) {
        warnings.push({ path: rulePath, message: `${i18n.t('error')} ${i18n.t('in')} ${i18n.t(`${type}.name`)}: ${i18n.t('never_fullfilled')}.` });
        errors++;
      }

      if (uniqueEqualValues.length > 0) {
        const eq = uniqueEqualValues[0];
        if (gtMax >= eq || gteqMax > eq || ltMin <= eq || lteqMin < eq) {
          warnings.push({ path: rulePath, message: `${i18n.t('error')} ${i18n.t('in')} ${i18n.t(`${type}.name`)}: ${i18n.t('never_fullfilled')}.` });
          errors++;
        }
      }
    }
  }

  return errors;
}
