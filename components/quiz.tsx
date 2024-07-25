"use client";
import { autocompletion } from "@codemirror/autocomplete";
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup } from "codemirror";
import { ResizableBox } from "react-resizable";
import CodeMirror from "@uiw/react-codemirror";

interface QuizData {
  title: string;
  query: string;
  options: string[];
  correct: number;
}

const Quiz = ({ questions }: { questions: QuizData[] }) => {
  return (
    <div>
      {questions.map((data, index) => (
        <div key={`${data.query}-${data.correct}`} className="flex-col">
          <h4>{data.title}</h4>
          <CodeMirror
            theme={"dark"}
            value={data.query}
            extensions={[
              basicSetup,
              autocompletion(),
              javascript({ jsx: true, typescript: true }),
            ]}
          />
          <div className="flex-col my-2">
            {data.options.map((option, i) => (
              <div
                className="btn flex bg-[#282C34] my-1"
                key={`${option}-${i + 1}`}
              >{`${option}`}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
