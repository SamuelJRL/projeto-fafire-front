import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { FiPlus } from "react-icons/fi";
import type { Subscription } from "../../types/Subscription";
import FormatDate from "../../utils/formatDate";

export default function Subscriptions() {
    const BASE_API_URL = "http://localhost:3001/subscriptions";

    const [subscriptions, setSubscriptions] = useState<Array<Subscription>>();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSubs = subscriptions?.filter((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function getClosestNextBilling(
        subs: Subscription[] | undefined
    ): Subscription | null {
        if (!subs || subs.length === 0) return null;

        const today = new Date();

        let closest = subs[0];
        let closestDate = getNextBillingDate(closest.startDate);
        let minDiff = closestDate.getTime() - today.getTime();

        for (const sub of subs) {
            const nextBilling = getNextBillingDate(sub.startDate);
            const diff = nextBilling.getTime() - today.getTime();

            if (diff >= 0 && diff < minDiff) {
                closest = sub;
                closestDate = nextBilling;
                minDiff = diff;
            }
        }

        return closest;
    }

    function getNextBillingDate(startDateStr: string): Date {
        const [year, month, day] = startDateStr.split("-").map(Number);
        const startDate = new Date(year, month - 1, day);
        const today = new Date();

        let nextDate = new Date(startDate);
        const originalDay = startDate.getDate();

        if (startDate >= today) return startDate;

        while (nextDate < today) {
            let newMonth = nextDate.getMonth() + 1;
            let newYear = nextDate.getFullYear();

            if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            }

            const lastDay = new Date(newYear, newMonth + 1, 0).getDate();

            const newDay = Math.min(originalDay, lastDay);

            nextDate = new Date(newYear, newMonth, newDay);
        }

        return nextDate;
    }

    useEffect(() => {
        fetch(BASE_API_URL)
            .then((response) => response.json())
            .then((data) => setSubscriptions(data))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderList = (subsList: Array<Subscription>) => {
        return (
            <>
                {subsList.map((item) => (
                    <Card key={item.id} subscription={item} />
                ))}
            </>
        );
    };

    const closestSub = getClosestNextBilling(subscriptions);
    const closestDate = closestSub
        ? getNextBillingDate(closestSub.startDate)
        : null;

    return (
        <div className="sub-container">
            <div className="sub-resume">
                <h2>Total a pagar no mês: 39,00</h2>
                <h2>
                    Próxima cobrança:{" "}
                    {closestDate
                        ? FormatDate(closestDate.toISOString())
                        : "Nenhuma próxima cobrança"}
                </h2>
            </div>
            <div className="sub-filter">
                <input
                    type="text"
                    className="sub-search"
                    placeholder="search by name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <Link to={"/subscriptions/new"}>
                    <button className="sub-add">
                        <FiPlus size={20} /> Subscription
                    </button>
                </Link>
            </div>
            <div className="sub-list">
                {filteredSubs && renderList(filteredSubs)}
            </div>
        </div>
    );
}
