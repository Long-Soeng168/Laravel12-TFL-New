import useTranslation from '@/hooks/use-translation';
import { Head, usePage } from '@inertiajs/react';
import NokorTechLayout from './layouts/nokor-tech-layout';

const About = () => {
    const { about } = usePage().props;
    const { t, currentLocale } = useTranslation();
    return (
        <NokorTechLayout>
            <Head>
                <title>About Us</title>
                <meta
                    name="description"
                    content="Discover the story of PG Online, a fast-growing real estate and digital marketplace company in Cambodia founded by Mr. Samret Sophat. Learn about our vision, mission, and commitment to building trust with customers."
                />
            </Head>
            <div className="text-foreground bg-background">
                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-4 py-20">
                    {/* About */}
                    <section>
                        <div>
                            {/* <h1 className="text-foreground text-4xl font-bold">{currentLocale == 'kh' ? privacies.title_kh : privacies.title}</h1> */}
                            <div
                                className="text-foreground prose prose-strong:text-foreground prose-headings:text-foreground max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? about.long_description_kh : about.long_description,
                                }}
                            ></div>
                        </div>

                        {/* {about?.children?.length > 0 && (
                            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                                {about?.children?.map((item) => (
                                    <div className="bg-card rounded-3xl p-8 shadow-xl">
                                        <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                                            {currentLocale == 'kh' ? item.title_kh : item.title}
                                        </h3>
                                        <p
                                            className="text-gray-500"
                                            dangerouslySetInnerHTML={{
                                                __html: currentLocale == 'kh' ? item.short_description_kh : item.short_description,
                                            }}
                                        ></p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-16 text-center">
                            <p
                                className="mx-auto max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{ __html: currentLocale == 'kh' ? about.long_description_kh : about.long_description }}
                            ></p>
                        </div> */}
                    </section>

                    {/* <section className="mt-20">
                        <div className="text-center">
                            <h2 className="text-foreground mb-6 text-4xl font-bold">
                                {currentLocale == 'kh' ? whyChooseUs.title_kh : whyChooseUs.title}
                            </h2>
                            <p
                                className="mx-auto mb-8 max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? whyChooseUs.short_description_kh : whyChooseUs.short_description,
                                }}
                            ></p>
                        </div>

                        {whyChooseUs?.children?.length > 0 && (
                            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                                {whyChooseUs?.children?.map((item) => (
                                    <div className="bg-card rounded-3xl p-8 shadow-xl">
                                        <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                                            {currentLocale == 'kh' ? item.title_kh : item.title}
                                        </h3>
                                        <p
                                            className="text-gray-500"
                                            dangerouslySetInnerHTML={{
                                                __html: currentLocale == 'kh' ? item.short_description_kh : item.short_description,
                                            }}
                                        ></p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-16 text-center">
                            <p
                                className="mx-auto max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? whyChooseUs.long_description_kh : whyChooseUs.long_description,
                                }}
                            ></p>
                        </div>
                    </section>

                    <section className="mt-20">
                        <div>
                            <h2 className="text-foreground mb-6 text-center text-4xl font-bold">
                                {currentLocale == 'kh' ? buildForEveryone.title_kh : buildForEveryone.title}
                            </h2>
                            <p
                                className="mx-auto mb-8 max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? buildForEveryone.short_description_kh : buildForEveryone.short_description,
                                }}
                            ></p>
                        </div>

                        {buildForEveryone?.children?.length > 0 && (
                            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                                {buildForEveryone?.children?.map((item) => (
                                    <div className="bg-card rounded-3xl p-8 shadow-xl">
                                        <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                                            {currentLocale == 'kh' ? item.title_kh : item.title}
                                        </h3>
                                        <p
                                            className="text-gray-500"
                                            dangerouslySetInnerHTML={{
                                                __html: currentLocale == 'kh' ? item.short_description_kh : item.short_description,
                                            }}
                                        ></p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-16 text-center">
                            <p
                                className="mx-auto max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? buildForEveryone.long_description_kh : buildForEveryone.long_description,
                                }}
                            ></p>
                        </div>
                    </section>
                    <section className="mt-20">
                        <div>
                            <h2 className="text-foreground mb-6 text-center text-4xl font-bold">
                                {currentLocale == 'kh' ? getInTouch.title_kh : getInTouch.title}
                            </h2>
                            <p
                                className="mx-auto mb-8 max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? getInTouch.short_description_kh : getInTouch.short_description,
                                }}
                            ></p>
                        </div>

                        {getInTouch?.children?.length > 0 && (
                            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                                {getInTouch?.children?.map((item) => (
                                    <div className="bg-card rounded-3xl p-8 shadow-xl">
                                        <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                                            {currentLocale == 'kh' ? item.title_kh : item.title}
                                        </h3>
                                        <p
                                            className="text-gray-500"
                                            dangerouslySetInnerHTML={{
                                                __html: currentLocale == 'kh' ? item.short_description_kh : item.short_description,
                                            }}
                                        ></p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-16 text-center">
                            <p
                                className="mx-auto max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? getInTouch.long_description_kh : getInTouch.long_description,
                                }}
                            ></p>
                        </div>
                    </section>
                    <section className="mt-20">
                        <div className="mx-auto mb-8 max-w-3xl">
                            <h2 className="text-foreground mb-6 text-center text-4xl font-bold">
                                {currentLocale == 'kh' ? privacyPolicy.title_kh : privacyPolicy.title}
                            </h2>
                            <p
                                className="mx-auto mb-8 max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? privacyPolicy.short_description_kh : privacyPolicy.short_description,
                                }}
                            ></p>
                            <Link href={`/privacy`} prefetch>
                                <Button variant="outline" size="lg">
                                    More about privacy <ArrowUpRightIcon />
                                </Button>
                            </Link>
                        </div>

                        {privacyPolicy?.children?.length > 0 && (
                            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                                {privacyPolicy?.children?.map((item) => (
                                    <div className="bg-card rounded-3xl p-8 shadow-xl">
                                        <h3 className="text-card-foreground mb-2 text-2xl font-bold">
                                            {currentLocale == 'kh' ? item.title_kh : item.title}
                                        </h3>
                                        <p
                                            className="text-gray-500"
                                            dangerouslySetInnerHTML={{
                                                __html: currentLocale == 'kh' ? item.short_description_kh : item.short_description,
                                            }}
                                        ></p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-16 text-center">
                            <p
                                className="mx-auto max-w-3xl text-lg text-gray-400"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? privacyPolicy.long_description_kh : privacyPolicy.long_description,
                                }}
                            ></p>
                        </div>
                    </section>

                  
                    <section className="text-center">
                        <h2 className="text-foreground mb-6 text-center text-4xl font-bold">
                            {currentLocale == 'kh' ? getStartedNow.title_kh : getStartedNow.title}
                        </h2>
                        <p
                            className="mx-auto mb-8 max-w-3xl text-lg text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: currentLocale == 'kh' ? getStartedNow.short_description_kh : getStartedNow.short_description,
                            }}
                        ></p>
                        <Link
                            href="/download-app"
                            prefetch
                            className="from-true-primary hover:from-true-primary rounded-full bg-gradient-to-r to-purple-600 px-10 py-4 font-semibold text-white transition hover:to-purple-700"
                        >
                            Download the App
                        </Link>
                    </section> */}
                </main>
            </div>
        </NokorTechLayout>
    );
};

export default About;
