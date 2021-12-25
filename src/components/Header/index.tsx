import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink';


export const Header = () => {
    const { asPath } = useRouter()

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <a href="/">
                    <img src="/images/logo.svg" alt="Logo ig news" />
                </a>
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a >Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts" >
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}