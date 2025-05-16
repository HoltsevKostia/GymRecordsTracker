import { useForm } from "react-hook-form";
import { Meta, StoryFn } from "@storybook/react";
import FormInput from "../components/ui-ux/formInput";

/**
 * Storybook stories for FormInput component.
 *
 * Includes variations for text, email, and password input fields.
 * Integrates with react-hook-form for control and validation display.
 *
 * @module FormInput.stories
 */


export default {
    title: "Components/FormInput",
    component: FormInput,
} as Meta;

const Template: StoryFn<any> = (args) => {
    const { control, formState: { errors } } = useForm({
        defaultValues: {
            [args.name]: "",
        },
    });

    return (
        <form>
            <FormInput {...args} control={control} errors={errors} />
        </form>
    );
};

export const TextInput = Template.bind({});
TextInput.args = {
    name: "username",
    label: "Username",
    type: "text",
};

export const EmailInput = Template.bind({});
EmailInput.args = {
    name: "email",
    label: "Email",
    type: "email",
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
    name: "password",
    label: "Password",
    type: "password",
};
