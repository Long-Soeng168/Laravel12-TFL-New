import MyNoData from '@/components/my-no-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-contexts';
import { Minus, Plus, Trash2 } from 'lucide-react';
import ClearCartButton from './ClearCartButton';
import PaymentMethods from './PaymentMethods';

const CartItemList = () => {
    const { cartItems, handleQuantityChange, removeFromCart } = useCart();
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
    const shipping = 2;
    const total = subtotal + shipping;
    return (
        <div>
            <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Main Cart Section */}
                    <div className="space-y-6 lg:col-span-7">
                        <div>
                            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                            <p className="text-muted-foreground">
                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="overflow-hidden p-0">
                                    <CardContent className="p-0">
                                        <div className="flex h-full flex-row md:flex-row">
                                            {/* Product Image */}
                                            <div className="relative aspect-square h-auto w-[25%] md:w-32">
                                                <img
                                                    src={`/assets/images/items/thumb/${item?.images[0]?.image}`}
                                                    alt={item.name}
                                                    width={500}
                                                    height={500}
                                                    className="h-full w-full object-cover md:w-32"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 p-4 pb-3 md:p-6">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="line-clamp-3 font-medium">{item.name}</h3>
                                                        {/* <p className="text-muted-foreground text-sm">
                                                            {item.color} • {item.size}
                                                        </p> */}
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item)}>
                                                        <Trash2 className="stroke-destructive h-4 w-4" />
                                                    </Button>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item?.id, -1)}>
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="w-8 text-center">{item.cartQuantity}</span>
                                                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item?.id, +1)}>
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="text-right">
                                                        <div className="font-medium">${(item.price * item.cartQuantity).toFixed(2)}</div>
                                                        {/* {item.originalPrice && (
                                                <div className="text-muted-foreground text-sm line-through">
                                                    ${(item.originalPrice * item.cartQuantity).toFixed(2)}
                                                </div>
                                            )} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {cartItems?.length > 0 ? (
                            <div className="mt-6 flex justify-between">
                                <ClearCartButton />
                                {/* <div className="space-x-4">
                        <a href="/checkout">
                            <Button>Checkout</Button>
                        </a>
                    </div> */}
                            </div>
                        ) : (
                            <MyNoData />
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6 lg:col-span-5">
                        <Card className='p-4 md:p-6 m-0'>
                            <CardHeader className='p-0 m-0'>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription>Review your order details and shipping information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 p-0 m-0">
                                {/* Promo Code */}
                                {/* <div className="space-y-2">
                                    <Label>Promo Code</Label>
                                    <div className="flex gap-2">
                                        <Input placeholder="Enter promo code" />
                                        <Button variant="outline">Apply</Button>
                                    </div>
                                </div> */}

                                {/* Order Summary */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Features */}
                                {/* <div className="space-y-4 border-t pt-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Package className="text-primary h-4 w-4" />
                                        <span>Free returns within 30 days</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Shield className="text-primary h-4 w-4" />
                                        <span>Secure payment</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Truck className="text-primary h-4 w-4" />
                                        <span>Fast delivery</span>
                                    </div>
                                </div> */}

                                {/* Checkout Button */}
                                <PaymentMethods />
                                {/* <Button className="w-full">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Proceed to Checkout
                                </Button> */}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemList;
