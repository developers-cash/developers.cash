<template>
  <div>
    <!-- From Legacy/Cash -->
    <q-form @submit="legacyCash" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5">Convert Legacy or Cash Address</div>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="legacyCashForm.input"
            label="CashAddress or Hash160 (Legacy) Address"
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
            v-model="legacyCashForm.output"
            label="Converted Address"
          />
        </q-card-section>
      </q-card>
    </q-form>

    <!-- To Hash160 -->
    <q-form @submit="toHash160" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5">Address To Hash160</div>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="toHash160Form.input"
            label="CashAddress or Legacy Address"
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
            v-model="toHash160Form.output"
            label="Hash160"
          />
        </q-card-section>
      </q-card>
    </q-form>

    <!-- Hash160 to Address -->
    <q-form @submit="fromHash160" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5">Hash160 to Address</div>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="fromHash160Form.input"
            label="CashAddress or Legacy Address"
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
            v-model="fromHash160Form.output.cashAddress"
            label="Cash Address"
          />
          <q-input
            filled
            class="q-mb-md"
            v-model="fromHash160Form.output.legacyAddress"
            label="Legacy Address"
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
      legacyCashForm: {
        input: '',
        output: ''
      },
      toHash160Form: {
        input: '',
        output: ''
      },
      fromHash160Form: {
        input: '',
        output: {
          cashAddress: '',
          legacyAddress: '',
        }
      }
    }
  },
  created() {
    this.libCash = new LibCashJS();
  },
  methods: {
    legacyCash: function() {
      if (this.libCash.Address.isLegacyAddress(this.legacyCashForm.input)) {
        this.legacyCashForm.output = this.libCash.Address.toCashAddress(this.legacyCashForm.input);
      } else if (this.libCash.Address.isCashAddress(this.legacyCashForm.input)) {
        this.legacyCashForm.output = this.libCash.Address.toLegacyAddress(this.legacyCashForm.input);
      }
    },
    toHash160: function() {
      this.toHash160Form.output = this.libCash.Address.toHash160(this.toHash160Form.input);
    },
    fromHash160: function(address) {
      this.fromHash160Form.output.cashAddress = this.libCash.Address.hash160ToCash(this.fromHash160Form.input);
      this.fromHash160Form.output.legacyAddress = this.libCash.Address.hash160ToLegacy(this.fromHash160Form.input);
    }
  }
}
</script>
