import { useRouter } from "next/router";
export default () => {
    const router = useRouter();

    const loadClientProjectHandler = () => {
        router.push({
            pathname: "/clients/[id]/[clientprojectid]",
            query: {
                id: router.query.id,
                clientprojectid: "project-a",
            },
        });
    };
    return (
        <div>
            <h1>project of client</h1>
            <button onClick={loadClientProjectHandler}>see project a</button>
        </div>
    );
};
