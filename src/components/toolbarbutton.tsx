type ToolbarButton = {
  fn: () => void;
  icon: string;
};

export default function ToolbarButton({ fn, icon }: ToolbarButton) {
  return (
    <>
      <button
        onClick={fn}
        className="flex items-center justify-center w-8 h-8 text-md border-grey-500 border-0 rounded-xl hover:shadow-md transition ease-in-out bg-white"
      >
        {icon}
      </button>
    </>
  );
}
