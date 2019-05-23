<template>
  <div class="container">
    <BaseButton
      id="dropdown-button"
      input
      :class="{ 'dropdown-button-drop': shouldDisplayList }"
      :style="{ width: this.width }"
      @click="clicked()"
    >
      {{ selectedOption }}
      <i id="dropdown-icon" class="fas fa-caret-down" />
    </BaseButton>

    <div
      v-if="shouldDisplayList"
      class="dropdown"
      :style="{ width: 'auto', minWidth: this.width }"
    >
      <ul
        v-closable="{ exclude: ['dropdown-button', 'dropdown-icon'],
                      handler: 'onOutsideClick'}"
      >

        <li
          v-for="(option, index) in list"
          :key="index"
          @click="showList = false; selectedOption = option"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseButton from './BaseButton.vue';

let handleOutsideClick;
Vue.directive('closable', {
  bind(el, binding, vnode) {
    // Here's the click/touchstart handler
    // (it is registered below)
    handleOutsideClick = (e) => {
      e.stopPropagation();
      // Get the handler method name and the exclude array
      // from the object used in v-closable
      const { exclude, handler } = binding.value;
      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false;
      exclude.forEach((excludeId) => {
        // We only run this code if we haven't detected
        // any excluded element yet
        if (!clickedOnExcludedEl) {
          // See if this excluded element
          // is the same element the user just clicked on
          if (!e.target.id) {
            clickedOnExcludedEl = false;
          } else {
            clickedOnExcludedEl = excludeId == e.target.id;
          }
        }
      });
      // We check to see if the clicked element is not
      // the dialog element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dialog
        // and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]();
      }
    };
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick);
  },
  unbind() {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick);
  },
});

export default {
  name: 'BaseDropdown',
  components: {
    BaseButton,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    initValue: {
      type: String,
      required: false,
    },
    width: {
      default: '200px',
      type: String,
      required: false,
    },
  },
  data() {
    return {
      showList: false,
      selectedListOptionIndex: 0,
    };
  },
  computed: {
    selectedOption: {
      get() {
        return this.list[this.selectedListOptionIndex];
      },
      set(option) {
        this.selectedListOptionIndex = this.list.indexOf(option);
        this.$emit('selected', option);
      },
    },
    shouldDisplayList() {
      return this.showList;
    },
  },
  created() {
    this.selectedOption = this.initValue;
  },
  methods: {
    clicked() {
      this.showList = !this.showList;
    },
    onOutsideClick() {
      this.showList = false;
    },
  },
};
</script>

<style scoped>
.fa-caret-down {
  margin-left: 10px;
}

.container {
  text-align: left;
}

#dropdown-icon {
  text-align: right;
  position: absolute;
  right: 10px;
}

#dropdown-button {
  position: relative;
  text-align: left;
  margin-bottom: 0px;
  cursor: pointer;
}

.dropdown-button-drop {
  border-bottom: 1px solid white;
}

.dropdown {
  background-color: white;
  border: 1px solid rgb(169, 169, 169);
  position: absolute;

  margin-left: 5px;
  padding-left: 10px;
  padding-top: 5px;
  z-index: 4;
}

.dropdown ul {
  margin: 0px;
}

.dropdown li {
  line-height: 2.5em;
  margin-bottom: -1px;
  border-bottom: 1px solid rgb(169, 169, 169);
  width: 90%;
}

.dropdown li:hover {
  cursor: pointer;
}
</style>
