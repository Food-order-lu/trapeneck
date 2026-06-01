import Link from 'next/link';
import { ORDER_URL } from '@/lib/order';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    /** When set, the whole card navigates to this internal route. */
    href?: string;
    /** When true, clicking the card opens the GloriaFood reservation pop-up. */
    reservation?: boolean;
    /** When true, the whole card links to the external online-ordering page. */
    order?: boolean;
}

export default function ServiceCard({ icon, title, description, href, reservation, order }: ServiceCardProps) {
    const content = (
        <>
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={styles.card}>
                {content}
            </Link>
        );
    }

    if (order) {
        return (
            <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
            >
                {content}
            </a>
        );
    }

    if (reservation) {
        // The card stays a styled block; an invisible, full-size glf-button
        // overlay captures the click so the GloriaFood reservation pop-up opens
        // without the global .glf-button styles affecting the card layout.
        return (
            <div className={styles.card} style={{ position: 'relative' }}>
                {content}
                <span
                    className="glf-button reservation"
                    data-glf-cuid={process.env.NEXT_PUBLIC_GLORIAFOOD_CUID}
                    data-glf-ruid={process.env.NEXT_PUBLIC_GLORIAFOOD_RUID}
                    data-glf-reservation="true"
                    aria-label={`${title} — Réserver une table`}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        zIndex: 2,
                    }}
                />
            </div>
        );
    }

    return <div className={styles.card}>{content}</div>;
}
