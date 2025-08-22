import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

const MyProductListHeader = ({
    title,
    image,
    link = '#',
}: {
    title: string;
    image?: string;
    link?: string;
}) => {
    return (
        <div className="mx-2 mb-4 flex items-center justify-between border-b border-muted pb-2">
            <div className="flex items-center gap-3">
                {image && (
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                        <img src={image} alt={title} className="h-6 w-6 object-contain" />
                    </div>
                )}
                <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            </div>

            <Link href={link} className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-all">
                See More
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    );
};

export default MyProductListHeader;
