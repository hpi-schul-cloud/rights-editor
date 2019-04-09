<template>
  <div>
    <div class="question">
      <label>Erlauben, dass Bearbeitungen Ihres Werkes geteilt werden?</label>
      <div class="options">
        <input
          v-model="share"
          type="radio"
          value="yes"
        >
        <label>Ja</label>
        <input
          v-model="share"
          type="radio"
          value="no"
        >
        <label>Nein</label>
        <input
          v-model="share"
          type="radio"
          value="alike"
        >
        <label>Ja, aber nur unter gleichen Bedinungen</label>
      </div>
    </div>
    <div class="question">
      <label>Kommerziele Nutzungen Ihres Werkes erlauben?</label>
      <div class="options">
        <input
          v-model="commercialUse"
          type="radio"
          value="yes"
        >
        <label>Ja</label>
        <input
          v-model="commercialUse"
          type="radio"
          value="no"
        >
        <label>Nein</label>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ID_BY,
  ID_BY_ND,
  ID_BY_SA,
  ID_BY_NC,
  ID_BY_NC_ND,
  ID_BY_NC_SA,
} from '../libs/cc/identifiers';

export default {
  name: 'CCEditor',
  props: {
    activeLicense: {
      type: String,
    },
  },
  data() {
    return {
      share: 'yes',
      commercialUse: 'yes',
    };
  },
  watch: {
    share(value) {
      this.$emit('activeLicense', this.license(value, this.commercialUse));
    },
    commercialUse(value) {
      this.$emit('activeLicense', this.license(this.share, value));
    },
    activeLicense(value) {
      switch (value) {
        case ID_BY:
          this.share = 'yes';
          this.commercialUse = 'yes';
          break;
        case ID_BY_ND:
          this.share = 'no';
          this.commercialUse = 'yes';
          break;
        case ID_BY_SA:
          this.share = 'alike';
          this.commercialUse = 'yes';
          break;
        case ID_BY_NC:
          this.share = 'yes';
          this.commercialUse = 'no';
          break;
        case ID_BY_NC_ND:
          this.share = 'no';
          this.commercialUse = 'no';
          break;
        case ID_BY_NC_SA:
          this.share = 'alike';
          this.commercialUse = 'no';
          break;
        default:
          throw new Exception('illegal argument');
      }
    },
  },
  methods: {
    license(share, commercialUse) {
      if (share === 'yes' && commercialUse === 'yes') {
        return ID_BY;
      } if (share === 'no' && commercialUse === 'yes') {
        return ID_BY_ND;
      } if (share === 'alike' && commercialUse === 'yes') {
        return ID_BY_SA;
      } if (share === 'yes' && commercialUse === 'no') {
        return ID_BY_NC;
      } if (share === 'no' && commercialUse === 'no') {
        return ID_BY_NC_ND;
      } if (share === 'alike' && commercialUse === 'no') {
        return ID_BY_NC_SA;
      }
      throw new Exception('illegal argument');
    },
  },
};
</script>

<style scoped>
.question {
  text-align: center;
}
.question:not(:last-child) {
  margin-bottom: 40px;
}
.question > label {
  font-weight: bold;
  display: block;
}
.question > *:not(:last-child) {
  margin-bottom: 20px;
}
.options label:not(:last-child) {
  margin-right: 40px;
}
</style>
