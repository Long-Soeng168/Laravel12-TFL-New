import { Link } from '@inertiajs/react';

const ShopCard = ({ shop }) => {
    return (
        <Link
            href={`/shops/${shop.id}`}
            className="w-full max-w-full overflow-hidden border transition-all duration-300 hover:scale-105 hover:rounded-2xl hover:shadow-lg"
        >
            {/* Banner */}
            <div>
                <img src={`/assets/images/shops/${shop.banner}`} alt={`${shop.name} Banner`} className="aspect-[21/9] w-full bg-white object-cover" />
            </div>

            {/* Content */}
            <div className="flex items-start gap-4 p-2">
                {/* Logo */}
                <div className="shrink-0">
                    <img
                        src={`/assets/images/shops/${shop.logo}`}
                        alt={`${shop.name} Logo`}
                        className="size-14 rounded-full border-4 bg-white border-white object-cover shadow-md"
                    />
                </div>

                {/* Details */}
                <div>
                    <h2 className="line-clamp-2 text-base font-semibold">{shop.name}</h2>
                    {shop.address && (
                        <p className="text-foreground mt-1 line-clamp-2 text-sm">
                            <span className="font-semibold">Address:</span> {shop.address}
                        </p>
                    )}
                    {shop.phone && (
                        <p className="text-foreground mt-1 text-sm">
                            <span className="font-semibold">Phone:</span> {shop.phone}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ShopCard;
