export default function formatDate(input: string | Date) {
    let date: Date;

    if (typeof input === "string") {
        const [year, month, day] = input.split("T")[0].split("-").map(Number);
        date = new Date(year, month - 1, day);
    } else {
        date = input;
    }

    if (isNaN(date.getTime())) return "Data inválida";

    return new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}