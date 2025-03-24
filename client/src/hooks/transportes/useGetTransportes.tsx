import { useQuery } from "@tanstack/react-query";
import { TrasporteRepository } from "@repositories/Transporte/TransporteRepository";

const useGetTransporte = () => {
    return useQuery({
        refetchOnWindowFocus: false,
        queryKey: ["getTransportes"],
        queryFn: TrasporteRepository.getTransportes,
    });
};

export default useGetTransporte;
