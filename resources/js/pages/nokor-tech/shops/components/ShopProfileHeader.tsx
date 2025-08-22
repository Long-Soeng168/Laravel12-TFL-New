import MyNoData from '@/components/my-no-data';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
const ShopProfileHeader = ({ shop }) => {
    return (
        <div className="mb-8 w-full px-4 md:mb-28">
            {/* Banner */}
            <div className="relative">
                <img src={`/assets/images/shops/${shop.banner}`} alt="Shop Banner" className="max-h-[500px] w-full object-cover" />
                {/* Logo */}
                <div className="bg-background/80 -bottom-16 left-0 flex max-w-[600px] items-center space-x-4 rounded-2xl border p-4 shadow-md backdrop-blur md:absolute md:left-6">
                    <img
                        src={`/assets/images/shops/${shop.logo}`}
                        alt="Shop Logo"
                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{shop.name}</h1>
                        <div>
                            {shop.address && (
                                <p>
                                    <span className="font-semibold">Address:</span> {shop.address}
                                </p>
                            )}
                            {shop.phone && (
                                <p>
                                    <span className="font-semibold">Phone:</span> {shop.phone}
                                </p>
                            )}
                            <div className="absolute right-1 bottom-1">
                                <Dialog>
                                    <DialogTrigger className='text-primary hover:underline cursor-pointer bg-background/50 backdrop-blur-md rounded-lg p-1 px-2'>About</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{shop.name}</DialogTitle>
                                            <DialogDescription className='whitespace-pre-line'>{shop.short_description || <MyNoData />}</DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopProfileHeader;
