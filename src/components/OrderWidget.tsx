'use client';

interface OrderWidgetProps {
    showOrderButton?: boolean;
    showReservationButton?: boolean;
}

export default function OrderWidget({
    showOrderButton = true,
    showReservationButton = true
}: OrderWidgetProps) {
    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {showOrderButton && (
                <span
                    className="glf-button btn-primary"
                    data-glf-cuid={process.env.NEXT_PUBLIC_GLORIAFOOD_CUID}
                    data-glf-ruid={process.env.NEXT_PUBLIC_GLORIAFOOD_RUID}
                    style={{ cursor: 'pointer' }}
                >
                    Commander en Ligne
                </span>
            )}
            {showReservationButton && (
                <span
                    className="glf-button reservation btn-secondary"
                    data-glf-cuid={process.env.NEXT_PUBLIC_GLORIAFOOD_CUID}
                    data-glf-ruid={process.env.NEXT_PUBLIC_GLORIAFOOD_RUID}
                    data-glf-reservation="true"
                    style={{ cursor: 'pointer' }}
                >
                    Réserver une Table
                </span>
            )}
        </div>
    );
}
