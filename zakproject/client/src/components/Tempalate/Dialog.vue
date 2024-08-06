<template>
  <div>
    <v-layout row justify-center>
      <v-dialog
        v-model="isDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click="close">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
          </v-toolbar>

          <slot name="add_client">

          </slot>
          <slot name="search_client">

          </slot>
          <slot name="select_subscribe">

          </slot>

          <slot name="add_subscribe">

          </slot>

          <slot name="select_item">

          </slot>

          <slot name="add_item">

          </slot>




        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  export default {
    computed: {
      isDialog () {
       return this.$store.getters['navigation/dialog/stateDialog']
      }

    },
    methods: {
      close() {
        this.$store.dispatch('navigation/dialog/closeDialog')
        this.$store.dispatch('navigation/dialog/closeAllComponents')
      }
    }
  }
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }


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
</style>
