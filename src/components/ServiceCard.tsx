import Link from 'next/link';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    /** When set, the whole card navigates to this route (e.g. the menu page). */
    href?: string;
    /** When true, clicking the card opens the GloriaFood reservation pop-up. */
    reservation?: boolean;
    /** When true, clicking the card opens the GloriaFood ordering pop-up. */
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

    if (reservation || order) {
        // The card stays a styled block; an invisible, full-size glf-button
        // overlay captures the click so the GloriaFood pop-up (reservation or
        // ordering, depending on the mode) opens without the global .glf-button
        // styles affecting the card layout.
        return (
            <div className={styles.card} style={{ position: 'relative' }}>
                {content}
                <span
                    className={reservation ? 'glf-button reservation' : 'glf-button'}
                    data-glf-cuid={process.env.NEXT_PUBLIC_GLORIAFOOD_CUID}
                    data-glf-ruid={process.env.NEXT_PUBLIC_GLORIAFOOD_RUID}
                    data-glf-reservation={reservation ? 'true' : undefined}
                    aria-label={`${title} — ${reservation ? 'Réserver une table' : 'Commander en ligne'}`}
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
