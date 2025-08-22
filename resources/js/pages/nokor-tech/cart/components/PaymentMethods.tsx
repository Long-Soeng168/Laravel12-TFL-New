import MyLoadingAnimationOne from '@/components/MyLoadingAnimationOne';
import { useCart } from '@/contexts/cart-contexts';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
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

    const [paywayReady, setPaywayReady] = useState(false);
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
        if (typeof window === 'undefined') return; // no-op on server
        // Dynamically load the script only once
        if (!document.getElementById('aba-payway-script')) {
            const script = document.createElement('script');
            script.id = 'aba-payway-script';
            script.src = 'https://checkout.payway.com.kh/plugins/checkout2-0.js';
            script.async = true;
            document.body.appendChild(script);
        }

        const checkAbaPayway = () => {
            console.log('aba-payway-script fetching...');
            // safe check on client only
            if (typeof AbaPayway === 'object') {
                setPaywayReady(true);
                console.log(AbaPayway);
            } else {
                setTimeout(checkAbaPayway, 300);
            }
        };
        checkAbaPayway();
    }, []);

    useEffect(() => {
        setEmail(auth?.user?.email || '');
        setPhone(auth?.user?.phone || '');
    }, []);

    const handleGetHash = async () => {
        const hashString =
            req_time +
            merchant_id +
            tran_id +
            total_amount +
            shipping +
            firstname +
            lastname +
            email +
            phone +
            type +
            paymentOption +
            returnUrl +
            cancelUrl +
            continueSuccessUrl +
            currency +
            skipSuccessPage;
        console.log(hashString);
        try {
            const response = await axios.post('/aba/get-hash', { hash_string: hashString });
            if (response.data.code === '00') {
                setHash(response.data.hash);
                console.log('Hash received:', response.data.hash);
            } else {
                setError(response.data.message || 'Failed to get hash');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Something went wrong');
        }
    };

    const handleCheckout = () => {
        console.log('hash : ' + hash);
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
                if (paywayReady) {
                    AbaPayway.checkout();
                } else {
                    alert('Payment system not loaded yet, please wait.');
                }
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
                <p>Choose Payment Method</p>
            </div>
            {/* <h2 className="my-4">TOTAL(Testing): ${total_amount}</h2> */}
            <form method="POST" target="aba_webservice" action={api_url} id="aba_merchant_request">
                <input type="hidden" name="req_time" value={req_time} />
                <input type="hidden" name="merchant_id" value={merchant_id} />
                <input type="hidden" name="tran_id" value={tran_id} />
                <input type="hidden" name="amount" value={total_amount} />
                <input type="hidden" name="shipping" value={shipping} />
                <input type="hidden" name="firstname" value={firstname} />
                <input type="hidden" name="lastname" value={lastname} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="phone" value={phone} />
                <input type="hidden" name="type" value={type} />
                <input type="hidden" name="payment_option" value={paymentOption} />
                <input type="hidden" name="return_url" value={returnUrl} />
                <input type="hidden" name="cancel_url" value={cancelUrl} />
                <input type="hidden" name="continue_success_url" value={continueSuccessUrl} />
                <input type="hidden" name="currency" value={currency} />
                <input type="hidden" name="skip_success_page" value={skipSuccessPage} />
                <input type="hidden" name="hash" value={hash} />
            </form>

            {paywayReady ? (
                <button
                    id="checkout_button"
                    onClick={async () => {
                        setIsLoading(true);
                        await handleGetHash();
                        handleCheckout();
                    }}
                    disabled={!paywayReady}
                    className="bg-background flex w-full cursor-pointer items-center gap-[10px] rounded-[8px] border border-transparent p-[6px] text-start shadow-[0_1px_5px_rgb(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:p-[10px] dark:bg-white/20 dark:hover:bg-white/25"
                >
                    <img className="size-[50px] rounded-[4px]" src="/assets/ABA_BANK.svg" alt="" />
                    <div className="flex w-full items-center justify-between">
                        <div className="flex-1">
                            <p className="text-[16px] font-semibold">ABA KHQR</p>
                            <p className="text-[14px] font-normal text-gray-600 dark:text-gray-200">Scan to pay with any banking app</p>
                        </div>
                        <span className="bg-accent flex cursor-pointer items-center justify-center rounded-[4px] p-1 dark:bg-white/10">
                            <ChevronRight className="stroke-gray-600 dark:stroke-gray-200" />
                        </span>
                    </div>
                </button>
            ) : (
                <MyLoadingAnimationOne />
            )}
            {error && <p className="text-red-500">{error}</p>}
            {isLoading && <MyLoadingAnimationOne />}
        </div>
    );
};

export default PaymentMethods;
