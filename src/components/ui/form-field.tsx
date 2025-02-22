interface FormFieldProps {
    label: string;
    description?: string;
    error?: string;
    children: React.ReactNode;
}

export function FormField({
    label,
    description,
    error,
    children,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </label>
            {children}
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
