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
                <a
                    href="#order"
                    className="glf-button btn-primary"
                    data-glf-cuid="YOUR_CUID_HERE"
                    data-glf-ruid="YOUR_RUID_HERE"
                >
                    Commander en Ligne
                </a>
            )}
            {showReservationButton && (
                <a
                    href="#reservation"
                    className="glf-button reservation btn-secondary"
                    data-glf-cuid="YOUR_CUID_HERE"
                    data-glf-ruid="YOUR_RUID_HERE"
                    data-glf-reservation="true"
                >
                    Réserver une Table
                </a>
            )}
        </div>
    );
}
