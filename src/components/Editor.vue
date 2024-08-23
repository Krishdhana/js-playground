<script setup>
import * as monaco from "monaco-editor";
import _ from "lodash";
import { onMounted } from "vue";

let script = "";

onMounted(() => {
  const editor = monaco.editor.create(document.getElementById("editor"), {
    value: script,
    language: "javascript",
    fontFamily: "Fira Code",
    // theme: "vs-dark",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
    fontLigatures : true,
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
  console.clear();
  Function(script)()
}, 1000);
</script>

<template>
    <div id="editor"></div>
</template>

<style scoped>
#editor {
  border-radius: 0.4rem;
  height: calc(100vh - 0.8rem);
  padding: 0.4rem;
  overflow: hidden;
  
}
</style>
