import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { ArrowUpDown } from 'lucide-react';

const SortBy = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const currentPath = window.location.pathname; // Get dynamic path

    const handleSort = (fieldName: string) => {
        if (fieldName === queryParams.get('sortBy')) {
            if (queryParams.get('sortDirection') === 'asc') {
                queryParams.set('sortDirection', 'desc');
            } else {
                queryParams.set('sortDirection', 'asc');
            }
        } else {
            queryParams.set('sortBy', fieldName);
            queryParams.set('sortDirection', 'asc');
        }
        router.get(currentPath + '?' + queryParams?.toString());
    };

    const handleChagePerPage = (perPage: number) => {
        if (perPage?.toString()) {
            queryParams.set('perPage', perPage?.toString());
        }
        router.get(currentPath + '?' + queryParams?.toString());
    };
    return (
        <div className="flex items-center gap-2">
            <Select>
                <div className="rounded-xl border p-1 bg-secondary/60 dark:border-white/20">
                    <SelectTrigger className="bg-background rounded-md dark:border-white/20">
                        {queryParams?.get('sortBy') ? (
                            <p className="capitalize">{queryParams?.get('sortBy')}</p>
                        ) : (
                            <SelectValue placeholder="Sort By : " />
                        )}
                    </SelectTrigger>
                </div>

                <SelectContent className="w-36">
                    <Button variant="ghost" className="flex w-full justify-start" onClick={() => handleSort('name')}>
                        <ArrowUpDown className="!size-4" />
                        Name
                    </Button>
                    <Button variant="ghost" className="flex w-full justify-start" onClick={() => handleSort('price')}>
                        <ArrowUpDown className="!size-4" />
                        Price
                    </Button>
                    <Button variant="ghost" className="flex w-full justify-start" onClick={() => handleSort('created_at')}>
                        <ArrowUpDown className="!size-4" />
                        Create Date
                    </Button>
                </SelectContent>
            </Select>
            <Select>
                <div className="rounded-xl border p-1 bg-secondary/60 dark:border-white/20">
                    <SelectTrigger className="bg-background rounded-md dark:border-white/20">
                        {queryParams?.get('perPage') ? (
                            <p className="capitalize">{queryParams?.get('perPage')} per page</p>
                        ) : (
                            <SelectValue placeholder="25 per page" />
                        )}
                    </SelectTrigger>
                </div>
                <SelectContent className="w-36">
                    {[5, 10, 25, 50, 100].map((num) => (
                        <Button key={num} variant="ghost" className="flex w-full justify-start" onClick={() => handleChagePerPage(num)}>
                            {num} per page
                        </Button>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SortBy;
