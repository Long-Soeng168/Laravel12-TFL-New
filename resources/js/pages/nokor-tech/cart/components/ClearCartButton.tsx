import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-contexts';
import { Trash2 } from 'lucide-react';

const ClearCartButton = () => {
    const { clearCart } = useCart();

    return (
        <Button
            onClick={clearCart}
            variant="outline"
            className="border-destructive text-destructive hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
            <Trash2 />
            Clear Cart
        </Button>
    );
};

export default ClearCartButton;
