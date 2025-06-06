import { useState, useEffect } from "react";
import type { Subscription } from "../../types/Subscription";

type SubscriptionFormProps = {
    subscription?: Subscription;
};

export default function SubscriptionForm({
    subscription,
}: SubscriptionFormProps) {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [price, setPrice] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (subscription) {
            setName(subscription.name);
            setStartDate(subscription.startDate);
            setPaymentMethod(subscription.paymentMethod);
            setPrice(subscription.price?.toString() || "");
        }
    }, [subscription]);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const method = subscription?.id ? "PATCH" : "POST";
            const url = subscription?.id
                ? `http://localhost:3001/subscriptions/${subscription.id}`
                : "http://localhost:3001/subscriptions";

            const priceNumber = parseFloat(price);
            const body = JSON.stringify({
                name,
                startDate,
                paymentMethod,
                price: Number.isNaN(priceNumber) ? 0 : priceNumber.toFixed(2),
            });

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body,
            });

            if (!response.ok) {
                throw new Error("Erro na requisição");
            } else {
                setTimeout(() => {
                    window.location.href = "/subscriptions";
                }, 1000);
            }
        } catch (err) {
            setError("Erro ao salvar a assinatura.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="sub-form">
            <form onSubmit={handleSubmit}>
                {subscription ? (
                    <h1 style={{ textAlign: "center" }}> Editar Inscrição</h1>
                ) : (
                    <h1 style={{ textAlign: "center" }}> Nova inscrição</h1>
                )}
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={3}
                        maxLength={50}
                    />
                </div>

                <div>
                    <label htmlFor="startDate">Data de início</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="paymentMethod">Forma de pagamento</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="pix">Pix</option>
                        <option value="credit card">Cartão de Crédito</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Preço (R$)</label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? "Salvando..."
                        : subscription
                        ? "Atualizar"
                        : "Criar"}
                </button>
            </form>
        </div>
    );
}
