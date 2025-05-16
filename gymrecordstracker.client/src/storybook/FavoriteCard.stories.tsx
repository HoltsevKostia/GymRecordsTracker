import { Meta, StoryFn } from "@storybook/react";
import { FavoriteCard } from "../components/ui-ux/favoriteCard";
import { FavoriteDTO } from "../interfaces/favoriteInterfaces";
import { Box } from "@mui/material";

/**
 * Storybook stories for FavoriteCard component.
 *
 * Displays three variations: Meme, Image, and Quote based on the `type` property.
 *
 * @module FavoriteCard.stories
 */

export default {
    title: "Components/FavoriteCard",
    component: FavoriteCard,
} as Meta;

const Template: StoryFn<{ favorite: FavoriteDTO }> = (args) => (
    <Box width={300}>
        <FavoriteCard {...args} />
    </Box>
);

export const MemeCard = Template.bind({});
MemeCard.args = {
    favorite: {
        id: 1,
        userId: 1,
        type: 1,
        content: "https://glavcom.ua/img/article/8684/6_main-v1660641284.jpg",
    },
};

export const ImageCard = Template.bind({});
ImageCard.args = {
    favorite: {
        id: 2,
        userId: 1,
        type: 0,
        content: "https://picsum.photos/300",
    },
};

export const QuoteCard = Template.bind({});
QuoteCard.args = {
    favorite: {
        id: 3,
        userId: 1,
        type: 2,
        content: "Do or do not. There is no try.",
    },
};
