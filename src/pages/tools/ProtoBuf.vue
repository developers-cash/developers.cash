<template>
  <div>
    <div class="q-mb-xl">
      <p>Compact Message Format is the binary encoding used by Flowee The Hub.</p>
      <p>To encode/decode Flowee messages, please use the <strong>TODO</strong></p>
      <p>The encoder/decoder the below uses is from the "compact-message-format" NodeJS library.</p>
      <pre>npm install compact-message-format</pre>
    </div>

    <!-- From CMF -->
    <q-form @submit="fromCMF" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5">From CMF</div>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            v-model="fromCMFForm.input"
            label="CMF Buffer in Hexadecimal Format"
            hint="620b4a696d20697320636f6f6c620b4a696d20697320636f6f6c"
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
            type="textarea"
            readonly
            class="q-mb-md"
            v-model="fromCMFForm.output"
            label="JSON Stringified Output"
          />
        </q-card-section>
      </q-card>
    </q-form>

    <!-- To CMF -->
    <q-form @submit="toCMF" class="q-gutter-md">
      <q-card class="my-card q-mb-xl">
        <q-card-section>
          <div class="text-h5">To CMF</div>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            class="q-mb-md"
            type="textarea"
            v-model="toCMFForm.input"
            label="As JSON"
            hint='[ { "tag": 6, "value": "Jim is cool" } ]'
            lazy-rules
            :rules="[ validateJSON ]"
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
            v-model="toCMFForm.output"
            readonly
            label="Output as Hexadecimal"
          />
        </q-card-section>
      </q-card>
    </q-form>

  </div>
</template>

<script>
import CMF from 'compact-message-format'

export default {
  data () {
    return {
      libCash: null,
      fromCMFForm: {
        input: '',
        output: ''
      },
      toCMFForm: {
        input: '',
        output: ''
      }
    }
  },
  created() {
  },
  methods: {
    toCMF: function() {
      let input = JSON.parse(this.toCMFForm.input);
      let cmf = new CMF.Message();
      for (let token of input) {
        cmf.push(token);
      }
      console.log(cmf);
      console.log(cmf.toBuffer());
      this.toCMFForm.output = cmf.toBuffer().toString('hex');
    },

    fromCMF: function() {
      let input = this.fromCMFForm.input;
      this.fromCMFForm.output = JSON.stringify(CMF.Message.fromBuffer(Buffer.from(input, 'hex')), 0, 2);
    },

    validateJSON: function(val) {
      try {
        JSON.parse(val);
        return true;
      } catch(err) {
        return "Input must be valid JSON";
      }
    },
  }
}
</script>
