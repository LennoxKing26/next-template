// app/[locale]/page.tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tc = await getTranslations('Common');

  const features = [
    { icon: 'mdi:image-edit', key: 'feature1' },
    { icon: 'mdi:text-box-edit', key: 'feature2' },
    { icon: 'mdi:palette', key: 'feature3' },
    { icon: 'mdi:lightning-bolt', key: 'feature4' },
    { icon: 'mdi:account-multiple', key: 'feature5' },
    { icon: 'mdi:history', key: 'feature6' },
  ];

  const useCases = [
    { icon: 'mdi:shopping', key: 'useCase1' },
    { icon: 'mdi:share-variant', key: 'useCase2' },
    { icon: 'mdi:palette-swatch', key: 'useCase3' },
    { icon: 'mdi:bullhorn', key: 'useCase4' },
  ];

  return (
    <div className="bg-background relative overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-32 px-6">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 leading-tight md:leading-tight">
            {t('title')}
            <br className="hidden sm:block" />
            <span className="text-primary">{t('titleHighlight')}</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto font-semibold px-8">
              <Link href="/editor">
                <iconify-icon icon="mdi:rocket-launch" width="24" class="mr-2"></iconify-icon>
                {t('startEditing')}
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-semibold px-8">
              <Link href="/examples">{t('viewExamples')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-card/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('featuresTitle')}</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <Card
                key={index}
                className="border bg-background/60 dark:bg-card/20 backdrop-blur-lg hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <CardHeader className="flex gap-4 pb-0 pt-6 px-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <iconify-icon icon={item.icon} width="32" height="32"></iconify-icon>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-4">
                  <h4 className="text-lg font-bold mb-2">{t(`${item.key}Title`)}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(`${item.key}Desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t('useCasesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-background cursor-pointer"
              >
                <div className="mb-6 text-muted-foreground group-hover:text-primary transition-colors">
                  <iconify-icon icon={item.icon} width="48" height="48"></iconify-icon>
                </div>
                <h4 className="text-lg font-bold mb-2">{t(`${item.key}Title`)}</h4>
                <p className="text-sm text-muted-foreground">{t(`${item.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none overflow-visible shadow-2xl">
            <CardContent className="py-16 px-8 sm:px-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 rotate-12 pointer-events-none">
                <iconify-icon icon="mdi:creation" width="200" height="200"></iconify-icon>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white relative z-10">{t('ctaTitle')}</h3>
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto relative z-10">{t('ctaSubtitle')}</p>

              <div className="relative z-10 flex justify-center">
                <Button asChild size="lg" variant="secondary" className="font-bold shadow-lg w-full sm:w-auto">
                  <Link href="/auth/signup">{tc('signup')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>{t('footer')}</p>
          <div className="mt-6 flex justify-center gap-6 opacity-60">
            <a href="#" aria-label="Github" className="hover:text-primary transition-colors">
              <iconify-icon icon="mdi:github" width="24"></iconify-icon>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
              <iconify-icon icon="mdi:twitter" width="24"></iconify-icon>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
