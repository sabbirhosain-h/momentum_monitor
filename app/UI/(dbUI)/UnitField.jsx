function UnitField({
  id,
  label,
  icon,
  placeholder = "",
  value = "",
  onChange,
  unit,
  onUnitChange,
  units = [],
  error,
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-slate-600"
      >
        {label}
      </label>

      <div className="flex w-full">
        <div className="relative flex-1">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </span>
          )}

          <input
            id={id}
            name={id}
            type="number"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`w-full rounded-l-lg border bg-slate-50 py-2.5 pr-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 ${
              icon ? "pl-10" : "pl-3"
            } ${
              error
                ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                : "border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            }`}
          />
        </div>

        {units.length > 0 && (
          <div className="flex overflow-hidden rounded-r-lg border border-l-0 border-slate-200">
            {units.map((u) => {
              const isActive = unit === u;

              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => onUnitChange(u)}
                  aria-pressed={isActive}
                  className={`px-3 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-teal-500 text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {u}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default UnitField;