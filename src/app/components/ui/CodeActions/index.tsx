import { FC } from 'react';

interface CodeActionsProps {
  runEditorCode: () => void;
  isLoading: boolean;
}

const CodeActions: FC<CodeActionsProps> = ({ runEditorCode, isLoading }) => {
  return (
    <div className="flex space-x-2 w-full justify-end">
      <button
        className="disabled:opacity-75 disabled:cursor-not-allowed bg-black dark:bg-gray-700 hover:bg-black/20 text-white rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none  focus:outline-none focus:shadow-outline"
        onClick={runEditorCode}
        disabled={isLoading}
      >
        Run Code
      </button>
      {/* <button
        className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        onClick={refactorCode}
        disabled={isLoading}
      >
        Refactor Code
      </button> */}
    </div>
  );
};

export default CodeActions;
