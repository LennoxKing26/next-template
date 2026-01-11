// app/[locale]/page.tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

// 🔥 核心：从你的中转文件引入 UI 组件
import { Button, Card, CardBody, CardHeader } from '@/utils/heroui-client';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 1. 启用静态生成优化 (Static Generation)
  setRequestLocale(locale);

  // 2. 服务端获取翻译 (SEO 爬虫直接能读到这些字)
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
    <div className=" bg-background relative overflow-hidden">
      {/* 装饰背景 (CSS 渲染，不影响 SEO) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-32 px-6">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 leading-14 md:leading-23">
            {t('title')}
            <br className="hidden sm:block" />
            <span className="text-primary">{t('titleHighlight')}</span>
          </h1>

          <p className="text-lg sm:text-xl text-default-500 mb-10 max-w-2xl mx-auto leading-relaxed">{t('subtitle')}</p>

          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* ✅ 正确写法：Link 包裹 Button，既不报错，SEO 也能识别出这是个链接 */}
            <Link href="/editor">
              <Button
                size="lg"
                color="primary"
                variant="shadow"
                className="w-full sm:w-auto font-semibold px-8"
                startContent={<iconify-icon icon="mdi:rocket-launch" width="24"></iconify-icon>}
              >
                {t('startEditing')}
              </Button>
            </Link>

            <Link href="/examples">
              <Button size="lg" variant="bordered" className="w-full sm:w-auto font-semibold px-8 border-default-300">
                {t('viewExamples')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-content1/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('featuresTitle')}</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, index) => (
              // Card 是客户端组件，但里面的文字是服务端传进去的，爬虫完全看得到
              <Card
                key={index}
                className="border-none bg-background/60 dark:bg-default-50/20 backdrop-blur-lg hover:scale-[1.02] transition-transform"
                shadow="sm"
                isPressable
              >
                <CardHeader className="flex gap-4 pb-0 pt-6 px-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <iconify-icon icon={item.icon} width="32" height="32"></iconify-icon>
                  </div>
                </CardHeader>
                <CardBody className="px-6 pb-6 pt-4">
                  <h4 className="text-lg font-bold mb-2">{t(`${item.key}Title`)}</h4>
                  <p className="text-default-500 text-sm leading-relaxed">{t(`${item.key}Desc`)}</p>
                </CardBody>
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
                className="group p-6 rounded-2xl border border-default-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-background"
              >
                <div className="mb-6 text-default-400 group-hover:text-primary transition-colors">
                  <iconify-icon icon={item.icon} width="48" height="48"></iconify-icon>
                </div>
                <h4 className="text-lg font-bold mb-2">{t(`${item.key}Title`)}</h4>
                <p className="text-sm text-default-500">{t(`${item.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-linear-to-br from-primary to-secondary text-primary-foreground border-none overflow-visible shadow-2xl">
            <CardBody className="py-16 px-8 sm:px-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 rotate-12 pointer-events-none">
                <iconify-icon icon="mdi:creation" width="200" height="200"></iconify-icon>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white relative z-10">{t('ctaTitle')}</h3>
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto relative z-10">{t('ctaSubtitle')}</p>

              <div className="relative z-10 flex justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-white text-primary font-bold shadow-lg w-full sm:w-auto">
                    {tc('signup')}
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-default-100">
        <div className="container mx-auto text-center text-default-400 text-sm">
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
