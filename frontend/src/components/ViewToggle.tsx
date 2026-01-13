type ViewToggleProps = {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
};

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-2 bg-emerald-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange("grid")}
        className={`px-4 py-2 rounded-md transition-all font-semibold ${
          view === "grid"
            ? "bg-emerald-500 text-white shadow-md"
            : "text-emerald-700 hover:bg-emerald-200"
        }`}
        title="Grid View"
      >
        ⊞ Grid
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`px-4 py-2 rounded-md transition-all font-semibold ${
          view === "list"
            ? "bg-emerald-500 text-white shadow-md"
            : "text-emerald-700 hover:bg-emerald-200"
        }`}
        title="List View"
      >
        ☰ List
      </button>
    </div>
  );
};

export default ViewToggle;
