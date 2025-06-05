import type { Subscription } from "../types/Subscription";

type Props = {
    subscriptions: Subscription[];
};

export default function GetValue({ subscriptions }: Props) {
    
    const total = subscriptions.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
    return total;
}
