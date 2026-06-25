import type { Publication } from '@/lib/firebase';
import styles from './PublicationCard.module.css';

interface Props {
    publication: Publication;
}

export default function PublicationCard({ publication }: Props) {
    const { title, dateLabel, description, imageUrl } = publication;

    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
                ) : null}
                {dateLabel ? <span className={styles.dateBadge}>{dateLabel}</span> : null}
            </div>
            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                {description ? <p className={styles.description}>{description}</p> : null}
            </div>
        </article>
    );
}
