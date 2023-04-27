import { InputHTMLAttributes, PropsWithRef, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormInput = forwardRef<HTMLInputElement, PropsWithRef<IProps>>(
  ({ label, ...rest }, ref) => {
    return (
      <>
        {label ? (
          <label
            htmlFor={rest.name || ""}
            className="mb-1 text-sm font-bold text-slate-500"
          >
            {label}
          </label>
        ) : null}
        <input ref={ref} className="mb-2 rounded px-3 py-2" {...rest} />
      </>
    );
  }
);

export default FormInput;
