type Parts = (string | false | undefined)[];

export default function twMerge(...parts: Parts) {
    return parts.filter(Boolean).join(" ");
}
