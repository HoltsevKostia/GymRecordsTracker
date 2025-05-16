import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    type?: string;
    errors: any;
}



/**
 * Wrapper component around MUI TextField with react-hook-form integration.
 *
 * @component
 * @param {FormInputProps} props - Component props.
 * @param {string} props.name - Field name in the form.
 * @param {any} props.control - Controller from useForm().
 * @param {string} props.label - Field label.
 * @param {string} [props.type] - Field type (text, password, email, etc.).
 * @param {any} props.errors - Error object from react-hook-form.
 * @returns {JSX.Element} Input field with validation and error display.
 */

export default function FormInput({ name, control, label, type = "text", errors }: FormInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    fullWidth
                    margin="normal"
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                />
            )}
        />
    );
}