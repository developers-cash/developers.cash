<template>
  <div>
    <!-- SHA256 -->
    <q-form @submit="toSHA256" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5 q-mb-sm">SHA256</div>
          <p>Generates a sha256 hash digests of input.</p>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="sha256Form.input"
            label="Hexadecimal String"
            hint="00112233445566778899aabbccddeeff"
            lazy-rules
            :rules="[ validateHex ]"
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
            v-model="sha256Form.output"
            readonly
            label="SHA256 Hash"
          />
        </q-card-section>
      </q-card>
    </q-form>

    <!-- RipeMD160 -->
    <q-form @submit="toRipeMD160" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5 q-mb-sm">RipeMD160</div>
          <p>Generates a ripemd160 hash digests of input.</p>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="ripeMD160Form.input"
            label="Hexadecimal String"
            hint="00112233445566778899aabbccddeeff"
            lazy-rules
            :rules="[ validateHex ]"
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
            v-model="ripeMD160Form.output"
            readonly
            label="RipeMD160 Hash"
          />
        </q-card-section>
      </q-card>
    </q-form>

    <!-- Hash 256 -->
    <q-form @submit="toHash256" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5 q-mb-sm">Hash256</div>
          <p>Generates a double sha256 hash digests of input.</p>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="hash256Form.input"
            label="Hexadecimal String"
            hint="00112233445566778899aabbccddeeff"
            lazy-rules
            :rules="[ validateHex ]"
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
            v-model="hash256Form.output"
            readonly
            label="Hash256 Hash"
          />
        </q-card-section>
      </q-card>
    </q-form>

    <!-- Hash 160 -->
    <q-form @submit="toHash160" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5 q-mb-sm">Hash160</div>
          <p>Generates a ripemd160(sha256()) hash digests of input.</p>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="hash160Form.input"
            label="Hexadecimal String"
            hint="00112233445566778899aabbccddeeff"
            lazy-rules
            :rules="[ validateHex ]"
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
            v-model="hash160Form.output"
            readonly
            label="Hash160 Hash"
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
      sha256Form: {
        input: '',
        output: '',
      },
      ripeMD160Form: {
        input: '',
        output: '',
      },
      hash256Form: {
        input: '',
        output: '',
      },
      hash160Form: {
        input: '',
        output: '',
      }
    }
  },
  created() {
    this.libCash = new LibCashJS();
  },
  methods: {
    toSHA256: function() {
      this.sha256Form.output = this.libCash.Crypto.sha256(Buffer.from(this.sha256Form.input, 'hex')).toString('hex');
    },
    toRipeMD160: function() {
      this.ripeMD160Form.output = this.libCash.Crypto.ripemd160(Buffer.from(this.ripeMD160Form.input, 'hex')).toString('hex');
    },
    toHash256: function() {
      this.hash256Form.output = this.libCash.Crypto.hash256(Buffer.from(this.hash256Form.input, 'hex')).toString('hex');
    },
    toHash160: function() {
      this.hash160Form.output = this.libCash.Crypto.hash160(Buffer.from(this.hash160Form.input, 'hex')).toString('hex');
    },

    validateHex: function(val) {
      if (val.length % 2 != 0 || !val.length) {
        return `Invalid hexadecimal string length (${val.length} characters)`;
      }

      /*var re = /[0-9A-Fa-f]+/g;
      if (!re.test(val)) {
        return 'Invalid hexadecimal characters in string';
      }*/

      return true;
    },
  }
}
</script>
