<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
          :style="{ width: this.width }"
          class="modal-container"
        >
          <div class="modal-header">
            <slot name="header" />
          </div>

          <div
            :class="{ 'base-modal-scrollable': scrollable }"
            class="modal-body"
          >
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    width: {
      default: '600px',
      type: String,
      required: false,
    },
    scrollable: {
      default: true,
      type: Boolean,
      required: false,
    },
  },
  created() {
    document.body.style.overflow = 'hidden';
  },
  destroyed() {
    document.body.style.overflow = 'auto';
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.25s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.25s ease;
}

.base-modal-scrollable {
  overflow-y: scroll !important;
}

.modal-body {
  margin: 20px 0;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 250px;
  max-height: 250px;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* The following style creates a custom scroll bar
 * for the modal to fit better into our custom ui design
*/

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #999;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
