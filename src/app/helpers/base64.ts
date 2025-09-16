export class Base64Helper {
    // Method to encode a string to Base64
    static encode(input: string): string {
        try {
            return btoa(unescape(encodeURIComponent(input)));
        } catch (error) {
            console.error('Error encoding to Base64:', error);
            throw new Error('Failed to encode string to Base64');
        }
    }

    // Method to decode a Base64 string
    static decode(base64: string): string {
        try {
            return decodeURIComponent(escape(atob(base64)));
        } catch (error) {
            console.error('Error decoding from Base64:', error);
            throw new Error('Failed to decode Base64 string');
        }
    }
}