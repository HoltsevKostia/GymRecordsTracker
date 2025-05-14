import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { AddFavoriteDTO } from "../interfaces/favoriteInterfaces";
import { useFavoriteStore } from "../stores/favoriteStore";
import FormInput from "../components/ui-ux/formInput";

const favoriteSchema = yup.object().shape({
    content: yup.string().required("Content is required"),
    type: yup
        .number()
        .oneOf([0, 1, 2], "Type must be one of: 0 (Image), 1 (Meme), 2 (Quote)")
        .required("Type is required"),
});


export default function AddFavoriteForm() {
    const { addFavorite, loading, error } = useFavoriteStore();

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<AddFavoriteDTO>({
        resolver: yupResolver(favoriteSchema),
        defaultValues: {
            content: "",
            type: 0,
        },
    });

    const onSubmit = async (data: AddFavoriteDTO) => {
        try {
            await addFavorite(data);
            reset();
        } catch {
            setError("root", { message: "Failed to add favorite." });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" gutterBottom color="white">
                Add Favorite
            </Typography>

            <FormInput name="content" control={control} label="Content (URL or Quote)" errors={errors} />

            <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} label="Type">
                            <MenuItem value={0}>Image</MenuItem>
                            <MenuItem value={1}>Meme</MenuItem>
                            <MenuItem value={2}>Quote</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>

            {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                Add
            </Button>
        </Box>
    );
}
