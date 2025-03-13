import { useQuery } from "@tanstack/react-query";
import { getTransportes } from "./api/test";
import "./App.css";

function App() {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["nice-key"],
        queryFn: getTransportes,
        refetchOnWindowFocus: false,
    });

    if (isFetching) return <div>Loading...</div>;
    if (isError) return <div>Primo, eso no va...</div>;
    console.log(data);
    return (
        <div className="container">
            {data?.map((item) => (
                <div className="card" key={item.id}>
                    <h2>{item.nombreConductor}</h2>
                    <img
                        src={item.avatar}
                        alt="avatar"
                    />
                    <span>Origen: {item.origen}</span>
                    <span>Distino: {item.destino}</span>
                </div>
            ))}
        </div>
    );
}

export default App;
