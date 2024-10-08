import { Metadata } from "next";

/**
 * Props for an embed.
 */
type EmbedProps = {
    /**
     * The title of the embed.
     */
    title: string;

    /**
     * The description of the embed.
     */
    description: string;
};

/**
 * An embed for a page.
 *
 * @param props the embed props
 * @returns the embed jsx
 */
const Embed = ({ title, description }: EmbedProps): Metadata => {
    return {
        title: title,
        openGraph: {
            title: `${title}`,
            description: description,
        },
    };
};
export default Embed;
