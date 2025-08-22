import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/contexts/cart-contexts';
import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { ShoppingCartIcon, Trash2Icon } from 'lucide-react';

export function CartSheet({ openCartDialog = false, setOpeCartDialog }) {
    const { cartItems, removeFromCart } = useCart();
    const { t } = useTranslation();
    return (
        <Sheet open={openCartDialog} onOpenChange={setOpeCartDialog}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCartIcon /> Shopping Cart
                    </SheetTitle>
                    <SheetDescription>{cartItems?.length || '0'} items in your cart.</SheetDescription>
                </SheetHeader>
                <div className="h-full overflow-y-scroll px-4">
                    {cartItems?.map((item: any, index: number) => (
                        <div
                            key={item.id}
                            className="bg-card mb-4 flex items-center gap-2 rounded-2xl border p-2 shadow-sm transition-all hover:shadow-md"
                        >
                            {/* Product image */}
                            <div className="bg-accent size-28 shrink-0 overflow-hidden rounded-lg">
                                <img
                                    className="h-full w-full object-cover"
                                    src={`/assets/images/items/thumb/${item?.images[0]?.image}`}
                                    alt={item.name}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex h-28 flex-1 flex-col justify-between">
                                {/* Product name + price */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="line-clamp-2 text-base leading-tight font-semibold">{item.name}</h3>
                                        <Link href={`/shops/${item?.shop_id}`}>
                                            <p className="text-primary line-clamp-1 text-sm font-medium underline">{item.shop?.name}</p>
                                        </Link>
                                    </div>
                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => removeFromCart(item)}
                                            title={t('View Order')}
                                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground cursor-pointer rounded-md border p-1 transition-all duration-300"
                                        >
                                            <Trash2Icon className="size-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Quantity row */}
                                <div>
                                    <div className="mt-2 flex items-center justify-start gap-1 text-xs">
                                        <span className="text-primary">Price : ${item.price}</span>
                                    </div>
                                    <div className="flex items-center justify-start gap-1 text-xs">
                                        <span className="text-muted-foreground">Quantity : {item.cartQuantity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <SheetFooter>
                    <Link href={`/shopping-cart`} className="w-full">
                        <Button type="button" className="w-full">
                            Checkout
                        </Button>
                    </Link>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
