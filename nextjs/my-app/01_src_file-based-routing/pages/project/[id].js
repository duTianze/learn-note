import { useRouter } from "next/router";

const ProjectItem = () => {
    const router = useRouter();
    console.log("@@@", router.pathname);
    console.log("@@@", router.query);

    return (
        <div>
            <h1>Project Item page</h1>
        </div>
    );
};
export default ProjectItem;
