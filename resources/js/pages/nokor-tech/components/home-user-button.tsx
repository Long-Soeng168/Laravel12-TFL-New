import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import useRole from '@/hooks/use-role';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { HomeUserButtonContent } from './home-user-button-content';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogInIcon, UserPlusIcon } from 'lucide-react';

export function HomeUserButton() {
    const { t, currentLocale } = useTranslation();
    const getInitials = useInitials();
    const hasRole = useRole();
    const { auth } = usePage().props;

    return (
        <>
            {auth?.user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="hover:bg-secondary bg-accent hover:border-primary border-accent mr-2 flex cursor-pointer items-center justify-start gap-2 rounded-md border p-0.5 md:p-2">
                            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                <AvatarImage src={`/assets/images/users/thumb/${auth?.user?.image}`} alt={auth?.user?.name} />
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                    {getInitials(auth?.user?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="max-w-32 space-y-0.5 text-start max-md:hidden">
                                <p className="text-foreground line-clamp-1 text-sm font-medium">{auth?.user?.name}</p>
                                <p className="text-muted-foreground line-clamp-1 text-xs">{auth?.user?.email}</p>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" align="end">
                        <HomeUserButtonContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="text-muted-foreground flex items-center gap-4 text-base font-semibold px-2">
                    <a href="/login" className="hover:text-primary flex items-center gap-1 transition-colors">
                        <LogInIcon size={18} />
                        <span className="underline-offset-4 hover:underline">Login</span>
                    </a>
                    {/* <span className="text-border">|</span>
                    <a href="/register" className="hover:text-primary flex items-center gap-1 transition-colors">
                        <UserPlusIcon size={18} />
                        <span className="underline-offset-4 hover:underline">Register</span>
                    </a> */}
                </div>
            )}

            {/* <Tooltip>
                <TooltipTrigger>
                    <Link
                        className="flex items-center justify-start gap-2 rounded-md px-2 py-2 pl-4"
                        prefetch
                        href={hasRole('User') || hasRole('Garage') || hasRole('Shop') ? '/user-dashboard' : '/dashboard'}
                    >
                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                            <AvatarImage src={`/assets/images/users/thumb/${auth?.user?.image}`} alt={auth?.user?.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(auth?.user?.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="max-w-32 space-y-0.5">
                            <p className="text-foreground line-clamp-1 text-start text-sm font-medium">{auth?.user?.name}</p>
                            <p className="text-muted-foreground line-clamp-1 text-xs">{auth?.user?.email}</p>
                        </div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-secondary w-60">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                <AvatarImage src={`/assets/images/users/thumb/${auth?.user?.image}`} alt={auth?.user?.name} />
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                    {getInitials(auth?.user?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-0.5">
                                <p className="text-foreground line-clamp-1 text-sm font-medium">{auth?.user?.name}</p>
                                <p className="text-muted-foreground line-clamp-1 text-xs">{auth?.user?.email}</p>
                            </div>
                        </div>
                        <p className="text-foreground text-sm">
                            Designer at <strong className="text-foreground font-medium">@Origin UI</strong>. Crafting web experiences with Tailwind
                            CSS.
                        </p>
                    </div>
                    <TooltipArrow className="bg-secondary fill-secondary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
                </TooltipContent>
            </Tooltip> */}
        </>
    );
}
