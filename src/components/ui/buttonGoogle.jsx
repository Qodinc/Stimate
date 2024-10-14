import IconGoogle from "@/components/Icons/googleIcon";

const ButtonGoogle = ({ text , href = "/", onClick }) => {
    return (
        <button 
            className="bg-[#F0F0FF] gap-2 border min-w-32 min-h-12 border-accent rounded-lg flex justify-center items-center hover:bg-accentBackground"  
            onClick={onClick}
        >
            <IconGoogle width="20px" height="20px" />
            <span>{text}</span>
        </button>
    );
}

export default ButtonGoogle