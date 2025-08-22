import MyLoadingAnimationOne from '@/components/MyLoadingAnimationOne';
import { useCart } from '@/contexts/cart-contexts';
import { useForm, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const PaymentMethods = () => {
    // console.log(usePage<any>().props);
    const { req_time, merchant_id, tran_id, api_url, app_url, auth } = usePage<any>().props;

    const [error, setError] = useState('');

    // Start ABA Payload
    const [hash, setHash] = useState('');
    const [shipping, setShipping] = useState(2);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('purchase');
    const [paymentOption, setPaymentOption] = useState('abapay_khqr'); // abapay_khqr

    const [returnUrl, setReturnUrl] = useState(`${app_url}/aba/callback?tran_id=${tran_id}`);
    const [cancelUrl, setCancelUrl] = useState(`${app_url}/aba/cancel?tran_id=${tran_id}`);
    const [continueSuccessUrl, setContinueSuccessUrl] = useState(`${app_url}/aba/success?tran_id=${tran_id}`);
    const [skipSuccessPage, setSkipSuccessPage] = useState(1);
    const [currency, setCurrency] = useState('USD');
    // End ABA Payload

    const { post, progress, processing, transform, errors } = useForm();

    const [isLoading, setIsLoading] = useState(false);

    const { cartItems, clearCart } = useCart();
    const cartItemsSubmit =
        cartItems?.map((item: any) => {
            const itemPrice = parseFloat(item.price);
            const discount_percent = parseFloat(item.discount_percent);
            const discountAmount = (itemPrice * discount_percent) / 100;

            const itemTotal = (itemPrice - (discount_percent ? discountAmount : 0)) * item.cartQuantity;

            return {
                item_id: item.id,
                item_name: item.name,
                price: itemPrice,
                discount_percent: discount_percent,
                quantity: item.cartQuantity,
                sub_total: itemTotal,
            };
        }) || [];
    const total_amount = +cartItemsSubmit.reduce((sum, item) => sum + item.sub_total, 0);

    useEffect(() => {
        setEmail(auth?.user?.email || '');
        setPhone(auth?.user?.phone || '');
    }, []);

    const handleCheckout = () => {
        if (typeof window === 'undefined') return; // safety no-op on server

        const orderData = {
            shop_id: cartItems[0]?.shop_id || null,
            note: '',
            total_amount: +total_amount + shipping,
            payment_method: paymentOption,
            currency: currency,
            tran_id: tran_id,
            req_time: req_time,
            shipping_price: shipping,
            shipping_lat: 0.0,
            shipping_lng: 0.0,
            items: cartItemsSubmit,
        };

        transform(() => orderData);
        post(`/orders`, {
            preserveScroll: true,
            onSuccess: (page: any) => {
                // router.visit('/');
                // if (page.props.flash?.success) {
                //     toast.success('Success', {
                //         description: page.props.flash.success,
                //     });
                // }
                if (page.props.flash?.error) {
                    toast.error('Error', {
                        description: page.props.flash.error,
                    });
                }
            },
            onError: (e) => {
                toast.error('Error', {
                    description: 'Failed to create.' + JSON.stringify(e, null, 2),
                });
            },
            onFinish: () => {
                setIsLoading(false);
                console.log('Finally!');
            },
        });
    };

    return (
        <div className="container">
            <div className={'text-primary mb-4 text-lg leading-none font-bold'}>
                <p>Create Order</p>
            </div>

            <button
                id="checkout_button"
                onClick={() => {
                    setIsLoading(true);
                    // handleGetHash();
                    handleCheckout();
                }}
                disabled={isLoading}
                className="bg-primary flex w-full cursor-pointer items-center gap-[10px] rounded-[8px] border border-transparent p-[6px] text-start text-white shadow-[0_1px_5px_rgb(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:p-[10px] dark:bg-white/20 dark:hover:bg-white/25"
            >
                <div className="flex w-full items-center justify-between">
                    <div className="flex-1">
                        <p className="text-[16px] font-semibold">Order Now</p>
                        <p className="text-[14px] font-normal">Pay On Delivery</p>
                    </div>
                    <span className="bg-accent flex cursor-pointer items-center justify-center rounded-[4px] p-1 dark:bg-white/10">
                        <ChevronRight className="stroke-foreground dark:stroke-gray-200" />
                    </span>
                </div>
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {isLoading && <MyLoadingAnimationOne />}
        </div>
    );
};

export default PaymentMethods;
