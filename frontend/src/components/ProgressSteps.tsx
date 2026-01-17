type Step = {
  number: number;
  label: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
};

const ProgressSteps = ({ steps, currentStep }: Props) => (
  <div className="flex gap-4">
    {steps.map((s) => (
      <div key={s.number} className="flex items-center gap-2">
        <div
          className={
            currentStep >= s.number ? "bg-emerald-500" : "bg-gray-300"
          }
        >
          {s.number}
        </div>
        <span>{s.label}</span>
      </div>
    ))}
  </div>
);

export default ProgressSteps;
