'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>AM TRAPENECK</span>
                    <span className={styles.logoSubtext}>Brasserie-Pizzeria</span>
                </Link>

                <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                    <Link href="/" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                        Accueil
                    </Link>
                    <Link href="/menu" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                        Menu
                    </Link>
                    <Link href="/galerie" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                        Galerie
                    </Link>
                    <Link href="/contact" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                        Contact
                    </Link>
                </div>

                <div className={styles.ctaButtons}>
                    <a
                        href="#reservation"
                        className={`glf-button reservation ${styles.btnSecondary}`}
                        data-glf-cuid={process.env.NEXT_PUBLIC_GLORIAFOOD_CUID}
                        data-glf-ruid={process.env.NEXT_PUBLIC_GLORIAFOOD_RUID}
                        data-glf-reservation="true"
                    >
                        Réserver
                    </a>
                    <a
                        href="#order"
                        className={`glf-button ${styles.btnPrimary}`}
                        data-glf-cuid={process.env.NEXT_PUBLIC_GLORIAFOOD_CUID}
                        data-glf-ruid={process.env.NEXT_PUBLIC_GLORIAFOOD_RUID}
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
