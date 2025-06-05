import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Subscription } from "../../types/Subscription";
import SubscriptionForm from "./new";

export default function EditSubscriptionPage() {
    const { id } = useParams<{ id: string }>();
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3001/subscriptions/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar assinatura");
                return res.json();
            })
            .then((data: Subscription) => {
                setSubscription(data);
            })
            .catch((err) => {
                console.error(err);
                setError("Assinatura não encontrada.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!subscription) return <p>Assinatura não encontrada.</p>;

    return <SubscriptionForm subscription={subscription} />;
}