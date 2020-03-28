<template>
  <div>
    <!-- From ASM -->
    <q-form @submit="fromASM" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5">From ASM</div>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="fromASMForm.input"
            label="Script Assembly"
            hint="OP_DUP OP_HASH160 bee4182d9fbc8931a728410a0cd3e0f340f2995a OP_EQUALVERIFY OP_CHECKSIG"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Invalid value']"
          />

          <div>
            <q-btn label="Convert" type="submit" color="primary"/>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Output</div>
          <q-input
            filled
            class="q-mb-md"
            v-model="fromASMForm.output"
            label="Encoded (Hex)"
          />
        </q-card-section>
      </q-card>
    </q-form>

    <!-- To ASM -->
    <q-form @submit="toASM" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5">To ASM</div>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="toASMForm.input"
            label="Encoded (Hex)"
            hint="76a914bee4182d9fbc8931a728410a0cd3e0f340f2995a88ac"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Output</div>
          <q-input
            filled
            class="q-mb-md"
            v-model="toASMForm.output"
            label="Script Assembly"
          />
        </q-card-section>
      </q-card>
    </q-form>

  </div>
</template>

<script>
import LibCashJS from '@developers.cash/libcash-js'

export default {
  data () {
    return {
      libCash: null,
      fromASMForm: {
        input: '',
        output: ''
      },
      toASMForm: {
        input: '',
        output: ''
      }
    }
  },
  created() {
    this.libCash = new LibCashJS();
  },
  methods: {
    toASM: function() {
      this.toASMForm.output = this.libCash.Script.toASM(Buffer.from(this.toASMForm.input, 'hex'));
    },
    fromASM: function(address) {
      this.fromASMForm.output = this.libCash.Script.fromASM(this.fromASMForm.input).toString('hex');
    },
  }
}
</script>
