import * as fs from "node:fs";
import { Stats } from "node:fs";
import path from "node:path";

/**
 * The regex to match for metadata.
 */
const METADATA_REGEX: RegExp = /---\s*([\s\S]*?)\s*---/;

/**
 * The directory docs are stored in.
 */
const DOCS_DIR: string = path.join(process.cwd(), "docs");

/**
 * Get the content to
 * display in the docs.
 */
export const getDocsContent = (): DocsContentMetadata[] => {
    const content: DocsContentMetadata[] = [];
    for (const directory of getRecursiveDirectories(DOCS_DIR)) {
        content.push(...getMetadata<DocsContentMetadata>(DOCS_DIR, directory));
    }
    return content;
};

/**
 * Get the metadata of mdx
 * files in the given directory.
 *
 * @param parent the parent directory to search
 * @param directory the directory to search
 */
const getMetadata = <T extends MDXMetadata>(
    parent: string,
    directory: string
): T[] => {
    const files: string[] = fs
        .readdirSync(directory)
        .filter((file: string): boolean => {
            const extension: string = path.extname(file); // The file extension
            return extension === ".md" || extension === ".mdx";
        }); // Read the MDX files
    return files.map((file: string): T => {
        const filePath: string = path.join(directory, file); // The path of the file
        return {
            slug: filePath
                .replace(parent, "")
                .replace(/\\/g, "/") // Normalize the path
                .replace(/\.mdx?$/, "")
                .substring(1),
            extension: path.extname(file),
            ...parseMetadata<T>(fs.readFileSync(filePath, "utf-8")),
        }; // Map each file to its metadata
    });
};

/**
 * Parse the metadata from
 * the given content.
 *
 * @param content the content to parse
 * @returns the metadata and content
 * @template T the type of metadata
 */
const parseMetadata = <T extends MDXMetadata>(content: string): T => {
    const metadataBlock: string = METADATA_REGEX.exec(content)![1]; // Get the block of metadata
    content = content.replace(METADATA_REGEX, "").trim(); // Remove the metadata block from the content
    const metadata: Partial<{
        [key: string]: string;
    }> = {}; // The metadata to return

    // Parse the metadata block as a key-value pair
    metadataBlock
        .trim() // Trim any leading or trailing whitespace
        .split("\n") // Get each line
        .forEach((line: string): void => {
            const split: string[] = line.split(": "); // Split the metadata by the colon
            let value: string = split[1].trim(); // The value of the metadata
            value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
            metadata[split[0].trim()] = value; // Add the metadata to the object
        });

    // Return the metadata and content. The initial
    // slug is empty, and is defined later on.
    return { ...metadata, content } as T;
};

/**
 * Get directories recursively
 * in the given directory.
 *
 * @param directory the directory to search
 * @return the directories
 */
const getRecursiveDirectories = (directory: string): string[] => {
    const directories: string[] = [directory]; // The directories to return
    for (const sub of fs.readdirSync(directory)) {
        const subDirPath: string = path.join(directory, sub); // The sub dir path
        const stats: Stats = fs.statSync(subDirPath); // Get file stats
        if (stats.isDirectory()) {
            directories.push(...getRecursiveDirectories(subDirPath)); // Recursively get directories
        }
    }
    return directories;
};
