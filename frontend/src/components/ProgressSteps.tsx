import { motion } from "framer-motion";

type Step = {
  number: number;
  label: string;
  icon?: string;
};

type ProgressStepsProps = {
  steps: Step[];
  currentStep: number;
};

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
              currentStep >= step.number
                ? "bg-emerald-500 text-white dark:bg-emerald-600"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            {currentStep > step.number ? "✓" : step.icon || step.number}
          </div>
          <span
            className={`ml-2 font-semibold ${
              currentStep >= step.number
                ? "text-emerald-700 dark:text-emerald-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-1 mx-4 transition-all ${
                currentStep > step.number
                  ? "bg-emerald-500 dark:bg-emerald-600"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
