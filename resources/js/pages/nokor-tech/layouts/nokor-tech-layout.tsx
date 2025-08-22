import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/contexts/cart-contexts';
import useTranslation from '@/hooks/use-translation';
import { type ReactNode } from 'react';
import MyFooter from '../components/my-footer';
import MyHeader from '../components/my-header';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { UserOrdersFloatButton } from '@/components/UserOrdersFloatButton';

interface NokorTechLayoutProps {
    children: ReactNode;
}

const NokorTechLayout = ({ children }: NokorTechLayoutProps) => {
    const { currentLocale } = useTranslation();
    return (
        <>
            <CartProvider>
                <MyHeader />

                <div className={`min-h-[50vh]`}>{children}</div>
                <Toaster />
                <MyFooter />
                
                <UserOrdersFloatButton />
                <ScrollToTopButton />
            </CartProvider>
        </>
    );
};

export default NokorTechLayout;
