<script setup>
import * as monaco from "monaco-editor";
import _ from "lodash";
import { onMounted } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ref } from "vue";
import OneDark from "./Themes/OneDark.json"
import { CookieUtils } from "../Utils/CookieUtils";

let script = CookieUtils.getScript() || "// Add your JS code here";

onMounted(() => {
  monaco.editor.defineTheme("one-dark", OneDark);
  const editor = monaco.editor.create(document.getElementById("editor"), {
    value: script,
    language: "javascript",
    fontFamily: "Inter",
    theme: "one-dark",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 16,
    fontLigatures: true,
    wordWrap: "on",
  });

  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  editor.onDidChangeModelContent((e) => {
    script = editor.getValue();
    debouncedRunScript();
  });
});

const debouncedRunScript = _.debounce(() => {
  console.clear();
  new Function(script)();
  CookieUtils.setScript(script);
}, 1000);
</script>

<template>
  <div class="container">
    <div id="editor"></div>
  </div>
</template>

<style scoped>
.container {
  background-color: #282c34;
  display: grid;
  padding: 1.4rem;
  height: calc(100vh - 2.8rem);
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
#editor {
  height: 100%;
  border-radius: 0.4rem;
  overflow: hidden;
  /* box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.1); */
}

.output {
  overflow: auto;
}
</style>
