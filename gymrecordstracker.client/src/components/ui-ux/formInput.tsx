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
 * Компонент обгортки над MUI TextField з інтеграцією через react-hook-form.
 *
 * @component
 * @param {FormInputProps} props - Пропси компонента.
 * @param {string} props.name - Назва поля у формі.
 * @param {any} props.control - Контролер з useForm().
 * @param {string} props.label - Мітка поля.
 * @param {string} [props.type] - Тип поля (text, password, email тощо).
 * @param {any} props.errors - Об'єкт помилок з react-hook-form.
 * @returns {JSX.Element} Поле вводу з валідацією та відображенням помилки.
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