/**
 * Get request to the specified URL and return typed response
 *
 * @template T - Expected type for JSON response
 * @param {string} url - The URL to which the request will be sent
 * @returns {Promise<T>} - A promise that resolves the the response typed as T
 *
 * @throws {Error} Thrown an error if the reponse is not OK
 *
 * @example
 * interface User {
 *  id: number;
 *  age: number;
 * }
 *
 * const user = await get<User>("http://api.example.com/users/1");
 */
export async function get<T>(url: string): Promise<T> {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("some error");
        const data = (await res.json()) as T;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
