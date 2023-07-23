import { useRouter } from "next/router";

const ClientProject = () => {
    const router = useRouter();

    return (
        <div>
            <h1>this is content of {JSON.stringify(router.query)}</h1>
        </div>
    );
};

export default ClientProject;
