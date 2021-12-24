import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string;
}
//{...rest} pegando todas propriedades que tem no link

export const ActiveLink = ({ children, activeClassName, ...rest }: ActiveLinkProps) => {
    const { asPath } = useRouter();

    //se o href for igual ao path passar active
    const className = asPath === rest.href ? activeClassName : '';

    //clone ta clonando os elementos e add o className que passei
    return (
        <Link {...rest}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    );
}