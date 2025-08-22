import { Button } from '@/components/ui/button';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { PhoneCallIcon } from 'lucide-react';

const ContactUsButton = () => {
    const { t } = useTranslation();
    return (
        <Link href="/contact-us">
            <Button variant="default">
                <PhoneCallIcon /> {t('Contact Support')}
            </Button>
        </Link>
    );
};

export default ContactUsButton;
