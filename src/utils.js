export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
};
export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.');
        return `${result} VNĐ`;
    } catch (error) {
        return null;
    }
};
