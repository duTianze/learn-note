import Link from "next/link";
export default () => {
    const clients = [
        { id: "1", name: "Maximilian" },
        { id: "2", name: "Manuel" },
    ];
    return (
        <div>
            <h1>Clients page666</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        <Link
                            className="link"
                            href={{
                                pathname: "/clients/[id]",
                                query: { id: client.id },
                            }}
                        >
                            {client.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
