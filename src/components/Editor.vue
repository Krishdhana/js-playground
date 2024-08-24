<script setup>
import * as monaco from "monaco-editor";
import _ from "lodash";
import { onMounted } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ref } from "vue";

let script = "";
let output = ref("");

onMounted(() => {
  const editor = monaco.editor.create(document.getElementById("editor"), {
    value: script,
    language: "javascript",
    fontFamily: "Fira Code",
    // theme: "vs-dark",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
    fontLigatures: true,
    // overviewRulerLanes: 0,
    // scrollbar: {
    //   vertical: "hidden",
    //   horizontal: "hidden",
    // },
    wordWrap: "on",
  });

  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  editor.onDidChangeModelContent((e) => {
    script = editor.getValue();
    debouncedRunScript();
  });
});

const debouncedRunScript = _.debounce(() => {
  output.value = new Function(script)();
}, 1000);
</script>

<template>
  <div class="container">
    <div id="editor"></div>
    <div key="output" class="output">
      <VueJsonPretty :data="output" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
#editor {
  border-radius: 0.4rem;
  height: calc(100vh - 0.8rem);
  padding: 0.4rem;
  overflow: hidden;
}
.output {
  overflow: auto;
}
</style>
