'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Charger le script GloriaFood
        const script = document.createElement('script');
        script.src = 'https://www.fbgcdn.com/embedder/js/ewm2.js';
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>AM TRAPENECK</span>
                    <span className={styles.logoSubtext}>Restaurant Italien</span>
                </Link>

                <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                    <Link href="/" className={styles.navLink}>
                        Accueil
                    </Link>
                    <Link href="/menu" className={styles.navLink}>
                        Menu
                    </Link>
                    <Link href="/contact" className={styles.navLink}>
                        Contact
                    </Link>
                </div>

                <div className={styles.ctaButtons}>
                    <a
                        href="#reservation"
                        className={`glf-button reservation ${styles.btnSecondary}`}
                        data-glf-cuid="YOUR_CUID_HERE"
                        data-glf-ruid="YOUR_RUID_HERE"
                        data-glf-reservation="true"
                    >
                        Réserver
                    </a>
                    <a
                        href="#order"
                        className={`glf-button ${styles.btnPrimary}`}
                        data-glf-cuid="YOUR_CUID_HERE"
                        data-glf-ruid="YOUR_RUID_HERE"
                    >
                        Commander
                    </a>
                </div>

                <button
                    className={styles.mobileMenuToggle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={styles.hamburger}></span>
                    <span className={styles.hamburger}></span>
                    <span className={styles.hamburger}></span>
                </button>
            </div>
        </nav>
    );
}
