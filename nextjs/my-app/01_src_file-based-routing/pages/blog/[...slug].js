import { useRouter } from "next/router";

export default () => {
    const router = useRouter();
    console.log(router.query);

    return (
        <div>
            <h1>Blog Page</h1>
        </div>
    );
};
