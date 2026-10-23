import Link from 'next/link';
import type { Publication } from '@/lib/firebase';
import styles from './PublicationCard.module.css';

interface Props {
    publication: Publication;
    // When set, the whole card links there (home page → event in the gallery).
    href?: string;
    // When set (and no href), clicking the image opens it enlarged.
    onImageClick?: (url: string, alt: string) => void;
}

export function publicationAnchor(id: string): string {
    return `pub-${id}`;
}

export default function PublicationCard({ publication, href, onImageClick }: Props) {
    const { id, title, dateLabel, description, imageUrl } = publication;

    const content = (
        <>
            <div className={styles.imageWrapper}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className={`${styles.image} ${!href && onImageClick ? styles.zoomable : ''}`}
                        loading="lazy"
                        onClick={!href && onImageClick ? () => onImageClick(imageUrl, title) : undefined}
                    />
                ) : null}
                {dateLabel ? <span className={styles.dateBadge}>{dateLabel}</span> : null}
            </div>
            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                {description ? <p className={styles.description}>{description}</p> : null}
            </div>
        </>
    );

    return (
        <article className={styles.card} id={href ? undefined : publicationAnchor(id)}>
            {href ? (
                <Link href={href} className={styles.link} aria-label={`Voir l'événement : ${title}`}>
                    {content}
                </Link>
            ) : content}
        </article>
    );
}
