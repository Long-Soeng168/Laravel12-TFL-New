import MyAddNewButton from '@/components/my-add-new-button';
import { MyPagination } from '@/components/my-pagination';
import { MyRefreshButton } from '@/components/my-refresh-button';
import { MySearchTableData } from '@/components/my-search-table-data';
import useRole from '@/hooks/use-role';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import ContactUsButton from '../components/contact-us-button';
import UserSuspended from '../shops/components/user-suspended';
import { MyFilterButton } from './components/my-filter-button';
import MyTableData from './components/my-table-data';

const Index = () => {
    const hasRole = useRole();
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Items'),
            href: '/user-items',
        },
    ];
    const { tableData, auth } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {auth?.shop?.status == 'inactive' && (
                <UserSuspended
                    title={t('Shop Suspended!')}
                    subTitle={t('Your shop has been temporarily suspended. Please contact our support team to resolve this issue.')}
                />
            )}
            <div className="flex max-w-[100vw] flex-wrap items-center justify-end gap-2">
                <div className="flex max-w-[100vw] flex-wrap items-center justify-start gap-2 max-lg:w-full lg:flex-1">
                    <MySearchTableData />
                    <MyFilterButton />
                    <MyRefreshButton />
                    <span className="flex-1"></span>
                    {/* <MyExportButton />
                    <MyImportButton /> */}
                    {auth?.shop?.status == 'active' ? (
                        <>{hasRole('Shop') && <MyAddNewButton url="/user-items/create" type="link" />}</>
                    ) : (
                        <>
                            <p className="text-red-400">{t('Shop Suspended!')}</p>
                            <ContactUsButton />
                        </>
                    )}
                </div>
            </div>
            <div className="h-2" />
            <MyTableData />
            <MyPagination />
        </AppLayout>
    );
};

export default Index;
