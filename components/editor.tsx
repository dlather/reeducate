// components/JsEditor.js
"use client";
import React, { useRef, useState, useEffect } from "react";
import { Console, Hook, Unhook } from "console-feed";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { ResizableBox } from "react-resizable";
import { guidGenerator } from "@/lib/utils";

const JsEditor = ({ initCode = "" }: { initCode: string }) => {
  const editorId = guidGenerator();
  const [codeState, setcodeState] = useState(initCode);
  const editorRef = useRef<null | { getValue: () => string }>(null);
  const [editorHeight, seteditorHeight] = useState(
    (initCode.split("\n").length + 1) * 20
  );
  const monacoRef = useRef(null);
  const [logs, setLogs] = useState<any[]>([]);

  const handleEditorDidMount = (
    editor: { getValue: () => string },
    monaco: any
  ) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => {
        if (
          log &&
          log.data &&
          log.data.length > 0 &&
          log.data[log.data.length - 1] === editorId
        ) {
          setLogs((currLogs) => {
            return [
              ...currLogs,
              {
                ...log,
                data: log.data?.filter(
                  (x, i) => i !== (log.data?.length ?? 0) - 1
                ),
              },
            ];
          });
        }
      },
      false
    );
    return () => {
      Unhook(hookedConsole);
      return;
    };
  }, []);

  const runCode = () => {
    setLogs([]);
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      try {
        let consoleOverride = `let console = (function (oldCons) {
          return {
            ...oldCons,
            log: function (...args) {
              args.push("${editorId}");
              oldCons.log.apply(oldCons, args);
            },
            warn: function (...args) {
              args.push("${editorId}");
              oldCons.warn.apply(oldCons, args);
            },
            error: function (...args) {
              args.push("${editorId}");
              oldCons.error.apply(oldCons, args);
            },
          };
        })(window.console);`;
        Function(consoleOverride + code)();
      } catch (e: any) {
        console.log(e.message as string);
      }
    }
  };

  return (
    <div className="flex-col justify-center items-center ">
      <ResizableBox
        axis="y"
        height={editorHeight}
        className="box"
        onResize={(
          _: any,
          d: { size: { height: React.SetStateAction<number> } }
        ) => seteditorHeight(d.size.height)}
      >
        <Editor
          className="rounded py-4 bg-[#1e1e1e]"
          height={editorHeight}
          defaultLanguage="typescript"
          theme="vs-dark"
          onChange={(v) => {
            setLogs([]);
            setcodeState(v ?? initCode);
          }}
          value={codeState}
          onMount={handleEditorDidMount}
        />
      </ResizableBox>

      <div className="">
        <Button className="mt-2" onClick={runCode}>
          Run
        </Button>
        <Button
          className="mt-2 mx-2"
          variant="outline"
          onClick={() => {
            setcodeState(initCode);
            setLogs([]);
          }}
        >
          Reset
        </Button>
      </div>
      {logs.length > 0 && (
        <div className="flex justify-center py-2 my-2 rounded items-start bg-[#242424]">
          {/* <p className="text-gray-400">Output</p> */}
          <Console
            logs={logs}
            variant="dark"
            styles={{
              BASE_FONT_SIZE: 13,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default JsEditor;
