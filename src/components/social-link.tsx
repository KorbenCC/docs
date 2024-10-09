import SimpleTooltip from "@/components/simple-tooltip";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";
import { icons } from "lucide-react";

type SocialLinkProps = SocialLink & {
    className?: string | undefined;
};

const SocialLink = ({
    className,
    name,
    tooltip,
    logo,
    href,
}: SocialLinkProps) => (
    <SimpleTooltip content={tooltip}>
        <Link
            className={cn(
                "w-6 h-6 hover:opacity-75 transition-all transform-gpu select-none",
                className
            )}
            href={href}
            target="_blank"
            draggable={false}
        >
            {logo.startsWith("./") ? (
                <Image
                    src={`/media/${logo.substring(2)}`}
                    alt={`${name}'s Logo`}
                    fill
                    draggable={false}
                />
            ) : (
                <Icon
                    className="opacity-95 w-full h-full"
                    name={logo as keyof typeof icons}
                />
            )}
        </Link>
    </SimpleTooltip>
);
export default SocialLink;
