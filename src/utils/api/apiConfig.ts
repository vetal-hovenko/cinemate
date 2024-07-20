import axios from "axios";

export const apiConfig = axios.create({
    baseURL: process.env.EXPO_PUBLIC_OMDB_API_URL,
    params: {
        apikey: process.env.EXPO_PUBLIC_OMDB_API_KEY,
    },
});

apiConfig.interceptors.response.use((response) => {
    if (response.data && typeof response.data === "object") {
        const transformToCamelCase = (data: any): any => {
            if (Array.isArray(data)) {
                return data.map(transformToCamelCase);
            } else if (data !== null && typeof data === "object") {
                const camelCaseData: { [key: string]: any } = {};

                for (const [key, value] of Object.entries(data)) {
                    const camelCaseKey =
                        key.charAt(0).toLowerCase() + key.slice(1);
                    camelCaseData[camelCaseKey] = transformToCamelCase(value);
                }

                return camelCaseData;
            }

            return data;
        };

        response.data = transformToCamelCase(response.data);
    }

    return response;
});
