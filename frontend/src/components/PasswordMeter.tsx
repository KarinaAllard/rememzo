import { useTranslation } from "../hooks/useTranslation";

type PasswordMeterProps = {
  password: string;
};

type StrengthKey = "weak" | "medium" | "strong" | "veryStrong";

export const PasswordMeter = ({ password }: PasswordMeterProps) => {
  const { t } = useTranslation();

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[\W]/.test(password)) score += 1;
    return score;
  };

  const score = getPasswordStrength();
  const width = (score / 4) * 100;

  const strengthMap: StrengthKey[] = ["weak", "weak", "medium", "strong", "veryStrong"];
  const label = t(strengthMap[score]);

  const color = (() => {
    switch (score) {
      case 0:
      case 1:
        return "bg-neutral-700";
      case 2:
        return "bg-neutral-500";
      case 3:
        return "bg-neutral-300";
      case 4:
        return "bg-(--success)";
      default:
        return "";
    }
  })();

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="h-1 w-full bg-neutral-800 rounded">
        <div
          className={`${color} h-1 rounded`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-xs font-medium text-(--text) text-right w-full">
        {label}
      </span>
    </div>
  );
};