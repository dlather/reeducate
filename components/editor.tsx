// components/JsEditor.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { Console } from "console-feed";
import { Button } from "./ui/button";
import { ResizableBox } from "react-resizable";
import { generateHashFromString } from "@/lib/utils";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup, EditorView } from "codemirror";
import { autocompletion } from "@codemirror/autocomplete";

interface JsEditorProps {
  initCode: string;
  editorId: string;
}

const JsEditor: React.FC<JsEditorProps> = ({ initCode = "", editorId }) => {
  const [codeState, setCodeState] = useState(initCode);
  const [editorHeight, setEditorHeight] = useState(
    (initCode.split("\n").length + 1) * 20
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [logs, setLogs] = useState<any[]>([]);

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
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        { type: "run-code", code: codeState, editorId },
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
          const uniqueNamespace = 'sandbox_' + editorId.replace(/-/g, '_');
          const wrappedCode = '(function(' + uniqueNamespace + ') {' + event.data.code + '})({});';
          try {
            new Function(wrappedCode)();
          } catch (e) {
            postLog('error', e.message);
          }
        }
      });
    })();
  </script>
</head>
<body></body>
</html>
`;

  return (
    <div className="flex-col justify-center items-center">
      <ResizableBox
        axis="y"
        height={editorHeight}
        className="box"
        onResize={(_, d) => setEditorHeight(d.size.height)}
      >
        <CodeMirror
          theme={"dark"}
          value={codeState}
          extensions={[
            basicSetup,
            autocompletion(),
            javascript({ jsx: true, typescript: true }),
          ]}
          onChange={(value) => {
            setLogs([]);
            setCodeState(value);
          }}
          height={editorHeight + "px"}
        />
      </ResizableBox>

      <div>
        <Button className="mt-2 bg-[#282C34]" onClick={runCode}>
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
        <div className="flex justify-center py-2 my-2 rounded items-start bg-[#282C34]">
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

const JsEditorWrapper: React.FC<{ initCode: string }> = ({ initCode = "" }) => {
  const hashRef = useRef<string>(generateHashFromString(initCode).toString());
  return <JsEditor initCode={initCode} editorId={hashRef.current} />;
};

export default JsEditorWrapper;
