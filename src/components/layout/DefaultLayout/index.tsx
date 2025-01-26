import { Header } from '../Header'
import { LayoutContainer } from './styles'

interface DefaultLayoutProps {
    children: React.ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <Header />
            <LayoutContainer>
                {children}
            </LayoutContainer>
        </>
    )
} 