import cat from "../../public/images/404.jpeg";
import Image from "next/image";

export default () => {
    return (
        <Image
            style={{
                display: "block",
                margin: "auto",
            }}
            src={cat}
            alt="404"
        />
    );
};
