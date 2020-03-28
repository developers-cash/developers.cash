<template>
  <div>
    <!-- Decode Raw Transaction -->
    <q-form @submit="decodeTransaction" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5 q-mb-sm">Decode Transaction</div>
          <p>Decodes a transaction (as a hexadecimal string) and outputs a JSON representation.</p>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="decodeTransactionForm.input"
            label="Transaction (as Hex)"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Invalid value']"
          />

          <div>
            <q-btn label="Decode" type="submit" color="primary"/>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Output</div>
          <q-input
            filled
            class="q-mb-md"
            type="textarea"
            v-model="decodeTransactionForm.output"
            label="Decoded (Hex)"
            readonly
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
      decodeTransactionForm: {
        input: '',
        output: ''
      },
    }
  },
  created() {
    this.libCash = new LibCashJS();
  },
  methods: {
    decodeTransaction: function() {
      this.decodeTransactionForm.output = JSON.stringify(this.libCash.Transaction.fromBuffer(Buffer.from(this.decodeTransactionForm.input, 'hex')), 0, 2);
    },
  }
}
</script>
