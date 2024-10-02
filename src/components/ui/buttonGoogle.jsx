import Link from "next/link";
import IconGoogle from "@/components/Icons/googleIcon";

const ButtonGoogle = ({ text = "Iniciar Sesión", href = "#" }) => {
    return (
        <Link className="bg-[#F0F0FF] gap-2 border min-w-32 min-h-12 border-accent rounded-lg flex justify-center items-center hover:bg-accentBackground"  href={href}>
            <IconGoogle width="20px" height="20px" />
            <span>{text}</span>
        </Link>
    );
}

export default ButtonGoogle