import AceEditor from "react-ace";
import Prettier from "prettier-standalone";
import styles from "./styles";
import { useContext } from "../../context";
import React, { useEffect, useRef, useState } from "react";

// eslint-disable-next-line sort-imports
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chrome";
import { addCompleter } from "ace-builds/src-noconflict/ext-language_tools";

function Editor({ name, api, functions, log, editorRef, ...other }) {
  const [state] = useContext();
  const [code, setCode] = useState(null);
  const ace = useRef();

  const nucfunctions = state.nucleoid.functions;

  addCompleter({
    getCompletions: function (editor, session, pos, prefix, callback) {
      callback(
        null,
        nucfunctions.map((item) => {
          return {
            name: item.path.split("/").pop(),
            value: item.code,
            caption: item.path.split("/").pop(),
            meta: "nucleoid functions",
            score: 1,
          };
        })
      );
    },
  });

  useEffect(() => {
    const { editor } = ace.current;
    if (editorRef) editorRef.current = editor;

    editor.selection.moveCursorToPosition({ row: 0, column: 0 });
    if (api) {
      const selected = state.get("pages.api.selected");
      const api = state.get("nucleoid.api");
      const action = api[selected.path][selected.method].action;
      setCode(`function ${selected.method}(query, json) {\n  ${action}\n}`);
      return;
    }

    if (functions) {
      const selected = state.get("pages.functions.selected");
      const functions = state.get("nucleoid.functions");
      setCode(functions.find((item) => item.path === selected).code);
      return;
    }

    setCode(log);
  }, [state, api, functions, editorRef, log]);

  return (
    <AceEditor
      ref={ace}
      style={styles.editor}
      name={name}
      mode={"javascript"}
      theme={"chrome"}
      fontSize={14}
      {...other}
      setOptions={{
        useWorker: false,
        tabSize: 2,
        useSoftTabs: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
      }}
      value={code}
      onBlur={() => {
        const { editor } = ace.current;
        const code = editor.getValue();
        const position = editor.getCursorPosition();
        let formatted;

        try {
          // editor.session.doc.positionToIndex(editor.selection.getCursor()) gets current offset
          formatted = Prettier.format(code).slice(0, -1);
          editor.session.setValue(formatted);
        } catch (error) {
          console.log(error.message);
          return;
        }

        editor.selection.moveCursorToPosition(position);

        if (api) {
          const selected = state.get("pages.api.selected");
          const api = state.get("nucleoid.api");

          const string = formatted
            .substring(24 + selected.method.length)
            .slice(0, -1)
            .trim();

          api[selected.path][selected.method].action = string;
        }

        if (functions) {
          const selected = state.get("pages.functions.selected");
          const functions = state.get("nucleoid.functions");
          functions.find((item) => item.path === selected).code = code;
        }
      }}
    />
  );
}

export default React.forwardRef((props, ref) => (
  <Editor {...props} editorRef={ref} />
));
