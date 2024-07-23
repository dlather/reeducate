// components/JsEditor.js
"use client";
import React, { useRef, useState, useEffect } from "react";
import { Console } from "console-feed";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { ResizableBox } from "react-resizable";
import { generateHashFromString } from "@/lib/utils";

const JsEditor = ({
  initCode = "",
  editorId,
}: {
  initCode: string;
  editorId: string;
}) => {
  const [codeState, setCodeState] = useState(initCode);
  const editorRef = useRef<null | { getValue: () => string }>(null);
  const [editorHeight, setEditorHeight] = useState(
    (initCode.split("\n").length + 1) * 20
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const handleEditorDidMount = (
    editor: { getValue: () => string },
    monaco: any
  ) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        typeof event.data === "object" &&
        event.data.type === "iframe-log" &&
        event.data.editorId === editorId
      ) {
        setLogs((currLogs) => [
          ...currLogs,
          { method: "log", data: [event.data.message] },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [editorId]);

  const runCode = () => {
    setLogs([]);
    if (editorRef.current && iframeRef.current) {
      const code = editorRef.current.getValue();
      iframeRef.current.contentWindow?.postMessage(
        { type: "run-code", code, editorId },
        "*"
      );
    }
  };

  const sandboxHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sandbox</title>
        <script>
          (function() {
            const originalConsoleLog = console.log;
            const originalConsoleError = console.error;
            const originalConsoleWarn = console.warn;
            const editorId = '${editorId}';

            function postLog(type, message) {
              if (typeof message === 'object') {
                message = JSON.stringify(message);
              }
              window.parent.postMessage({ type: 'iframe-log', message, editorId }, '*');
            }

            console.log = function(...args) {
              postLog('log', args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '));
              originalConsoleLog.apply(console, args);
            };

            console.error = function(...args) {
              postLog('error', args.join(' '));
              originalConsoleError.apply(console, args);
            };

            console.warn = function(...args) {
              postLog('warn', args.join(' '));
              originalConsoleWarn.apply(console, args);
            };

            window.addEventListener('message', (event) => {
              if (event.data && event.data.type === 'run-code' && event.data.editorId === editorId) {
                try {
                  new Function(event.data.code)();
                } catch (e) {
                  postLog('error', e.message);
                }
              }
            });
          })();
        </script>
      </head>
      <body>
      </body>
      </html>
    `;

  return (
    <div className="flex-col justify-center items-center">
      <ResizableBox
        axis="y"
        height={editorHeight}
        className="box"
        onResize={(
          _: any,
          d: { size: { height: React.SetStateAction<number> } }
        ) => setEditorHeight(d.size.height)}
      >
        <Editor
          className="rounded py-4 bg-[#1e1e1e]"
          height={editorHeight}
          defaultLanguage="typescript"
          theme="vs-dark"
          onChange={(v) => {
            setLogs([]);
            setCodeState(v ?? initCode);
          }}
          value={codeState}
          onMount={handleEditorDidMount}
        />
      </ResizableBox>

      <div>
        <Button className="mt-2" onClick={runCode}>
          Run
        </Button>
        <Button
          className="mt-2 mx-2"
          variant="outline"
          onClick={() => {
            setCodeState(initCode);
            setLogs([]);
          }}
        >
          Reset
        </Button>
      </div>
      {logs.length > 0 && (
        <div className="flex justify-center py-2 my-2 rounded items-start bg-[#242424]">
          <Console
            logs={logs}
            variant="dark"
            styles={{
              BASE_FONT_SIZE: 13,
            }}
          />
        </div>
      )}
      <iframe
        ref={iframeRef}
        title={`sandbox-${editorId}`}
        style={{ display: "none" }}
        sandbox="allow-scripts"
        srcDoc={sandboxHtml}
      ></iframe>
    </div>
  );
};

const JsEditorWrapper = ({ initCode = "" }: { initCode: string }) => {
  const hashRef = useRef<string>(generateHashFromString(initCode).toString());
  return <JsEditor initCode={initCode} editorId={hashRef.current} />;
};

export default JsEditorWrapper;
